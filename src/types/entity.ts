export type EntityType = 'department' | 'school' | 'office' | 'center' | 'other';

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  code: string;
  description?: string;
  parentId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEntityInput {
  name: string;
  type: EntityType;
  code: string;
  description?: string;
  parentId?: string | null;
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
