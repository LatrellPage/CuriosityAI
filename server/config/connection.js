const mongoose = require("mongoose");

mongoose.connect(
	process.env.MONGODB_URI || "mongodb+srv://pagelatrell14:CuriosityAI1@curiosityai.zkox2rc.mongodb.net/CuriosityAI",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

const db = mongoose.connection;

db.dropDatabase()
  .then(() => {
    console.log('Database dropped successfully.');
  })
  .catch((err) => {
    console.error('Error dropping database:', err);
  });

module.exports = db;
