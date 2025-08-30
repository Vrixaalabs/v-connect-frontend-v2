import React from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteConfig } from '../lib/routeConfig';
import { ProtectedRoute } from './ProtectedRoute';

interface RouteWrapperProps {
  children: React.ReactNode;
}

export const RouteWrapper: React.FC<RouteWrapperProps> = ({ children }) => {
  const location = useLocation();
  const routeConfig = getRouteConfig(location.pathname);

  if (!routeConfig) {
    return <>{children}</>;
  }

  return (
    <ProtectedRoute requireAuth={routeConfig.requireAuth} redirectTo={routeConfig.redirectTo}>
      {children}
    </ProtectedRoute>
  );
};

export default RouteWrapper;
