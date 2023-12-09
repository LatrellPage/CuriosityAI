require("dotenv").config();
const User = require("../models/User");
const Lecture = require("../models/Lecture");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ApolloError } = require("apollo-server-errors");
const { authMiddleware } = require("../utils/auth");

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

		getAllUsers: async () => {
			try {
				const users = await User.find({});
				return users;
			} catch (error) {
				throw new Error("Error fetching users");
			}
		},

		getLecture: async (_, { id }, context) => {
			if (!context.user) {
				throw new ApolloError("Not authenticated", "UNAUTHENTICATED");
			}
			try {
				const lecture = await Lecture.findById(id);
				return lecture;
			} catch (error) {
				throw new Error("Error fetching lecture");
			}
		},

		getUserLectures: async (_, __, context) => {
			if (!context.user) {
				throw new ApolloError("Not authenticated", "UNAUTHENTICATED");
			}
			try {
				const userId = context.user.userId;

				const user = await User.findById(userId).populate("lectures");
				if (!user) {
					throw new Error("User not found");
				}

				return user.lectures || [];
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
			return lecture.conversation.messages;
		},
	},

	Mutation: {
		registerUser: async (
			_,
			{ registerInput: { name, email, password } }
		) => {
			// Check if user already exist by email
			const existingUser = await User.findOne({ email });
			if (existingUser) {
				// If user exist throw error
				throw new ApolloError(
					`User with the email ${email} already exists`,
					"USER_ALREADY_EXISTS"
				);
			}
			if (password.length < 8) {
				throw new ApolloError(
					`The password must be at least 8 characters long.`,
					"The password must be at least 8 characters long."
				);
			}

			function containsNumberOrSymbol(str) {
				const hasNumber = /\d/.test(str);
				const hasSpecialSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(str);

				if(hasNumber && hasSpecialSymbol == true){
					return true
				} else {
					return false
				}
			}

			let passwordIsValid = containsNumberOrSymbol(password)

			if(passwordIsValid == false){
				throw new ApolloError(
					`Password must contain a 1 number and 1 special character`,
					"Password must contain a 1 number and 1 special character"
				);
			}

			

			// encrypt the password before storing into db
			const encryptedPassword = await bcrypt.hash(password, 10);

			const capitalizeFullName = (name) => {
				if (typeof name !== "string" || !name.trim()) {
					throw new Error("Invalid name input");
				}
				return name
					.replace(/\s+/g, " ")
					.trim()
					.split(" ")
					.map(
						(part) =>
							part.charAt(0).toUpperCase() +
							part.substring(1).toLowerCase()
					)
					.join(" ");
			};

			const capName = capitalizeFullName(name);

			console.log(capName);

			// create new user with email and encrypted password
			const newUser = new User({
				name: capName,
				email: email.toLowerCase(),
				password: encryptedPassword,
			});

			// create a token
			const token = jwt.sign(
				{ userId: newUser._id, name, email },
				process.env.SECRET_KEY,
				{
					expiresIn: "1h",
				}
			);

			// Attach that token to user
			newUser.token = token;

			// store user into db
			const res = await newUser.save();

			return {
				id: res.id,
				...res._doc,
			};
		},

		loginUser: async (_, { loginInput: { email, password } }) => {
			// Find user by email
			const user = await User.findOne({ email });

			// if user exist compare input password to encrypted password
			if (user && (await bcrypt.compare(password, user.password))) {
				const token = jwt.sign(
					{ userId: user._id, name: user.name, email },
					process.env.SECRET_KEY,
					{
						expiresIn: "1h",
					}
				);

				// Attach token to user model that we found above
				user.token = token;

				return {
					id: user.id,
					...user._doc,
				};
			} else {
				// If user doesnt exist, return error
				throw new ApolloError(
					"Invalid credentials",
					"INVALID_CREDENTIALS"
				);
			}
		},

		createLecture: async (_, __, context) => {
			if (!context.user) {
				throw new ApolloError("Not authenticated", "UNAUTHENTICATED");
			}
			try {
				const userId = context.user.userId;

				const lecture = new Lecture({
					title: "New Lecture",
					userId,
				});

				await lecture.save();

				const user = await User.findById(userId);
				if (!user) {
					throw new Error("User not found");
				}
				user.lectures.push(lecture);
				await user.save();

				return lecture;
			} catch (error) {
				throw new Error(`Lecture creation failed: ${error.message}`);
			}
		},

		deleteLecture: async (_, { id }, context) => {
			if (!context.user) {
				throw new ApolloError("Not authenticated", "UNAUTHENTICATED");
			}

			try {
				await Lecture.findByIdAndDelete(id);
				return "Lecture deleted successfully";
			} catch (error) {
				throw new Error(`Lecture deletion failed: ${error.message}`);
			}
		},

		insertMessageToLecture: async (_, { lectureId, message }, context) => {
			if (!context.user) {
				throw new ApolloError("Not authenticated", "UNAUTHENTICATED");
			}
			try {
				const lecture = await Lecture.findById(lectureId);
				if (!lecture) {
					throw new Error("Lecture not found");
				}

				const { text, sender } = message;

				lecture.conversation.messages.push({ text, sender });
				await lecture.save();
				console.log("successfully entered message");
				return lecture;
			} catch (error) {
				throw new Error(`Failed to insert message: ${error.message}`);
			}
		},

		updateLectureSettings: async (_, { lectureId, settings }, context) => {
			if (!context.user) {
				throw new ApolloError("Not authenticated", "UNAUTHENTICATED");
			}
			try {
				const lecture = await Lecture.findById(lectureId);
				if (!lecture) {
					throw new Error("Lecture not found");
				}

				if (settings.title) {
					lecture.title = settings.title;
				}

				// Save the updated lecture
				await lecture.save();

				return lecture; // Return updated lecture
			} catch (error) {
				throw new Error(
					`Failed to update lecture settings: ${error.message}`
				);
			}
		},
	},
};

module.exports = resolvers;
