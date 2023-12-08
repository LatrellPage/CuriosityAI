const jwt = require("jsonwebtoken");
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization || req.headers.Authorization;

    if (!token) {
        req.authError = "Authorization token is missing";
        return next();
    }
	if (token) {
		const tokenPart = token.split(' ')[1]; // Split 'Bearer <token>'
		

		try {
			const decoded = jwt.verify(tokenPart, process.env.SECRET_KEY);
			
			req.user = decoded;
		} catch (error) {
			req.authError = "Invalid token";
		}
		
	}

    

    next();
};

module.exports = { authMiddleware };
