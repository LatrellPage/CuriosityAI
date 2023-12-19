const mongoose = require("mongoose");

mongoose.connect(
	process.env.MONGODB_URI || "mongodb+srv://pagelatrell14:CuriosityAI1@curiosityai.zkox2rc.mongodb.net/CuriosityAI",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

const db = mongoose.connection;

module.exports = db;
