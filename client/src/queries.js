import { gql } from "@apollo/client";

// Mutation to create a new lecture
const CREATE_LECTURE = gql`
  mutation createLecture($title: String!, $userId: ID!) {
    createLecture(title: $title, userId: $userId) {
      _id
      title
      createdBy
      settings {
        professor
        language
      }
      createdAt
    }
  }
`;

const UPDATE_LECTURE_TITLE = gql`
  mutation updateLectureTitle($id: ID!, $newTitle: String!) {
    updateLectureTitle(id: $id, newTitle: $newTitle) {
      _id
      title
      settings {
        professor
        language
      }
      createdAt
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
  query getLectures {
    getAllLectures {
      _id
      title
      conversation
      createdBy
      settings {
        professor
        language
      }
      createdAt
    }
  }
`;

const UPDATE_LECTURE_SETTINGS = gql`
  mutation UpdateLectureSettings($lectureId: ID!, $professor: String!, $language: String!) {
    updateLectureSettings(lectureId: $lectureId, professor: $professor, language: $language) {
      id
      title
      settings {
        professor
        language
      }
    }
  }
`;

export { GET_LECTURES, CREATE_LECTURE, UPDATE_LECTURE_TITLE, DELETE_LECTURE, UPDATE_LECTURE_SETTINGS };
