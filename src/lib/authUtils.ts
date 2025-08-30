import TokenService from './tokenService';

export interface TokenPayload {
  userId: string;
  type: string;
  iat: number;
  exp: number;
}

export interface UserPermissions {
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
  canAdmin: boolean;
}

/**
 * Extract user ID from JWT token
 */
export const getUserIdFromToken = (): string | null => {
  const tokenService = TokenService.getInstance();
  return tokenService.getUserId();
};

/**
 * Check if current user has a specific role
 */
export const hasRole = (_requiredRole: string): boolean => {
  // This would typically check against user roles from the backend
  // For now, we'll implement a basic check
  const tokenService = TokenService.getInstance();
  const token = tokenService.getAccessToken();

  if (!token) {
    return false;
  }

  try {
    const payload = tokenService.decodeToken(token);
    // You could add role information to your JWT payload
    // For now, return true if user is authenticated
    return payload.type === 'access';
  } catch {
    return false;
  }
};

/**
 * Check if user has permission to access a resource
 */
export const hasPermission = (_resource: string, _action: string): boolean => {
  // This would typically check against user permissions from the backend
  // For now, return true if user is authenticated
  const tokenService = TokenService.getInstance();
  return tokenService.isAuthenticated();
};

/**
 * Get user permissions for a specific resource
 */
export const getUserPermissions = (_resource: string): UserPermissions => {
  const isAuthenticated = TokenService.getInstance().isAuthenticated();

  if (!isAuthenticated) {
    return {
      canRead: false,
      canWrite: false,
      canDelete: false,
      canAdmin: false,
    };
  }

  // This would typically fetch permissions from the backend
  // For now, return basic permissions for authenticated users
  return {
    canRead: true,
    canWrite: true,
    canDelete: false,
    canAdmin: false,
  };
};

/**
 * Check if token is about to expire (within 5 minutes)
 */
export const isTokenExpiringSoon = (): boolean => {
  const tokenService = TokenService.getInstance();
  return tokenService.isTokenExpiringSoon();
};

/**
 * Get token expiration time
 */
export const getTokenExpirationTime = (): Date | null => {
  const tokenService = TokenService.getInstance();
  const tokens = tokenService.getTokens();

  if (!tokens) {
    return null;
  }

  return new Date(tokens.expiresAt);
};

/**
 * Format time until token expires
 */
export const getTimeUntilExpiration = (): string => {
  const expirationTime = getTokenExpirationTime();

  if (!expirationTime) {
    return 'Unknown';
  }

  const now = new Date();
  const diff = expirationTime.getTime() - now.getTime();

  if (diff <= 0) {
    return 'Expired';
  }

  const minutes = Math.floor(diff / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }

  return `${seconds}s`;
};

/**
 * Validate token format and structure
 */
export const validateTokenFormat = (token: string): boolean => {
  if (!token || typeof token !== 'string') {
    return false;
  }

  // Check if token has 3 parts (header.payload.signature)
  const parts = token.split('.');
  if (parts.length !== 3) {
    return false;
  }

  // Check if all parts are base64 encoded
  try {
    parts.forEach(part => {
      if (part) {
        atob(part.replace(/-/g, '+').replace(/_/g, '/'));
      }
    });
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if user session is active
 */
export const isSessionActive = (): boolean => {
  const tokenService = TokenService.getInstance();

  if (!tokenService.isAuthenticated()) {
    return false;
  }

  // Check if token is expired
  if (tokenService.isTokenExpired()) {
    return false;
  }

  // Check if token will expire soon (within 1 minute)
  const tokens = tokenService.getTokens();
  if (!tokens) {
    return false;
  }

  const oneMinute = 60 * 1000;
  return Date.now() < tokens.expiresAt - oneMinute;
};

/**
 * Get authentication status summary
 */
export const getAuthStatus = () => {
  const tokenService = TokenService.getInstance();
  const isAuthenticated = tokenService.isAuthenticated();
  const isExpiringSoon = isTokenExpiringSoon();
  const timeUntilExpiration = getTimeUntilExpiration();
  const sessionActive = isSessionActive();

  return {
    isAuthenticated,
    isExpiringSoon,
    timeUntilExpiration,
    sessionActive,
    userId: getUserIdFromToken(),
  };
};
