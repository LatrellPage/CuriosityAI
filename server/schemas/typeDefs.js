const { gql } = require('apollo-server-express');


const typeDefs = gql`
	type User {
		id: ID!
		username: String!
		email: String!
		lectures: [Lecture]
	}

	type Lecture {
		id: ID!
		title: String!
		createdBy: User!
		conversations: [Conversation]
		settings: LectureSettings
	}

	type Conversation {
		id: ID!
		text: String!
		user: User!
	}

	type LectureSettings {
		id: ID!
		setting1: String
		setting2: Int
		# Add other settings fields as needed
	}

	type Query {
		getUser(id: ID!): User
		getLecture(id: ID!): Lecture
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
			settings: LectureSettingsInput
		): Lecture
	}

	type AuthPayload {
		token: String!
	}

	input LectureSettingsInput {
		setting1: String
		setting2: Int
		# Add other settings fields as needed
	}
`;

module.exports = typeDefs;
