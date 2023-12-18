require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch"); 
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { authMiddleware } = require("./utils/auth");
const path = require("path");
const User = require("./models/User");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(authMiddleware);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/api/auth/google", async (req, res) => {
	try {
		const code = req.query.code;

		const tokenResponse = await fetch(
			"https://oauth2.googleapis.com/token",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					code,
					client_id: process.env.GOOGLE_CLIENT_ID,
					client_secret: process.env.GOOGLE_CLIENT_SECRET,
					redirect_uri: "https://calm-plains-24036-d1dbec7026c8.herokuapp.com/api/auth/google",
					grant_type: "authorization_code",
				}),
			}
		);

		const tokenData = await tokenResponse.json();
		if (tokenData.error) {
			console.error(
				"Error exchanging Google Auth Code:",
				tokenData.error
			);
			return res.status(400).json(tokenData);
		}

		const userInfoResponse = await fetch(
			"https://www.googleapis.com/oauth2/v2/userinfo",
			{
				headers: { Authorization: `Bearer ${tokenData.access_token}` },
			}
		);
		const userInfo = await userInfoResponse.json();

		let user = await User.findOne({ googleId: userInfo.id });
		if (!user) {
			user = await User.create({
				googleId: userInfo.id,
				email: userInfo.email,
				name: userInfo.name,
			});
		}

		const jwtToken = jwt.sign(
			{
				userId: user._id,
				email: user.email,
				name: user.name,
			},
			process.env.SECRET_KEY,
			{ expiresIn: "1h" }
		);

		const userData = {
			id: user._id,
			name: user.name,
			email: user.email,
			token: jwtToken,
		};

		function convertToQueryString(obj) {
			return Object.keys(obj)
				.map(
					(key) =>
						`${encodeURIComponent(key)}=${encodeURIComponent(
							obj[key]
						)}`
				)
				.join("&");
		}

		const userDataQueryString = convertToQueryString(userData);

		res.redirect(`http://localhost:3000/?userData=${userDataQueryString}`);
	} catch (error) {
		console.error("Server Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

function validateTokenAndGetUserData(token) {
	const tokenWithoutBearer = token.split(" ")[1];

	const decoded = jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY);
	return decoded;
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		const token = req.headers.authorization || "";
		let user = null;
		let authError = null;

		if (token) {
			try {
				user = validateTokenAndGetUserData(token);
			} catch (error) {
				authError = error.message;
			}
		}

		return { user, authError };
	},
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../client/build", "index.html"));
	});
}

const startApolloServer = async () => {
	await server.start();
	server.applyMiddleware({ app });

	app.listen(PORT, () => {
		console.log(`API server running on port ${PORT}!`);
		console.log(
			`GraphQL endpoint available at http://localhost:${PORT}${server.graphqlPath}`
		);
	});
};

startApolloServer();
