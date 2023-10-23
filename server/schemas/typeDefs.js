const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type User {
		_id: ID!
		username: String!
		email: String!
		lectures: [Lecture]
	}

	type LectureSettings {
		professor: String
		language: String
		# Add other settings fields as needed
	}

	type Lecture {
		_id: ID!
		title: String!
		createdBy: ID!
		settings: LectureSettings
		createdAt: String
	}

	type Conversation {
		_id: ID!
		text: String!
		user: User
		createdAt: String
	}

	type Query {
		getUser(id: ID!): User
		getLecture(id: ID!): Lecture
		getAllLectures: [Lecture]
		# Add other query types as needed
	}

	type Mutation {
		registerUser(
			username: String!
			email: String!
			password: String!
		): AuthPayload
		loginUser(email: String!, password: String!): AuthPayload
		createLecture(title: String!, userId: ID!): Lecture
		updateLectureTitle(id: ID!, newTitle: String!): Lecture
		deleteLecture(id: ID!): String
		updateLectureSettings(
			lectureId: ID!
			professor: String
			language: String
		): Lecture
	}

	type AuthPayload {
		token: String!
	}

	input LectureSettingsInput {
		professor: String
		language: String
		# Add other settings fields as needed
	}
`;

module.exports = typeDefs;
