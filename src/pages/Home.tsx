// Página de inicio

import { useAuth } from '../core/auth/useAuth';

export function Home() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center p-20 h-screen">
      <h1 className="text-2xl font-bold">Bienvenido, {user?.name}</h1>
    </div>
  );
}