import { gql } from '@apollo/client';

// User mutations
export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      createdAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
      updatedAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      success
    }
  }
`;

// Auth queries
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const CREATE_JOB = gql`
  mutation CreateJob($input: CreateJobInput!) {
    createJob(input: $input) {
      success
      message
      job {
        jobId
      }
    }
  }
`;

export const CREATE_CLIENT = gql`
  mutation CreateClient($input: CreateClientInput!) {
    createClient(input: $input) {
      success
      message
      client {
        clientId
      }
    }
  }
`;

export const CREATE_JOB_TYPE = gql`
  mutation CreateJobType($input: CreateJobTypeInput!) {
    createJobType(input: $input) {
      success
      message
      jobType {
        jobTypeId
        name
        description
      }
    }
  }
`;

export const CREATE_JOB_SOURCE = gql`
  mutation CreateJobSource($input: CreateJobSourceInput!) {
    createJobSource(input: $input) {
      success
      message
      jobSource {
        jobSourceId
        name
        description
      }
    }
  }
`;

export const CREATE_TAG_AND_ADD_TO_CLIENT = gql`
  mutation CreateTagAndAddToClient($input: TagInput!, $clientId: ID!) {
    createTagAndAddToClient(input: $input, clientId: $clientId) {
      success
      message
      tag {
        tagId
        name
        description
        color
      }
    }
  }
`;