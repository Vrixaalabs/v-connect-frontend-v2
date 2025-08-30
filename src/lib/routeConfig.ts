export interface RouteConfig {
  path: string;
  requireAuth: boolean;
  redirectTo?: string;
  requireBranch?: boolean;
}

export const routeConfig: Record<string, RouteConfig> = {
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
