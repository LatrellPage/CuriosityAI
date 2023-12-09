const { gql } = require("apollo-server-express");

const typeDefs = gql`
	# User type represents a user in the system
	type User {
		_id: ID!
		name: String
		email: String
		password: String
		token: String
	}


	# Lecture type represents a lecture with associated settings, conversation, and messages
	type Lecture {
		_id: ID!
		title: String!
		conversation: [Message]
		createdAt: String
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
		getUserLectures: [Lecture!]!
		getAllLectures: [Lecture]
	}

	input MessageInput {
		text: String!
		sender: String
		timestamp: String
	}

	input RegisterInput{
		name: String
		email: String
		password: String
	}

	input LoginInput{
		email: String
		password: String
	}

	# Input type for updating lecture settings
	input LectureSettingsInput {
		title: String
	}

	type Mutation {
		registerUser(registerInput: RegisterInput): User
		loginUser(loginInput: LoginInput): User
		deleteLecture(id: ID!): String
		createLecture: Lecture
		insertMessageToLecture(lectureId: ID!, message: MessageInput!): Lecture
		updateLectureSettings(lectureId: ID!, settings: LectureSettingsInput!): Lecture
	}
`;

module.exports = typeDefs;
