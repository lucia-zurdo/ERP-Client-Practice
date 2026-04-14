import { useAuth } from '../core/auth/useAuth';

export function Unauthorized() {
  const { logout } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold text-red-600">Acceso no autorizado</h1>
      <p className="text-gray-600">No tienes permisos para acceder a esta sección.</p>
      <button
        onClick={logout}
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        Cerrar sesión
      </button>
    </div>
  );
}