import type { UserRole } from './tokenService';

export interface RouteConfig {
  path: string;
  requireAuth: boolean;
  requireVerifiedEmail?: boolean;
  redirectTo?: string;
  requireBranch?: boolean;
  allowedRoles?: UserRole[];
}

export const routeConfig: Record<string, RouteConfig> = {
  // Institute routes
  '/institutes': {
    path: '/institutes',
    requireAuth: true,
    requireVerifiedEmail: true,
    redirectTo: '/login',
  },
  '/institute/[slug]': {
    path: '/institute/[slug]',
    requireAuth: true,
    requireVerifiedEmail: true,
    redirectTo: '/login',
  },

  // Institute admin routes
  '/admin/institute/dashboard': {
    path: '/admin/institute/dashboard',
    requireAuth: true,
    allowedRoles: ['admin'],
    requireBranch: true,
    requireVerifiedEmail: true,
    redirectTo: '/admin/institute/login',
  },
  '/admin/institute/students': {
    path: '/admin/institute/students',
    requireAuth: true,
    allowedRoles: ['admin'],
    requireBranch: true,
    requireVerifiedEmail: true,
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
    requireVerifiedEmail: true,
    redirectTo: '/login',
  },
  '/admin/institute/settings': {
    path: '/admin/institute/settings',
    requireAuth: true,
    allowedRoles: ['admin'],
    requireBranch: true,
    requireVerifiedEmail: true,
    redirectTo: '/admin/institute/login',
  },
  '/admin/institute/students/invite': {
    path: '/admin/institute/students/invite',
    requireAuth: true,
    allowedRoles: ['admin'],
    requireBranch: true,
    requireVerifiedEmail: true,
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
    requireVerifiedEmail: true,
    redirectTo: '/super-admin/dashboard',
  },
  '/super-admin/dashboard': {
    path: '/super-admin/dashboard',
    requireAuth: true,
    allowedRoles: ['super_admin'],
    requireVerifiedEmail: true,
    redirectTo: '/super-admin/login',
  },
  '/super-admin/institutes': {
    path: '/super-admin/institutes',
    requireAuth: true,
    allowedRoles: ['super_admin'],
    requireVerifiedEmail: true,
    redirectTo: '/super-admin/login',
  },
  '/super-admin/admins': {
    path: '/super-admin/admins',
    requireAuth: true,
    allowedRoles: ['super_admin'],
    requireVerifiedEmail: true,
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
  '/verify-email': {
    path: '/verify-email',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/',
    requireVerifiedEmail: false,
  },
  '/admin/clubs': {
    path: '/admin/clubs',
    requireAuth: true,
    requireVerifiedEmail: true,
    redirectTo: '/',
  },
  '/admin/clubs/templates': {
    path: '/admin/clubs/templates',
    requireAuth: true,
    requireVerifiedEmail: true,
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
    requireVerifiedEmail: true,
    redirectTo: '/login',
  },
  '/feed': {
    path: '/feed',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  '/feed/announcements': {
    path: '/feed/announcements',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  '/feed/lost-found': {
    path: '/feed/lost-found',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  '/feed/events': {
    path: '/feed/events',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  '/feed/campus': {
    path: '/feed/campus',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  // member routes
  '/member/entities': {
    path: '/member/entities',
    requireAuth: true,
    allowedRoles: ['member'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  '/member/entities/join': {
    path: '/member/entities/join',
    requireAuth: true,
    allowedRoles: ['member'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  '/member/entities/[entityId]': {
    path: '/member/entities/[entityId]',
    requireAuth: true,
    allowedRoles: ['member'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  '/member/entities/[entityId]/edit': {
    path: '/member/entities/[entityId]/edit',
    requireAuth: true,
    allowedRoles: ['member'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  '/member/entities/[entityId]/members': {
    path: '/member/entities/[entityId]/members',
    requireAuth: true,
    allowedRoles: ['member'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  '/member/entities/[entityId]/events': {
    path: '/member/entities/[entityId]/events',
    requireAuth: true,
    allowedRoles: ['member'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  '/member/entities/[entityId]/settings': {
    path: '/member/entities/[entityId]/settings',
    requireAuth: true,
    allowedRoles: ['member'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  '/member/invites': {
    path: '/member/invites',
    requireAuth: true,
    allowedRoles: ['member'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  // Alumni routes
  '/member/alumni': {
    path: '/alumni',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  '/member/alumni/directory': {
    path: '/alumni/directory',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  // Jobs routes
  '/member/jobs': {
    path: '/jobs',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  '/member/jobs/post': {
    path: '/jobs/post',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  // Achievements routes
  '/member/achievements': {
    path: '/achievements',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  // Messages routes
  '/member/messages': {
    path: '/messages',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  '/member/messages/chat/[id]': {
    path: '/messages/chat/[id]',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  // Notifications routes
  '/member/notifications': {
    path: '/notifications',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },

  // Profile routes
  '/member/profile': {
    path: '/profile',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  '/member/profile/edit': {
    path: '/profile/edit',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  // Settings routes
  '/member/settings': {
    path: '/settings',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  '/member/settings/account': {
    path: '/settings/account',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  '/member/settings/privacy': {
    path: '/settings/privacy',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
  },
  '/member/feedback': {
    path: '/feedback',
    requireAuth: true,
    allowedRoles: ['member', 'admin'],
    redirectTo: '/login',
    requireVerifiedEmail: true,
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
