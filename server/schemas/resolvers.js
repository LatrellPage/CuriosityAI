const User = require("../models/User");
const Lecture = require("../models/Lecture");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
const { authMiddleware } = require("../utils/auth");

const resolvers = {
	Query: {
		getUser: async (_, { id }) => {
			try {
				const user = await User.findById(id).populate("lectures");
				return user;
			} catch (error) {
				throw new Error("Error fetching user and user's lectures");
			}
		},

		getAllUsers: async () => {
			try {
				const users = await User.find({});
				return users;
			} catch (error) {
				throw new Error("Error fecthing users");
			}
		},

		getLecture: async (_, { id }) => {
			try {
				const lecture = await Lecture.findById(id);
				return lecture;
			} catch (error) {
				throw new Error("Error fetching lecture");
			}
		},

		getUserLectures: async (_, { userId }) => {
			try {
				const user = await User.findById(userId).populate("lectures");
				return user;
			} catch (error) {
				throw new Error("Error fetching user lectures");
			}
		},

		getAllLectures: async () => {
			try {
				const lectures = await Lecture.find({}).populate(
					"conversation"
				);
				return lectures;
			} catch (error) {
				throw new Error("Error fecthing lectures");
			}
		},
	},

	Lecture: {
		conversation: (lecture) => {
			// console.log(lecture)
			// The console.log above displays all the message in the terminal
			return lecture.conversation.messages;
		},
	},

	Mutation: {
		registerUser: async (_, { username, email, password }) => {
			try {
				// Check if a user with the same email already exists
				const existingUser = await User.findOne({ email });
				if (existingUser) {
					throw new Error("User with this email already exists");
				}

				// Hash the password before saving it to the database
				const hashedPassword = await bcrypt.hash(password, 10);

				// Create a new user and save it to the database
				const newUser = new User({
					username,
					email,
					password: hashedPassword,
				});
				await newUser.save();

				// Generate a JWT token for the newly registered user
				const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, {
					expiresIn: "1h", // Token expiration time
				});

				return { token };
			} catch (error) {
				throw new Error(`Registration failed: ${error.message}`);
			}
		},

		loginUser: async (_, { email, password }) => {
			try {
				const user = await User.findOne({ email });

				if (!user) {
					throw new Error("User not found");
				}

				const isPasswordValid = await bcrypt.compare(
					password,
					user.password
				);

				if (!isPasswordValid) {
					throw new Error("Invalid password");
				}

				// Generate a JWT token for the authenticated user
				const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
					expiresIn: "1h", // Token expiration time
				});

				return { token };
			} catch (error) {
				throw new AuthenticationError(`Login failed: ${error.message}`);
			}
		},

		createLecture: async (_, args) => {
			try {
				const {  userId } = args;

				const lecture = new Lecture({
					title: "New Lecture",
					language: "English",
					professor: "Turing",
					userId,
				});

				await lecture.save();
				console.log("You have successfully created a lecture.")
				return lecture;
			} catch (error) {
				throw new Error(`Lecture creation failed: ${error.message}`);
			}
		},

		deleteLecture: async (_, { id }) => {
			// authMiddleware(context.req, context.res);

			try {
				await Lecture.findByIdAndDelete(id);
				return "Lecture deleted successfully";
			} catch (error) {
				throw new Error(`Lecture deletion failed: ${error.message}`);
			}
		},
	},
};

module.exports = resolvers;
