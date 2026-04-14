import { useAuth0 } from '@auth0/auth0-react';
import { usePermissions } from './';

export interface AuthUser {
  sub: string;
  email?: string;
  name?: string;
  picture?: string;
}

export function useAuth() {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
  const { resetPermissions } = usePermissions();

  return {
    isAuthenticated,
    isLoading,
    user: user as AuthUser | undefined,
    login: () => loginWithRedirect(),
    logout: () => {
      resetPermissions();
      logout({ logoutParams: { returnTo: window.location.origin } });
    },
    getAccessTokenSilently,
  };
}