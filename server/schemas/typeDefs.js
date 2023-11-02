const { gql } = require("apollo-server-express");

const typeDefs = gql`
	# User type represents a user in the system
	type User {
		_id: ID!
		email: String
		password: String
		token: String
		lectures: [Lecture]
	}


	# Lecture type represents a lecture with associated settings, conversation, and messages
	type Lecture {
		_id: ID!
		title: String!
		language: String
		professor: String
		conversation: [Message]
		userId: ID
	}

	type Message {
		_id: ID!
		text: String!
		sender: String
		timestamp: String
	}

	# Query type for retrieving data
	type Query {
		getUser(id: ID!): User
		getAllUsers: [User]
		getLecture(id: ID!): Lecture
		getUserLectures(userId: ID!): [Lecture]
		getAllLectures: [Lecture]
	}

	input MessageInput {
		text: String!
		sender: String
		timestamp: String
	}

	input RegisterInput{
		email: String
		password: String
	}

	input LoginInput{
		email: String
		password: String
	}

	# Input type for updating lecture settings
	input LectureSettingsInput {
		professor: String
		language: String
		# Add other settings fields as needed
	}

	type Mutation {
		registerUser(
			registerInput: RegisterInput
		): User
		loginUser(loginInput: LoginInput): User
		deleteLecture(id: ID!): String
		createLecture(userId: ID!): Lecture
	}
`;

module.exports = typeDefs;
