import { gql } from '@apollo/client';

export const SUPER_ADMIN_LOGIN = gql`
  mutation SuperAdminLogin($email: String!, $password: String!) {
    superAdminLogin(email: $email, password: $password) {
      success
      message
      token
      requiresTwoFactor
    }
  }
`;

export const VERIFY_SUPER_ADMIN_2FA = gql`
  mutation VerifySuperAdmin2FA($email: String!, $code: String!) {
    verifySuperAdmin2FA(email: $email, code: $code) {
      success
      message
      token
      user {
        id
        email
        role
      }
    }
  }
`;

export const SUPER_ADMIN_LOGOUT = gql`
  mutation SuperAdminLogout {
    superAdminLogout {
      success
      message
    }
  }
`;

export const UPDATE_SUPER_ADMIN_PROFILE = gql`
  mutation UpdateSuperAdminProfile($input: UpdateSuperAdminProfileInput!) {
    updateSuperAdminProfile(input: $input) {
      success
      message
      user {
        id
        email
        fullName
      }
    }
  }
`;

export const UPDATE_SUPER_ADMIN_PASSWORD = gql`
  mutation UpdateSuperAdminPassword($input: UpdatePasswordInput!) {
    updateSuperAdminPassword(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_SUPER_ADMIN_SETTINGS = gql`
  mutation UpdateSuperAdminSettings($input: UpdateSuperAdminSettingsInput!) {
    updateSuperAdminSettings(input: $input) {
      success
      message
      settings {
        emailNotifications
        twoFactorAuth
        maintenanceMode
        notifyOnNewInstitute
        notifyOnSystemAlerts
        notifyOnSecurityAlerts
      }
    }
  }
`;

export const ASSIGN_INSTITUTE_ADMIN = gql`
  mutation AssignInstituteAdmin($input: AssignAdminInput!) {
    assignAdmin(input: $input) {
      success
      message
      admin {
        assignmentId
        userId
        instituteId
        roleId {
          name
          permissions
        }
        isActive
        createdAt
      }
    }
  }
`;

export const REMOVE_INSTITUTE_ADMIN = gql`
  mutation RemoveInstituteAdmin($adminId: ID!) {
    removeAdmin(adminId: $adminId) {
      success
      message
      admin {
        assignmentId
        userId
        instituteId
        roleId {
          name
          permissions
        }
        isActive
        createdAt
      }
    }
  }
`;
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
