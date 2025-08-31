import { gql } from '@apollo/client';

// ... (existing mutations)

export const CREATE_INSTITUTE = gql`
  mutation CreateInstitute($input: CreateInstituteInput!) {
    createInstitute(input: $input) {
      success
      message
      institute {
        instituteId
        name
        slug
      }
    }
  }
`;

export const UPDATE_INSTITUTE = gql`
  mutation UpdateInstitute($instituteId: ID!, $input: UpdateInstituteInput!) {
    updateInstitute(instituteId: $instituteId, input: $input) {
      success
      message
      institute {
        instituteId
        name
        slug
      }
    }
  }
`;

export const FOLLOW_INSTITUTE = gql`
  mutation FollowInstitute($instituteId: ID!) {
    followInstitute(instituteId: $instituteId) {
      success
      message
      institute {
        instituteId
        followers
      }
    }
  }
`;

export const UNFOLLOW_INSTITUTE = gql`
  mutation UnfollowInstitute($instituteId: ID!) {
    unfollowInstitute(instituteId: $instituteId) {
      success
      message
      institute {
        instituteId
        followers
      }
    }
  }
`;

export const CREATE_JOIN_REQUEST = gql`
  mutation CreateJoinRequest($input: CreateJoinRequestInput!) {
    createJoinRequest(input: $input) {
      success
      message
      request {
        requestId
        status
      }
    }
  }
`;

export const APPROVE_JOIN_REQUEST = gql`
  mutation ApproveJoinRequest($requestId: ID!) {
    approveJoinRequest(requestId: $requestId) {
      success
      message
      request {
        requestId
        status
      }
    }
  }
`;

export const REJECT_JOIN_REQUEST = gql`
  mutation RejectJoinRequest($requestId: ID!, $reason: String!) {
    rejectJoinRequest(requestId: $requestId, reason: $reason) {
      success
      message
      request {
        requestId
        status
      }
    }
  }
`;

export const CREATE_INSTITUTE_ROLE = gql`
  mutation CreateInstituteRole($instituteId: ID!, $input: CreateInstituteRoleInput!) {
    createInstituteRole(instituteId: $instituteId, input: $input) {
      success
      message
      role {
        roleId
        name
      }
    }
  }
`;

export const UPDATE_INSTITUTE_ROLE = gql`
  mutation UpdateInstituteRole($roleId: ID!, $input: UpdateInstituteRoleInput!) {
    updateInstituteRole(roleId: $roleId, input: $input) {
      success
      message
      role {
        roleId
        name
      }
    }
  }
`;

export const DELETE_INSTITUTE_ROLE = gql`
  mutation DeleteInstituteRole($roleId: ID!) {
    deleteInstituteRole(roleId: $roleId) {
      success
      message
    }
  }
`;

export const ASSIGN_INSTITUTE_ROLE = gql`
  mutation AssignInstituteRole($instituteId: ID!, $userId: ID!, $roleId: ID!, $departmentId: ID) {
    assignInstituteRole(
      instituteId: $instituteId
      userId: $userId
      roleId: $roleId
      departmentId: $departmentId
    ) {
      success
      message
      role {
        roleId
        name
      }
    }
  }
`;

export const REMOVE_INSTITUTE_ROLE = gql`
  mutation RemoveInstituteRole($instituteId: ID!, $userId: ID!) {
    removeInstituteRole(instituteId: $instituteId, userId: $userId) {
      success
      message
    }
  }
`;