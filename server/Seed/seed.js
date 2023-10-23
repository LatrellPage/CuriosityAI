const mongoose = require("mongoose");
const User = require("../models/User"); 
const Lecture = require("../models/Lecture"); 

const db = require("../config/connection"); 


const sampleUsers = [
	{ name: "User 1", email: "user12356799@example.com", password: "Password1" },
	{ name: "User 2", email: "user891044@example.com", password: "Password2" },
	// Add more sample users
];

const sampleLectures = [
	{
		createdAt: new Date(), 
		createdBy: null, 
		conversation: null, 
		title: "Lecture 1",
		professor: "Turing", 
		language: "English", 
	},
	{
		createdAt: new Date(),
		createdBy: null,
		conversation: null,
		title: "Lecture 2",
		professor: "Professor 2",
		language: "Spanish",
	},
];

const seedData = async () => {
	try {
		// Seed users
		const users = await User.insertMany(sampleUsers);

		// Assign the created users to lectures
		sampleLectures[0].createdBy = users[0]._id;
		sampleLectures[1].createdBy = users[1]._id;

		// Seed lectures
		await Lecture.insertMany(sampleLectures);

		console.log("Data seeded successfully");
	} catch (err) {
		console.error("Error seeding data:", err);
	} finally {
		mongoose.connection.close();
	}
};

seedData();
