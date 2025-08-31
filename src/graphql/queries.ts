import { gql } from '@apollo/client';

// ... (existing queries)

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