import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RequirePermission } from '../../core/auth/RequirePermission';
import { Permissions } from '../../core/auth/permissions';
import { useAuth } from '../../core/auth/useAuth';

const sections = [
  {
    label: 'Clientes',
    readPermission: Permissions.CLIENTES_READ,
    writePermission: Permissions.CLIENTES_WRITE,
    deletePermission: Permissions.CLIENTES_DELETE,
    base: '/clientes',
  },
  {
    label: 'Proveedores',
    readPermission: Permissions.PROVEEDORES_READ,
    writePermission: Permissions.PROVEEDORES_WRITE,
    deletePermission: Permissions.PROVEEDORES_DELETE,
    base: '/proveedores',
  },
  {
    label: 'Artículos',
    readPermission: Permissions.ARTICULOS_READ,
    writePermission: Permissions.ARTICULOS_WRITE,
    deletePermission: Permissions.ARTICULOS_DELETE,
    base: '/articulos',
  },
  {
    label: 'Facturas de Venta',
    readPermission: Permissions.FACTURAS_VENTA_READ,
    writePermission: Permissions.FACTURAS_VENTA_WRITE,
    deletePermission: Permissions.FACTURAS_VENTA_DELETE,
    base: '/facturas-venta',
  },
  {
    label: 'Facturas de Compra',
    readPermission: Permissions.FACTURAS_COMPRA_READ,
    writePermission: Permissions.FACTURAS_COMPRA_WRITE,
    deletePermission: Permissions.FACTURAS_COMPRA_DELETE,
    base: '/facturas-compra',
  },
];

export function Menu() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (label: string) => {
  setOpenSections(prev => ({
    ...Object.fromEntries(Object.keys(prev).map(k => [k, false])),
    [label]: !prev[label],
  }))
}

  return (
    <nav className="flex flex-col w-56 min-w-[12rem] min-h-screen bg-black text-white shrink-0 border border-gray-800">
      {/* Título */}
      <div
        className="p-6 cursor-pointer text-green-400 hover:bg-gray-950 font-bold text-lg border border-gray-800"
        onClick={() => navigate('/')}
      >
        Inicio
      </div>

      {/* Secciones */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {sections.map((section) => (
          <RequirePermission
            key={section.label}
            permission={section.readPermission}
          >
            <div>
              <button
                onClick={() => toggleSection(section.label)}
                className="w-full flex justify-between items-center px-4 py-3 text-left text-white hover:text-green-400 hover:bg-gray-900 transition-colors border-b border-gray-800"
              >
                <span>{section.label}</span>
                <span className="text-xs">
                  {openSections[section.label] ? '▲' : '▼'}
                </span>
              </button>

              {openSections[section.label] && (
                <div className="flex flex-col bg-gray-950">
                  {/* Ver — siempre visible con read */}
                  <button
                    onClick={() => navigate(section.base)}
                    className="px-6 py-2 text-left text-sm text-gray-300 hover:text-green-400 hover:bg-gray-900 transition-colors"
                  >
                    Ver todos
                  </button>

                  {/* Buscar — siempre visible con read */}
                  <button
                    onClick={() => navigate(`${section.base}/buscar`)}
                    className="px-6 py-2 text-left text-sm text-gray-300 hover:text-green-400 hover:bg-gray-900 transition-colors"
                  >
                    Buscar
                  </button>

                  {/* Crear — requiere write */}
                  <RequirePermission permission={section.writePermission}>
                    <button
                      onClick={() => navigate(`${section.base}/crear`)}
                      className="px-6 py-2 text-left text-sm text-gray-300 hover:text-green-400 hover:bg-gray-900 transition-colors"
                    >
                      Crear
                    </button>
                  </RequirePermission>

                  {/* Modificar — requiere write */}
                  <RequirePermission permission={section.writePermission}>
                    <button
                      onClick={() => navigate(`${section.base}/modificar`)}
                      className="px-6 py-2 text-left text-sm text-gray-300 hover:text-green-400 hover:bg-gray-900 transition-colors"
                    >
                      Modificar
                    </button>
                  </RequirePermission>

                  {/* Eliminar — requiere delete */}
                  <RequirePermission permission={section.deletePermission}>
                    <button
                      onClick={() => navigate(`${section.base}/eliminar`)}
                      className="px-6 py-2 text-left text-sm text-gray-300 hover:text-green-400 hover:bg-gray-900 transition-colors"
                    >
                      Eliminar
                    </button>
                  </RequirePermission>
                </div>
              )}
            </div>
          </RequirePermission>
        ))}
      </div>

      {/* Cerrar sesión */}
      <button
        onClick={logout}
        className="p-4 text-left text-sm text-gray-400 hover:text-green-400 hover:bg-gray-950 transition-colors border-t border-gray-800"
      >
        Cerrar sesión
      </button>
    </nav>
  );
}