import { gql } from '@apollo/client';

export const GET_SUPER_ADMIN_SETTINGS = gql`
  query GetSuperAdminSettings {
    getSuperAdminSettings {
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
      user {
        id
        email
        fullName
      }
    }
  }
`;

export const GET_SUPER_ADMIN_DASHBOARD_STATS = gql`
  query GetSuperAdminDashboardStats {
    getSuperAdminDashboardStats {
      totalInstitutes
      totalStudents
      totalDepartments
      activeAdmins
    }
  }
`;

export const GET_RECENT_ACTIVITIES = gql`
  query GetRecentActivities($limit: Int) {
    getRecentActivities(limit: $limit) {
      id
      type
      message
      time
      instituteId
      userId
    }
  }
`;

export const GET_SYSTEM_STATUS = gql`
  query GetSystemStatus {
    getSystemStatus {
      status
      load
      lastUpdated
    }
  }
`;

export const GET_ORGANIZATION_ADMINS = gql`
  query GetOrganizationAdmins($page: Int, $limit: Int, $search: String) {
    getOrganizationAdmins(page: $page, limit: $limit, search: $search) {
      success
      message
      admins {
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
      total
      page
      limit
    }
  }
`;

export const GET_ORGANIZATION_ADMIN = gql`
  query GetOrganizationAdmin($adminId: ID!) {
    getOrganizationAdmin(adminId: $adminId) {
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

export const SEARCH_ORGANIZATIONS = gql`
  query SearchOrganizations($filter: OrganizationFilterInput, $page: Int!, $limit: Int!) {
    searchOrganizations(filter: $filter, page: $page, limit: $limit) {
      success
      message
      institutes {
        organizationId
        name
        slug
        description
        logo
        banner
        email
        phone
        address {
          city
          state
          country
        }
        departments {
          id
          name
          code
        }
        isVerified
        isActive
      }
      total
      page
      limit
    }
  }
`;

export const GET_ORGANIZATION_BY_SLUG = gql`
  query GetOrganizationBySlug($slug: String!) {
    getOrganizationBySlug(slug: $slug) {
      success
      message
      organization {
        organizationId
        name
        slug
        description
        logo
        banner
        website
        email
        phone
        address {
          line1
          line2
          city
          state
          country
          pinCode
        }
        departments {
          id
          name
          code
          description
        }
        followers
        isVerified
        isActive
      }
    }
  }
`;

export const GET_ORGANIZATION_ROLES = gql`
  query GetOrganizationRoles($organizationId: ID!) {
    getOrganizationRoles(organizationId: $organizationId) {
      success
      message
      roles {
        roleId
        name
        description
        permissions
        isDefault
      }
    }
  }
`;

export const GET_JOIN_REQUESTS = gql`
  query GetJoinRequests($organizationId: ID!, $status: String, $page: Int!, $limit: Int!) {
    getJoinRequests(organizationId: $organizationId, status: $status, page: $page, limit: $limit) {
      success
      message
      requests {
        requestId
        fullName
        email
        rollNumber
        departmentId
        batch
        status
        createdAt
      }
      total
      page
      limit
    }
  }
`;

export const GET_ORGANIZATION_BY_ID = gql`
  query GetOrganizationById($organizationId: ID!) {
    getOrganizationById(organizationId: $organizationId) {
      success
      message
      organization {
        organizationId
        name
        slug
        description
        logo
        banner
        website
        email
        phone
        address {
          line1
          line2
          city
          state
          country
          pinCode
        }
        departments {
          id
          name
          code
          description
        }
        followers
        isVerified
        isActive
      }
    }
  }
`;
