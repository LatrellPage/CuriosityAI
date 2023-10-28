const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const generateRandomSecretKey = () => {
	return crypto.randomBytes(64).toString('hex');
};

const SECRET_KEY = generateRandomSecretKey()
console.log(SECRET_KEY)

const authMiddleware = (req, res, next) => {
	// Get the token from the request headers
	const token = req.headers.authorization || req.headers.Authorization;


	// Check if the token is missing
	if (!token) {
		return res
			.status(401)
			.json({ message: "Authorization token is missing" });
	}

	try {
		// Verify the token with the secret key
		const decoded = jwt.verify(token, secret);

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
