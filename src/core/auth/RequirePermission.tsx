import React from 'react';
import type { Permission } from './';
import { usePermissions } from './';

interface RequirePermissionProps {
  permission: Permission | Permission[];
  // Si true, requiere TODOS los permisos. Por defecto: solo uno (any)
  requireAll?: boolean;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

// Renderiza children sólo si el usuario tiene el/los permiso/s indicados
export function RequirePermission({
  permission,
  requireAll = false,
  fallback = null,
  children,
}: RequirePermissionProps) {
  const { hasPermission, hasAnyPermission } = usePermissions();

  const perms = Array.isArray(permission) ? permission : [permission];
  const allowed = requireAll ? hasPermission(...perms) : hasAnyPermission(...perms);

  return <>{allowed ? children : fallback}</>;
}