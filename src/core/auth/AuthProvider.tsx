import { Auth0Provider } from '@auth0/auth0-react';
import { PermissionsProvider } from './PermissionsContext';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: 'openid profile email',
      }}
      onRedirectCallback={(appState) => {
        window.history.replaceState({}, document.title, appState?.returnTo ?? '/');
      }}
      cacheLocation="memory"
      useRefreshTokens={true}
    >
      <PermissionsProvider>
        {children}
      </PermissionsProvider>
    </Auth0Provider>
  );
}