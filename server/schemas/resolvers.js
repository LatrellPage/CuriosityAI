const User = require("../models/User");
const Lecture = require("../models/Lecture");
const Conversation = require("../models/Conversation");
const Settings = require("../models/Settings");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
const { authMiddleware } = require("../utils/auth");

const SECRET_KEY = "your-secret-key";

const resolvers = {
	Query: {
		getUser: async (_, { id }) => {
			try {
				const user = await User.findById(id);
				return user;
			} catch (error) {
				throw new Error("Error fetching user");
			}
		},

		// Fetch a lecture by ID
		getLecture: async (_, { id }) => {
			try {
				const lecture = await Lecture.findById(id);
				return lecture;
			} catch (error) {
				throw new Error("Error fetching lecture");
			}
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

		createLecture: async (_, { title, userId }, context) => {
			// Use the authMiddleware to check authentication
			authMiddleware(context.req, context.res, async () => {
				// This block will only execute if the user is authenticated
				const lecture = new Lecture({
					title,
					createdBy: userId,
				});
				await lecture.save();
				return lecture;
			});
		},

		updateLectureTitle: async (_, { id, newTitle }, context) => {
			// Use the authMiddleware to check authentication
			authMiddleware(context.req, context.res, async () => {
				// This block will only execute if the user is authenticated
				const lecture = await Lecture.findByIdAndUpdate(
					id,
					{ title: newTitle },
					{ new: true }
				);
				return lecture;
			});
		},

		deleteLecture: async (_, { id }, context) => {
			// Use the authMiddleware to check authentication
			authMiddleware(context.req, context.res, async () => {
				// This block will only execute if the user is authenticated
				await Lecture.findByIdAndDelete(id);
				return "Lecture deleted successfully";
			});
		},

		updateLectureSettings: async (_, { lectureId, settings }, context) => {
			// Use the authMiddleware to check authentication
			authMiddleware(context.req, context.res, async () => {
				// This block will only execute if the user is authenticated
				const updatedLecture = await Lecture.findByIdAndUpdate(
					lectureId,
					{ settings },
					{ new: true }
				);
				return updatedLecture;
			});
		},
	},
};

module.exports = resolvers;
