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

export const GET_INSTITUTE_ADMINS = gql`
  query GetInstituteAdmins($page: Int, $limit: Int, $search: String) {
    getInstituteAdmins(page: $page, limit: $limit, search: $search) {
      success
      message
      admins {
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
      total
      page
      limit
    }
  }
`;

export const GET_INSTITUTE_ADMIN = gql`
  query GetInstituteAdmin($adminId: ID!) {
    getInstituteAdmin(adminId: $adminId) {
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

export const SEARCH_INSTITUTES = gql`
  query SearchInstitutes($filter: InstituteFilterInput, $page: Int!, $limit: Int!) {
    searchInstitutes(filter: $filter, page: $page, limit: $limit) {
      success
      message
      institutes {
        instituteId
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

export const GET_INSTITUTE_BY_SLUG = gql`
  query GetInstituteBySlug($slug: String!) {
    getInstituteBySlug(slug: $slug) {
      success
      message
      institute {
        instituteId
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

export const GET_INSTITUTE_ROLES = gql`
  query GetInstituteRoles($instituteId: ID!) {
    getInstituteRoles(instituteId: $instituteId) {
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
  query GetJoinRequests($instituteId: ID!, $status: String, $page: Int!, $limit: Int!) {
    getJoinRequests(instituteId: $instituteId, status: $status, page: $page, limit: $limit) {
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