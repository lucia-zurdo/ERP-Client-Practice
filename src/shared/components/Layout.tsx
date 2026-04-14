import { Menu } from './Menu';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-900">
      {/* Menú fijo — nunca se encoge */}
      <Menu />

      {/* Contenido — ocupa el espacio restante con scroll propio */}
      <main className="flex-1 overflow-auto p-6 text-white">
        {children}
      </main>
    </div>
  );
}