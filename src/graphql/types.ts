// User types
export interface User {
  id: string;
  name: string;
  email: string;
  profile?: {
    avatar?: string;
    bio?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

// Job types
export interface Job {
  _id: string;
  jobId: string;
  jobNumber: number;
  jobStatus: string;
  createdAt: string;
  updatedAt: string;
  client: {
    firstName: string;
    lastName: string;
    companyName: string;
  };
  schedule?: {
    startTime: string;
    endTime: string;
  };
  tags: string[];
  address: {
    addressLine: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
}

export interface JobType {
  _id: string;
  jobTypeId: string;
  name: string;
  description: string;
  displayOrder: number;
  days: number;
  hours: number;
  minutes: number;
}

export interface JobSource {
  _id: string;
  jobSourceId: string;
  name: string;
  description: string;
  displayOrder: number;
}

// Auth types
export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  token: string;
  user: User;
}

// Input types
export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
}

// Query response types
export interface GetUsersResponse {
  users: User[];
}

export interface GetUserResponse {
  user: User;
}

export interface CreateJobResponse {
  createJob: {
    success: boolean;
    message: string;
    job: Job;
  };
}

export interface CreateClientResponse {
  createClient: {
    success: boolean;
    message: string;
    client: {
      _id: string;
      clientId: string;
      firstName: string;
      lastName: string;
      email: string;
      companyName: string;
    };
  };
}

export interface GetJobsResponse {
  listJobsByBranch: {
    success: boolean;
    message: string;
    jobs: Job[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
export interface Client {
  _id: string;
  clientId: string;
  name: string;
  clientNumber?: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  altPhone?: string;
  companyName?: string;
  adSource?: string;
  allowBilling: boolean;
  taxExempt: boolean;
  addresses?: {
    addressLine: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  }[];
  map?: {
    latitude: number;
    longitude: number;
  };
  createdAt: string;
  updatedAt: string;
}
export interface GetClientsListResponse {
  listClients: {
    success: boolean;
    message: string;
    clients: Client[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface GetClientsByBranchResponse {
  listClientsByBranch: {
    success: boolean;
    message: string;
    clients: Client[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GetJobTypesResponse {
  listJobTypesByBranch: {
    success: boolean;
    message: string;
    jobTypes: JobType[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface CreateJobTypeInput {
  name: string;
  description: string;
  displayOrder: number;
  days: number;
  hours: number;
  minutes: number;
}

export interface CreateJobTypeResponse {
  createJobType: {
    success: boolean;
    message: string;
    jobType: JobType;
  };
}

export interface GetJobSourcesResponse {
  listJobSourcesByBranch: {
    success: boolean;
    message: string;
    jobSources: JobSource[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface CreateJobSourceResponse {
  createJobSource: {
    success: boolean;
    message: string;
    jobSource: JobSource;
  };
}

export interface JobStats {
  SUBMITTED: number;
  IN_PROGRESS: number;
  CANCELLED: number;
  DONE: number;
  PENDING: number;
  DONE_PENDING_APPROVAL: number;
}

export interface GetJobStatsResponse {
  getJobStatsByBranch: {
    success: boolean;
    stats: JobStats;
  };
}

export interface GetClientByIdResponse {
  getClientById: {
    success: boolean;
    client: Client;
  };
}

export interface GetClientJobsResponse {
  listJobsByClientId: {
    success: boolean;
    jobs: Job[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GetClientByClientNumberResponse {
  getClientByClientNumber: {
    success: boolean;
    client: Client;
  };
}
