const jwt = require("jsonwebtoken");
require('dotenv').config();

const authMiddleware = (req, res, next) => {
	const token = req.headers.authorization || req.headers.Authorization;


	if (!token) {
		return res
			.status(401)
			.json({ message: "Authorization token is missing" });
	}

	try {
		// Verify the token with the secret key
		const decoded = jwt.verify(token, process.env.SECRET_KEY);

		// Attach the decoded user data to the request object
		req.user = decoded;

		// Continue with the next middleware or route handler
		next();
	} catch (error) {
		// Token verification failed
		return res.status(401).json({ message: "Invalid token" });
	}
};

module.exports = { authMiddleware };
