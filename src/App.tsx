import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { setTokenGetter, setUnauthorizedHandler } from './core/http/apiClient';
import { AppRouter } from './core/router';

export default function App() {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    setTokenGetter(() =>
      getAccessTokenSilently({
        authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE },
      })
    );
    setUnauthorizedHandler(() => navigate('/unauthorized'));  // ← nuevo
  }, [getAccessTokenSilently, navigate]);

  return <AppRouter />;
}
