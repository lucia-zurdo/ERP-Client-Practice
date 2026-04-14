import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import type { Permission } from './';
import { parseTokenPermissions } from '../../shared/utils/token';

interface PermissionsContextValue {
  permissions: string[];
  isLoaded: boolean;
  hasPermission: (...required: Permission[]) => boolean;
  hasAnyPermission: (...required: Permission[]) => boolean;
  resetPermissions: () => void;
}

const PermissionsContext = createContext<PermissionsContextValue>({
  permissions: [],
  isLoaded: false,
  hasPermission: () => false,
  hasAnyPermission: () => false,
  resetPermissions: () => {},
});

export function PermissionsProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoading || !isAuthenticated) return;

    const load = async () => {
      try {
        const token = await getAccessTokenSilently();
        setPermissions(parseTokenPermissions(token));
      } catch {
        setPermissions([]);
      } finally {
        setIsLoaded(true);
      }
    };

    load();
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  const hasPermission = (...required: Permission[]) =>
    isAuthenticated && isLoaded && required.every(p => permissions.includes(p));

  const hasAnyPermission = (...required: Permission[]) =>
    isAuthenticated && isLoaded && required.some(p => permissions.includes(p));

  const resetPermissions = () => {
    setPermissions([]);
    setIsLoaded(false);
  };

  return (
    <PermissionsContext.Provider value={{
      permissions,
      isLoaded,
      hasPermission,
      hasAnyPermission,
      resetPermissions,
    }}>
      {children}
    </PermissionsContext.Provider>
  );
}

export function usePermissions() {
  return useContext(PermissionsContext);
}