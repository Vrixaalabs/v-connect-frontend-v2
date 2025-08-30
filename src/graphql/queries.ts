import { gql } from '@apollo/client';

// User queries
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      profile {
        avatar
        bio
      }
    }
  }
`;

export const GET_JOBS = gql`
  query GetJobs($branchId: ID!, $page: Int, $limit: Int, $search: String, $jobStatus: JobStatus) {
    listJobsByBranch(branchId: $branchId, page: $page, limit: $limit, search: $search, jobStatus: $jobStatus) {
      success
      message
      jobs {
        jobId
        jobNumber
        client {
          firstName
          lastName
          companyName
        }
        schedule {
          startTime
          endTime
        }
        createdAt
        updatedAt
        jobStatus
        tags
      }
      total
      page
      limit
      totalPages
    }
  }
`;

export const GET_JOB_TYPES = gql`
  query GetJobTypes($branchId: ID!) {
    listJobTypesByBranch(branchId: $branchId, page: 1, limit: 10) {
      success
      message
      jobTypes {
        jobTypeId
        name
        description
        displayOrder
        days
        hours
        minutes
      }
      total
      page
      limit
    }
  }
`;

export const GET_JOB_SOURCES = gql`
  query GetJobSources($branchId: ID!) {
    listJobSourcesByBranch(branchId: $branchId, page: 1, limit: 10) {
      success
      message
      jobSources {
        jobSourceId
        name
        description
        displayOrder
      }
      total
      page
      limit
    }
  }
`;

export const GET_CLIENTS = gql`
  query GetClients($page: Int, $limit: Int, $search: String) {
    listClients(page: $page, limit: $limit, search: $search) {
      success

      clients {
        clientId
        firstName
        lastName
        companyName
        clientNumber
        phone
        addresses {
          addressLine
          city
          region
          postalCode
          country
        }
        createdAt
      }
      total
      page
      limit
    }
  }
`;

export const GET_CLIENTS_BY_BRANCH = gql`
  query GetClientsByBranch($branchId: ID!, $page: Int, $limit: Int, $search: String) {
    listClientsByBranch(branchId: $branchId, page: $page, limit: $limit, search: $search) {
      success
      clients {
        clientId
        firstName
        lastName
        companyName
        clientNumber
        phone
        addresses {
          addressLine
          city
          region
          postalCode
          country
        }
        createdAt
      }
      total
      page
      limit
    }
  }
`;

export const GET_CLIENT_BY_ID = gql`
  query GetClientById($clientId: ID!) {
    getClientById(clientId: $clientId) {
      success
      client {
        clientId
        firstName
        lastName
        companyName
        phone
        addresses {
          addressLine
          city
          region
          postalCode
          country
        }
          createdAt
      } 
    }
  }
`;

export const GET_CLIENT_BY_CLIENT_NUMBER = gql`
  query GetClientByClientNumber($clientNumber: Int!) {
    getClientByClientNumber(clientNumber: $clientNumber) {
      success
      client {
        clientId
        firstName
        lastName
        clientNumber
        companyName
        phone
        addresses {
          addressLine
          city
          region
          postalCode
          country
        }
        createdAt
      }
    }
  }
`;

export const GET_JOB_STATS = gql`
  query GetJobStats($branchId: ID!) {
    getJobStatsByBranch(branchId: $branchId) {
      success
      stats {
        SUBMITTED
        IN_PROGRESS
        CANCELLED
        DONE
        PENDING
        DONE_PENDING_APPROVAL
      }
    }
  }
`;

export const GET_CLIENT_JOBS = gql`
  query GetClientJobs($clientId: ID!, $page: Int, $limit: Int) {
    listJobsByClientId(clientId: $clientId, page: $page, limit: $limit) {
      success
      message
      jobs {
        jobId
        jobNumber
        jobStatus
        tags
        createdAt
        updatedAt
        address {
          addressLine
          city
          region
          postalCode
          country
        }
        client {
          firstName
          lastName
          companyName
        }
      }
      total
      page
      limit
      totalPages
    }
  }
`;