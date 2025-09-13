import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import TokenService from '../lib/tokenService';
import BranchService from '../lib/branchService';
import { getRouteConfig } from '@/lib/routeConfig';

// Initialize services once outside component
const tokenService = TokenService.getInstance();
const branchService = BranchService.getInstance();

import type { UserRole } from '@/lib/tokenService';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireBranch?: boolean;
  requireVerifiedEmail?: boolean;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireBranch = false,
  requireVerifiedEmail = false,
  allowedRoles = [],
  redirectTo = '/login',
}) => {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);
  const [authState, setAuthState] = useState<{
    isTokenValid: boolean | null;
    userRole: UserRole | null;
    isVerified: boolean | null;
  }>({
    isTokenValid: null,
    userRole: null,
    isVerified: null,
  });

  // Derive branch validity from props and params
  const isBranchValid = useMemo(() => {
    if (!requireBranch || !slug) {return true;}
    const storedBranchId = branchService.getCurrentBranchId();
    return storedBranchId === slug;
  }, [requireBranch, slug]);

  const checkTokenValidity = useCallback(() => {
    const token = tokenService.getAccessToken();

    if (token) {
      try {
        const decoded = tokenService.decodeToken(token);
        console.log('decoded', decoded);
        const valid = tokenService.isAuthenticated();
        setAuthState({
          isTokenValid: valid,
          userRole: decoded.role,
          isVerified: decoded.isVerified,
        });
      } catch (error) {
        setAuthState({
          isTokenValid: false,
          userRole: null,
          isVerified: null,
        });
      }
    } else {
      setAuthState({
        isTokenValid: false,
        userRole: null,
        isVerified: null,
      });
    }
  }, []);

  const handleAuthFailure = useCallback(() => {
    setAuthState(prev => ({
      ...prev,
      isTokenValid: false,
      userRole: null,
      isVerified: null,
    }));
  }, []);

  useEffect(() => {
    checkTokenValidity();
  }, [checkTokenValidity, location.pathname]);

  useEffect(() => {
    window.addEventListener('auth:failed', handleAuthFailure);
    return () => {
      window.removeEventListener('auth:failed', handleAuthFailure);
    };
  }, [handleAuthFailure]);

  // Memoize loading state check
  const isLoadingState = useMemo(() => {
    return authState.isTokenValid === null || (isLoading && !authState.isTokenValid);
  }, [authState.isTokenValid, isLoading]);

  // Memoize role-based redirect path
  const getRoleBasedRedirect = useCallback((role: UserRole | null) => {
    switch (role) {
      case 'super_admin':
        return '/super-admin/dashboard';
      case 'admin':
        return '/admin/institute/dashboard';
      case 'member':
        return '/feed';
      default:
        return '/login';
    }
  }, []);

  // Get route config based on current path
  const routeConfig = useMemo(() => getRouteConfig(location.pathname), [location.pathname]);

  // Memoize the rendered component
  const renderedComponent = useMemo(() => {
    if (isLoadingState) {
      return (
        <div className='flex items-center justify-center min-h-screen'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
        </div>
      );
    }

    // Use route config values if available, otherwise fall back to props
    const currentRequireAuth = routeConfig?.requireAuth ?? requireAuth;
    const currentRequireVerifiedEmail = routeConfig?.requireVerifiedEmail ?? requireVerifiedEmail;
    const currentAllowedRoles = routeConfig?.allowedRoles ?? allowedRoles;
    const currentRedirectTo = routeConfig?.redirectTo ?? redirectTo;
    const currentRequireBranch = routeConfig?.requireBranch ?? requireBranch;

    if (currentRequireAuth) {
      if (authState.isTokenValid) {
        if (currentAllowedRoles?.length > 0 && authState.userRole && !currentAllowedRoles.includes(authState.userRole)) {
          return <Navigate to={getRoleBasedRedirect(authState.userRole)} state={{ from: location }} replace />;
        }

        if (currentRequireBranch && !isBranchValid) {
          const storedBranchId = branchService.getCurrentBranchId();
          if (storedBranchId) {
            const newPath = location.pathname.replace(`/${slug}/`, `/${storedBranchId}/`);
            return <Navigate to={newPath} replace />;
          }
          return <Navigate to={currentRedirectTo} state={{ from: location }} replace />;
        }

        if (currentRequireVerifiedEmail && authState.isVerified !== true) {
          return <Navigate to='/verify-email' state={{ from: location }} replace />;
        }

        // Special handling for verify-email page
        if (location.pathname === '/verify-email' && authState.isVerified) {
          const intendedDestination = sessionStorage.getItem('intendedDestination');
          if (intendedDestination) {
            sessionStorage.removeItem('intendedDestination');
            return <Navigate to={intendedDestination} replace />;
          }
          return <Navigate to={getRoleBasedRedirect(authState.userRole)} replace />;
        }

        return <>{children}</>;
      }

      if (!isAuthenticated && !authState.isTokenValid) {
        if (location.pathname !== '/login' && location.pathname !== '/') {
          sessionStorage.setItem('intendedDestination', location.pathname);
        }
        return <Navigate to={currentRedirectTo} state={{ from: location }} replace />;
      }
    }

    if (isAuthenticated && authState.isTokenValid) {
      if (authState.userRole === 'super_admin' && location.pathname === '/super-admin/login') {
        return <Navigate to='/super-admin/dashboard' replace />;
      } else if (!currentRequireAuth && location.pathname !== '/') {
        return <Navigate to='/' replace />;
      }
    }

    return <>{children}</>;
  }, [
    isLoadingState,
    requireAuth,
    authState.isTokenValid,
    authState.userRole,
    authState.isVerified,
    allowedRoles,
    requireBranch,
    isBranchValid,
    isAuthenticated,
    location,
    redirectTo,
    children,
    getRoleBasedRedirect,
    slug,
    routeConfig,
    requireVerifiedEmail,
  ]);

  return renderedComponent;
};

export default ProtectedRoute;
