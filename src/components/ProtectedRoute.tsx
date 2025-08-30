import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import TokenService from '../lib/tokenService';
import BranchService from '../lib/branchService';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireBranch?: boolean;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireBranch = false,
  redirectTo = '/login',
}) => {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [isBranchValid, setIsBranchValid] = useState<boolean>(true);
  const tokenService = TokenService.getInstance();
  const branchService = BranchService.getInstance();

  useEffect(() => {
    // Check token validity on mount and when location changes
    const checkTokenValidity = () => {
      const valid = tokenService.isAuthenticated();
      setIsTokenValid(valid);
    };

    // Check branch validity
    const checkBranchValidity = () => {
      if (requireBranch && slug) {
        const storedBranchId = branchService.getCurrentBranchId();
        setIsBranchValid(storedBranchId === slug);
      }
    };

    checkTokenValidity();
    checkBranchValidity();

    // Listen for auth failure events
    const handleAuthFailure = () => {
      setIsTokenValid(false);
    };

    window.addEventListener('auth:failed', handleAuthFailure);

    return () => {
      window.removeEventListener('auth:failed', handleAuthFailure);
    };
  }, [location.pathname, tokenService, branchService, requireBranch, slug]);

  // Show loading state while checking authentication
  // Only show loading if we're actually checking auth, not if we're just waiting for Redux
  if (isTokenValid === null || (isLoading && !isTokenValid)) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  // For routes that require authentication
  if (requireAuth) {
    // If token is valid, check branch requirements
    if (isTokenValid) {
      if (requireBranch && !isBranchValid) {
        // If branch validation fails, redirect to the correct branch
        const storedBranchId = branchService.getCurrentBranchId();
        if (storedBranchId) {
          const newPath = location.pathname.replace(`/${slug}/`, `/${storedBranchId}/`);
          return <Navigate to={newPath} replace />;
        }
        // If no stored branch, redirect to login
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
      }
      return <>{children}</>;
    }

    // Only redirect if both token is invalid and user is not authenticated
    if (!isAuthenticated && !isTokenValid) {
      // Store the current location as intended destination for redirect after login
      if (location.pathname !== '/login' && location.pathname !== '/') {
        sessionStorage.setItem('intendedDestination', location.pathname);
      }
      // Redirect to login with return URL
      return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }
  }

  // For routes that should redirect if already authenticated (like login page)
  if (!requireAuth && isAuthenticated && isTokenValid) {
    const storedBranchId = branchService.getCurrentBranchId();
    return <Navigate to={`/${storedBranchId}/dashboard`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
