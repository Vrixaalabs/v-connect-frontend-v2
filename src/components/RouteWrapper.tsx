import React from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteConfig } from '../lib/routeConfig';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminSidebarWrapper } from './admin/AdminSidebarWrapper';

interface RouteWrapperProps {
  children: React.ReactNode;
}

export const RouteWrapper: React.FC<RouteWrapperProps> = ({ children }) => {
  const location = useLocation();
  const routeConfig = getRouteConfig(location.pathname);
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/super-admin');

  if (!routeConfig) {
    return <>{children}</>;
  }

  return (
    <ProtectedRoute
      requireAuth={routeConfig.requireAuth}
      allowedRoles={routeConfig.allowedRoles}
      requireBranch={routeConfig.requireBranch}
      redirectTo={routeConfig.redirectTo}
    >
      {isAdminRoute ? (
        <div className='flex h-screen'>
          <AdminSidebarWrapper />
          <main className='flex-1 overflow-y-auto'>{children}</main>
        </div>
      ) : (
        children
      )}
    </ProtectedRoute>
  );
};

export default RouteWrapper;
