export interface Institute {
  id: string;
  instituteId: string;
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

export interface InstituteRole {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  isCustom: boolean;
}

export interface InstituteJoinRequest {
  id: string;
  userId: string;
  instituteId: string;
  name: string;
  rollNumber: string;
  department: string;
  school: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface InstituteAdmin {
  id: string;
  userId: string;
  instituteId: string;
  role: InstituteRole;
  createdAt: string;
}

export interface InstituteStudent {
  id: string;
  userId: string;
  instituteId: string;
  name: string;
  rollNumber: string;
  department: string;
  school: string;
  joinedAt: string;
}
