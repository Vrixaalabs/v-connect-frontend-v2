export interface Organization {
  id: string;
  organizationId: string;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  coverImage?: string;
  location: string;
  website?: string;
  departments: Department[];
  followersCount: number;
  studentsCount: number;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description?: string;
}

export interface OrganizationRole {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  isCustom: boolean;
}

export interface OrganizationJoinRequest {
  id: string;
  userId: string;
  organizationId: string;
  name: string;
  rollNumber: string;
  department: string;
  school: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface OrganizationAdmin {
  id: string;
  userId: string;
  organizationId: string;
  role: OrganizationRole;
  createdAt: string;
}

export interface OrganizationStudent {
  id: string;
  userId: string;
  organizationId: string;
  name: string;
  rollNumber: string;
  department: string;
  school: string;
  joinedAt: string;
}

export interface InstituteStudent {
  id: string;
  userId: string;
  organizationId: string;
  name: string;
  rollNumber: string;
  department: string;
  school: string;
  joinedAt: string;
}

export interface InstituteRole {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  isDefault: boolean;
}