export type EntityType = 'DEPARTMENT' | 'COMMITTEE' | 'TEAM' | 'OTHER';
export type EntityStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

export interface EntityMember {
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

export interface Entity {
  entityId: string;
  name: string;
  type: EntityType;
  code: string;
  description?: string;
  parentEntityId?: string | null;
  status: EntityStatus;
  member?: EntityMember;
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

export interface InviteStudentInput {
  email: string;
  firstName: string;
  lastName: string;
  entityId: string;
  rollNumber: string;
  batch: string;
  program: string;
}
