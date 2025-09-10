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

export const ASSIGN_ORGANIZATION_ADMIN = gql`
  mutation AssignOrganizationAdmin($input: AssignAdminInput!) {
    assignAdmin(input: $input) {
      success
      message
      admin {
        assignmentId
        userId
        organizationId
        roleId
        isActive
        createdAt
      }
    }
  }
`;

export const REMOVE_ORGANIZATION_ADMIN = gql`
  mutation RemoveOrganizationAdmin($adminId: ID!) {
    removeAdmin(adminId: $adminId) {
      success
      message
      admin {
        assignmentId
        userId
        organizationId
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
export const CREATE_ORGANIZATION = gql`
  mutation CreateOrganization($input: CreateOrganizationInput!) {
    createOrganization(input: $input) {
      success
      message
      organization {
        organizationId
        name
        slug
      }
    }
  }
`;

export const UPDATE_ORGANIZATION = gql`
  mutation UpdateOrganization($organizationId: ID!, $input: UpdateOrganizationInput!) {
    updateOrganization(organizationId: $organizationId, input: $input) {
      success
      message
      organization {
        organizationId
        name
        slug
      }
    }
  }
`;

export const FOLLOW_ORGANIZATION = gql`
  mutation FollowOrganization($organizationId: ID!) {
    followOrganization(organizationId: $organizationId) {
      success
      message
      organization {
        organizationId
        followers
      }
    }
  }
`;

export const UNFOLLOW_ORGANIZATION = gql`
  mutation UnfollowOrganization($organizationId: ID!) {
    unfollowOrganization(organizationId: $organizationId) {
      success
      message
      organization {
        organizationId
        followers
      }
    }
  }
`;

export const CREATE_ORGANIZATION_JOIN_REQUEST = gql`
  mutation CreateOrganizationJoinRequest($input: CreateJoinRequestInput!) {
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
  mutation ApproveOrganizationJoinRequest($requestId: ID!) {
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
  mutation RejectOrganizationJoinRequest($requestId: ID!, $reason: String!) {
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

export const CREATE_ORGANIZATION_ROLE = gql`
  mutation CreateOrganizationRole($organizationId: ID!, $input: CreateOrganizationRoleInput!) {
    createOrganizationRole(organizationId: $organizationId, input: $input) {
      success
      message
      role {
        roleId
        organizationId
        name
      }
    }
  }
`;

export const UPDATE_ORGANIZATION_ROLE = gql`
  mutation UpdateOrganizationRole($roleId: ID!, $input: UpdateOrganizationRoleInput!) {
    updateOrganizationRole(roleId: $roleId, input: $input) {
      success
      message
      role {
        roleId
        organizationId
        name
      }
    }
  }
`;

export const DELETE_ORGANIZATION_ROLE = gql`
  mutation DeleteOrganizationRole($roleId: ID!) {
    deleteOrganizationRole(roleId: $roleId) {
      success
      message
    }
  }
`;

export const CREATE_ENTITY = gql`
  mutation CreateEntity($input: CreateEntityInput!) {
    createEntity(input: $input) {
      success
      message
      entity {
        entityId
        name
        createdAt
        updatedAt
      }
    }
  }
`;

export const UPDATE_ENTITY = gql`
  mutation UpdateEntity($id: ID!, $input: UpdateEntityInput!) {
    updateEntity(id: $id, input: $input) {
      success
      message
      entity {
        id
        name
        type
        code
        description
        parentId
        createdAt
        updatedAt
      }
    }
  }
`;

export const DELETE_ENTITY = gql`
  mutation DeleteEntity($id: ID!) {
    deleteEntity(id: $id) {
      success
      message
    }
  }
`;

export const ASSIGN_ORGANIZATION_ROLE = gql`
  mutation AssignOrganizationRole($organizationId: ID!, $userId: ID!, $roleId: ID!, $departmentId: ID) {
    assignOrganizationRole(
      organizationId: $organizationId
      userId: $userId
      roleId: $roleId
      departmentId: $departmentId
    ) {
      success
      message
      role {
        roleId
        organizationId
        name
      }
    }
  }
`;

export const REMOVE_ORGANIZATION_ROLE = gql`
  mutation RemoveOrganizationRole($organizationId: ID!, $userId: ID!) {
    removeOrganizationRole(organizationId: $organizationId, userId: $userId) {
      success
      message
    }
  }
`;

export const INVITE_ENTITY_MEMBER = gql`
  mutation InviteEntityMember($input: InviteEntityMemberInput!) {
    inviteEntityMember(input: $input) {
      success
      message
    }
  }
`;

export const ACCEPT_ENTITY_INVITE = gql`
  mutation AcceptEntityInvite($input: AcceptEntityInviteInput!) {
    acceptEntityInvite(input: $input) {
      success
      message
      invite {
        inviteId
        email
        status
        entityId
        userId
      }
    }
  }
`;

export const REJECT_ENTITY_INVITE = gql`
  mutation RejectEntityInvite($input: RejectEntityInviteInput!) {
    rejectEntityInvite(input: $input) {
      success
      message
    }
  }
`;

export const ADD_MESSAGE_TO_ENTITY_CHAT = gql`
  mutation AddMessageToEntityChat($input: AddMessageToEntityChatInput!) {
    addMessageToEntityChat(input: $input) {
      success
      message
      entityChat {
        entityChatId
        entityId
        userId
        messages {
          userId
          message
          createdAt
        }
      }
    }
  }
`;

export const CREATE_ENTITY_REQUEST = gql`
  mutation CreateEntityRequest($input: CreateEntityRequestInput!) {
    createEntityRequest(input: $input) {
      success
      message
    }
  }
`;

export const ACCEPT_ENTITY_JOIN_REQUEST = gql`
  mutation AcceptEntityJoinRequest($requestId: String!) {
    acceptEntityJoinRequest(requestId: $requestId) {
      success
      message
    }
  }
`;

export const REJECT_ENTITY_JOIN_REQUEST = gql`
  mutation RejectEntityJoinRequest($requestId: String!) {
    rejectEntityJoinRequest(requestId: $requestId) {
      success
      message
    }
  }
`;
