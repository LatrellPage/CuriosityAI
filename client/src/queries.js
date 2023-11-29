import { gql } from "@apollo/client";

// Mutation to register a new user
export const REGISTER_USER = gql`
  mutation registerUser($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      _id
      name
      email
      password
      token
    }
  }
`;

// Mutation to login a user
export const LOGIN_USER = gql`
  mutation loginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      _id
      name
      email
      token
    }
  }
`;

// Mutation to create a new lecture
export const CREATE_LECTURE = gql`
  mutation createLecture($userId: ID!) {
    createLecture(userId: $userId) {
      _id
      title
      language
      professor
      userId
    }
  }
`;

// Mutation to insert a message into a lecture
export const INSERT_MESSAGE_TO_LECTURE = gql`
  mutation insertMessageToLecture($lectureId: ID!, $message: MessageInput!) {
    insertMessageToLecture(lectureId: $lectureId, message: $message) {
      _id
      conversation {
        _id
        text
        sender
        timestamp
      }
    }
  }
`;

// Mutation to update lecture settings
export const UPDATE_LECTURE_SETTINGS = gql`
  mutation updateLectureSettings($lectureId: ID!, $settings: LectureSettingsInput!) {
    updateLectureSettings(lectureId: $lectureId, settings: $settings) {
      _id
      title
      language
      professor
    }
  }
`;

// Mutation to delete a lecture
export const DELETE_LECTURE = gql`
  mutation deleteLecture($id: ID!) {
    deleteLecture(id: $id)
  }
`;


// Query to get lectures for a specific user
export const GET_USER_LECTURES = gql`
  query getUserLectures($userId: ID!) {
    getUserLectures(userId: $userId) {
      _id
      title
      language
      professor
    }
  }
`;

// Query to get a single lecture
export const GET_LECTURE = gql`
  query getLecture($id: ID!) {
    getLecture(id: $id) {
      _id
      title
      language
      professor
      conversation {
        _id
        text
        sender
        timestamp
      }
    }
  }
`;

// Query to get a single user
export const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      _id
      name
    }
  }
`;

