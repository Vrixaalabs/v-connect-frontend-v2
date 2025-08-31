export interface RouteConfig {
  path: string;
  requireAuth: boolean;
  redirectTo?: string;
  requireBranch?: boolean;
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
    redirectTo: '/login',
  },
  '/admin/institute/students': {
    path: '/admin/institute/students',
    requireAuth: true,
    redirectTo: '/login',
  },
  '/admin/institute/roles': {
    path: '/admin/institute/roles',
    requireAuth: true,
    redirectTo: '/login',
  },
  '/admin/institute/requests': {
    path: '/admin/institute/requests',
    requireAuth: true,
    redirectTo: '/login',
  },
  '/admin/institute/settings': {
    path: '/admin/institute/settings',
    requireAuth: true,
    redirectTo: '/login',
  },

  // Super admin routes
  '/super-admin/login': {
    path: '/super-admin/login',
    requireAuth: true,
    redirectTo: '/login',
  },
  '/super-admin/dashboard': {
    path: '/super-admin/dashboard',
    requireAuth: true,
    redirectTo: '/login',
  },
  '/super-admin/institutes': {
    path: '/super-admin/institutes',
    requireAuth: true,
    redirectTo: '/login',
  },
  '/super-admin/admins': {
    path: '/super-admin/admins',
    requireAuth: true,
    redirectTo: '/login',
  },
  '/super-admin/settings': {
    path: '/super-admin/settings',
    requireAuth: true,
    redirectTo: '/login',
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
    redirectTo: '/',
  },
  '/feed/announcements': {
    path: '/feed/announcements',
    requireAuth: true,
    redirectTo: '/',
  },
  '/feed/lost-found': {
    path: '/feed/lost-found',
    requireAuth: true,
    redirectTo: '/',
  },
  '/feed/events': {
    path: '/feed/events',
    requireAuth: true,
    redirectTo: '/',
  },
  '/feed/campus': {
    path: '/feed/campus',
    requireAuth: true,
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
