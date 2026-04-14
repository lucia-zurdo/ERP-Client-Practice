import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, usePermissions } from './';
import type { Permission } from './';

interface PrivateRouteProps {
  children: React.ReactNode;
  // Permiso requerido para acceder a la ruta
  permission?: Permission;
  // Ruta de fallback si no tiene permiso (default: '/unauthorized')
  fallbackPath?: string;
}

// Protege rutas por autenticación y/o permiso
export function PrivateRoute({
  children,
  permission,
  fallbackPath = '/unauthorized',
}: PrivateRouteProps) {
  const { isAuthenticated, isLoading, login } = useAuth();
  const { hasPermission, isLoaded } = usePermissions();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      login();
    }
  }, [isLoading, isAuthenticated, login]);

  // Esperando a Auth0
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Autenticado pero permisos aún no cargados
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  // Sin permiso requerido → unauthorized
  if (permission && !hasPermission(permission)) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}