export type EntityType = 'INSTITUTE' | 'SCHOOL' | 'DEPARTMENT' | 'CLUB' | 'TEAM' | 'OTHER';
export type EntityStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

export interface EntityUserRole {
  user: {
    userId: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  role: {
    roleId: string;
    name: string;
    permissions: string[];
  };
  joinedAt: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface EntityMetadata {
  totalUsers: number;
  totalPosts: number;
  totalEvents: number;
  lastActivityAt?: string;
}

export interface Entity {
  entityId: string;
  entityChatId: string;
  name: string;
  type: EntityType;
  code: string;
  description?: string;
  parentEntityId?: string | null;
  parentEntityName?: string | null;
  status: EntityStatus;
  member?: EntityUserRole;
  metadata?: EntityMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEntityInput {
  name: string;
  type: EntityType;
  code: string;
  description?: string;
  parentEntityId?: string | null;
}

export interface UpdateEntityInput extends Partial<CreateEntityInput> {
  id: string;
}

export type InviteStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';

export interface InviteStudentInput {
  email: string;
  firstName: string;
  lastName: string;
  entityId: string;
  rollNumber: string;
  batch: string;
  program: string;
}

export interface EntityInvite {
  inviteId: string;
  entity: Entity;
  email: string;
  firstName: string;
  lastName: string;
  rollNumber: string;
  batch: string;
  program: string;
  status: InviteStatus;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface AcceptInviteInput {
  inviteId: string;
}

export interface RejectInviteInput {
  inviteId: string;
}
