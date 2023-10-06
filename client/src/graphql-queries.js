import { gql } from "@apollo/client";

// Mutation to create a new lecture
const CREATE_LECTURE = gql`
  mutation createLecture($title: String!, $conversationId: ID!, $settingsId: ID!) {
    createLecture(title: $title, conversationId: $conversationId, settingsId: $settingsId) {
      id
      title
      conversation {
        id
        // Include conversation fields if needed
      }
      lecturesettings {
        id
        // Include lecturesettings fields if needed
      }
      createdAt
      // Add other lecture fields as needed
    }
  }
`;

const UPDATE_LECTURE_TITLE = gql`
  mutation updateLectureTitle($id: ID!, $newTitle: String!) {
    updateLectureTitle(id: $id, newTitle: $newTitle) {
      id
      title
      // Add other lecture fields as needed
    }
  }
`;

// Mutation to delete a lecture
const DELETE_LECTURE = gql`
	mutation deleteLecture($id: ID!) {
		deleteLecture(id: $id)
	}
`;

const GET_LECTURES = gql`
  query {
    getLectures {
      id
      title
      conversation {
        id
        // Include conversation fields if needed
      }
      lecturesettings {
        id
        // Include lecturesettings fields if needed
      }
      createdAt
      // Add other lecture fields as needed
    }
  }
`;

export { GET_LECTURES, CREATE_LECTURE, UPDATE_LECTURE_TITLE, DELETE_LECTURE };
