// User types
export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  avatar: string;
  username: string;
  email: string;
  profile?: {
    avatar?: string;
    bio?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface IEntity {
  name: string;
  entityId: string;
  type: string;
  code: string;
  description: string;
  parentEntityId: string;
  metadata?: {
    totalMembers: number;
    totalEvents: number;
  };
  status: string;
  logo?: string;
  banner?: string;
  createdAt?: string;
  updatedAt?: string;
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

export interface IInvite {
  inviteId: string;
  entityId: string;
  status: string;
  userId: string;
  email: string;
  rollNumber: string;
  batch: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface IInviteWithEntity {
  inviteId: string;
  email: string;
  status: string;
  entityId: string;
  userId: string;
  role: string;
  rollNumber: string;
  batch: string;
  createdAt: string;
  updatedAt: string;
  entity: IEntity;
}

export interface IInviteWithUser {
  inviteId: string;
  email: string;
  status: string;
  entityId: string;
  userId: string;
  role: string;
  rollNumber: string;
  batch: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface IInvitesResponse {
  getMyEntityInvites: {
    success: boolean;
    message: string;
    invites: IInviteWithEntity[];
  };
}

export interface IInviteByEntityIdResponse {
  getInviteByEntityId: {
    success: boolean;
    message: string;
    invites: IInviteWithUser[];
  };
}

export interface IEntityMember {
  user: {
    userId: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  role: {
    roleId: string;
    name: string;
    permissions: string[];
  };
  joinedAt: string;
  status: string;
}

export interface IEntityMembersResponse {
  getEntityMembers: {
    success: boolean;
    message: string;
    members: IEntityMember[];
  };
}
