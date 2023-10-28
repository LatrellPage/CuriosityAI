const mongoose = require("mongoose");
const Lecture = require("../models/Lecture");
const User = require("../models/User");

const sampleUsers = [
	{
		name: "User A",
		email: "userA@example.com",
		password: "passwordA",
	},
	{
		name: "User B",
		email: "userB@example.com",
		password: "passwordB",
	},
	{
		name: "User C",
		email: "userC@example.com",
		password: "passwordC",
	},
];

const sampleLectures = [
	{
		title: "Lecture 1",
		language: "English",
		professor: "Professor2",
		conversation: {
			messages: [
				{
					text: "Welcome to Lecture 1!",
					sender: "user",
					timestamp: new Date(),
				},
				{
					text: "Today's professor is Professor A.",
					sender: "ai",
					timestamp: new Date(),
				},
			],
		},
	},
	{
		title: "Lecture 2",
		language: "Spanish",
		professor: "Professor3",
		conversation: {
			messages: [
				{
					text: "Bienvenidos a la Clase 2.",
					sender: "user",
					timestamp: new Date(),
				},
				{
					text: "El profesor de hoy es Professor B.",
					sender: "ai",
					timestamp: new Date(),
				},
			],
		},
	},
	{
		title: "Lecture 2",
		language: "French",
		professor: "Turing",
		conversation: {
			messages: [
				{
					text: "Bienvenue à la conférence 2!",
					sender: "user",
					timestamp: new Date(),
				},
				{
					text: "Le professeur d'aujourd'hui est le Professeur B.",
					sender: "ai",
					timestamp: new Date(),
				},
			],
		},
	},
	{
		title: "Lecture 3",
		language: "Spanish",
		professor: "Professor3",
		conversation: {
			messages: [
				{
					text: "¡Bienvenidos a la conferencia 3!",
					sender: "user",
					timestamp: new Date(),
				},
				{
					text: "El profesor de hoy es el Profesor C.",
					sender: "ai",
					timestamp: new Date(),
				},
			],
		},
	},
	{
		title: "Lecture 4",
		language: "English",
		professor: "Professor2",
		conversation: {
			messages: [
				{
					text: "Hello robot",
					sender: "user",
					timestamp: new Date(),
				},
				{
					text: "Hello human how can i help you",
					sender: "ai",
					timestamp: new Date(),
				},
			],
		},
	},
	{
		title: "Lecture 5",
		language: "Spanish",
		professor: "Turing",
		conversation: {
			messages: [
				{
					text: "SPanish text here",
					sender: "user",
					timestamp: new Date(),
				},
				{
					text: "SPanish response here",
					sender: "ai",
					timestamp: new Date(),
				},
			],
		},
	},
	{
		title: "Lecture 6",
		language: "French",
		professor: "Professor3",
		conversation: {
			messages: [
				{
					text: "French text here",
					sender: "user",
					timestamp: new Date(),
				},
				{
					text: "French response here",
					sender: "ai",
					timestamp: new Date(),
				},
			],
		},
	},
	{
		title: "Lecture 1",
		language: "English",
		professor: "Professor2",
		conversation: {
			messages: [
				{
					text: "Welcome to Lecture 1!",
					sender: "user",
					timestamp: new Date(),
				},
				{
					text: "Today's professor is Professor A.",
					sender: "ai",
					timestamp: new Date(),
				},
			],
		},
	},
];

const seedData = async () => {
	try {
		await User.insertMany(sampleUsers);

		const users = await User.find();

		const lecturesWithUsers = sampleLectures.map((lecture, index) => {
			const user = users[index % users.length]; // Assign lectures in a round-robin fashion
			lecture.userId = user._id;
			return lecture;
		});

		await Lecture.insertMany(lecturesWithUsers);

		console.log("Data seeded successfully");
	} catch (err) {
		console.error("Error seeding data:", err);
	}
};


seedData();
