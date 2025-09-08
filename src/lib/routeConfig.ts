import type { UserRole } from './tokenService';

export interface RouteConfig {
  path: string;
  requireAuth: boolean;
  redirectTo?: string;
  requireBranch?: boolean;
  allowedRoles?: UserRole[];
}

export const routeConfig: Record<string, RouteConfig> = {
  // Institute routes
  '/institutes': {
    path: '/institutes',
    requireAuth: true,
    redirectTo: '/login',
  },
  '/institute/[slug]': {
    path: '/institute/[slug]',
    requireAuth: true,
    redirectTo: '/login',
  },
  
  // Institute admin routes
  '/admin/institute/dashboard': {
    path: '/admin/institute/dashboard',
    requireAuth: true,
    allowedRoles: ['admin'],
    requireBranch: true,
    redirectTo: '/admin/institute/login',
  },
  '/admin/institute/students': {
    path: '/admin/institute/students',
    requireAuth: true,
    allowedRoles: ['admin'],
    requireBranch: true,
    redirectTo: '/login',
  },
  '/admin/institute/roles': {
    path: '/admin/institute/roles',
    requireAuth: true,
    allowedRoles: ['admin'],
    requireBranch: true,
    redirectTo: '/login',
  },
  '/admin/institute/requests': {
    path: '/admin/institute/requests',
    requireAuth: true,
    allowedRoles: ['admin'],
    requireBranch: true,
    redirectTo: '/login',
  },
  '/admin/institute/settings': {
    path: '/admin/institute/settings',
    requireAuth: true,
    allowedRoles: ['admin'],
    requireBranch: true,
    redirectTo: '/admin/institute/login',
  },
  '/admin/institute/students/invite': {
    path: '/admin/institute/students/invite',
    requireAuth: true,
    allowedRoles: ['admin'],
    requireBranch: true,
    redirectTo: '/admin/institute/login',
  },
  '/admin/institute/entities': {
    path: '/admin/institute/entities',
    requireAuth: true,
    allowedRoles: ['admin'],
    requireBranch: true,
    redirectTo: '/admin/institute/login',
  },

  // Super admin routes
  '/super-admin/login': {
    path: '/super-admin/login',
    requireAuth: false,
    redirectTo: '/super-admin/dashboard',
  },
  '/super-admin/dashboard': {
    path: '/super-admin/dashboard',
    requireAuth: true,
    allowedRoles: ['super_admin'],
    redirectTo: '/super-admin/login',
  },
  '/super-admin/institutes': {
    path: '/super-admin/institutes',
    requireAuth: true,
    allowedRoles: ['super_admin'],
    redirectTo: '/super-admin/login',
  },
  '/super-admin/admins': {
    path: '/super-admin/admins',
    requireAuth: true,
    allowedRoles: ['super_admin'],
    redirectTo: '/super-admin/login',
  },
  '/super-admin/settings': {
    path: '/super-admin/settings',
    requireAuth: true,
    allowedRoles: ['super_admin'],
    redirectTo: '/super-admin/login',
  },
  '/super-admin/institutes/[instituteId]': {
    path: '/super-admin/institutes/[instituteId]',
    requireAuth: true,
    allowedRoles: ['super_admin'],
    redirectTo: '/super-admin/login',
  },
  '/admin/institute/create-password': {
    path: '/admin/institute/create-password',
    requireAuth: false,
    redirectTo: '/admin/institute/login',
  },
  '/admin/institute/login': {
    path: '/admin/institute/login',
    requireAuth: false,
    redirectTo: '/admin/institute/dashboard',
  },
  '/': {
    path: '/',
    requireAuth: false,
    redirectTo: '/',
  },
  '/login': {
    path: '/login',
    requireAuth: false,
    redirectTo: '/',
  },
  '/signup': {
    path: '/signup',
    requireAuth: false,
    redirectTo: '/',
  },
  '/forgot-password': {
    path: '/forgot-password',
    requireAuth: false,
    redirectTo: '/',
  },
  '/reset-password': {
    path: '/reset-password',
    requireAuth: false,
    redirectTo: '/',
  },
  '/admin/clubs': {
    path: '/admin/clubs',
    requireAuth: true,
    redirectTo: '/',
  },
  '/admin/clubs/templates': {
    path: '/admin/clubs/templates',
    requireAuth: true,
    redirectTo: '/',
  },
  '/clubs': {
    path: '/clubs',
    requireAuth: true,
    redirectTo: '/',
  },
  '/clubs/[slug]': {
    path: '/clubs/[slug]',
    requireAuth: true,
    redirectTo: '/',
  },
  '/feed': {
    path: '/feed',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/',
  },
  '/feed/announcements': {
    path: '/feed/announcements',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/',
  },
  '/feed/lost-found': {
    path: '/feed/lost-found',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/',
  },
  '/feed/events': {
    path: '/feed/events',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/',
  },
  '/feed/campus': {
    path: '/feed/campus',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/',
  },
  // member routes
  '/member/entities': {
    path: '/member/entities',
    requireAuth: true,
    allowedRoles: ['member'],
    redirectTo: '/',
  },
  '/member/entities/[entityId]': {
    path: '/member/entities/[entityId]',
    requireAuth: true,
    allowedRoles: ['member'],
    redirectTo: '/',
  },
  '/member/entities/[entityId]/edit': {
    path: '/member/entities/[entityId]/edit',
    requireAuth: true,
    allowedRoles: ['member'],
    redirectTo: '/',
  },
  '/member/entities/[entityId]/members': {
    path: '/member/entities/[entityId]/members',
    requireAuth: true,
    allowedRoles: ['member'],
    redirectTo: '/',
  },
  '/member/entities/[entityId]/events': {
    path: '/member/entities/[entityId]/events',
    requireAuth: true,
    allowedRoles: ['member'],
    redirectTo: '/',
  },
  '/member/entities/[entityId]/settings': {
    path: '/member/entities/[entityId]/settings',
    requireAuth: true,
    allowedRoles: ['member'],
    redirectTo: '/',
  },
};

export const getRouteConfig = (pathname: string): RouteConfig | undefined => {
  // Find exact match first
  if (routeConfig[pathname]) {
    return routeConfig[pathname];
  }

  // Try to match routes with dynamic segments
  const pathParts = pathname.split('/').filter(Boolean);
  const routes = Object.entries(routeConfig);

  for (const [pattern, config] of routes) {
    const patternParts = pattern.split('/').filter(Boolean);
    
    if (pathParts.length !== patternParts.length) {
      continue;
    }

    let matches = true;
    for (let i = 0; i < patternParts.length; i++) {
      // If pattern part is a dynamic segment (wrapped in []), it matches any value
      if (patternParts[i].startsWith('[') && patternParts[i].endsWith(']')) {
        continue;
      }
      if (patternParts[i] !== pathParts[i]) {
        matches = false;
        break;
      }
    }

    if (matches) {
      return config;
    }
  }

  // If no match found, return the root route config
  return routeConfig['/'];
};
