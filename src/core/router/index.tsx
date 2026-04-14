import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { PrivateRoute } from '../auth/PrivateRoute';
import { Permissions } from '../auth/permissions';
import { Layout } from '../../shared/components/Layout';
import { usePermissions } from '../auth/PermissionsContext';
import type { Permission } from '../auth/permissions';

// Inicio
import { Home } from '../../pages/Home';
// Artículos
import { VerArticulos, CrearArticulo, ModificarArticulo, EliminarArticulo, BuscarArticulo } from '../../modules/articulos';
// Clientes
import { VerClientes, CrearCliente, ModificarCliente, EliminarCliente, BuscarCliente } from '../../modules/clientes';
// Proveedores
import { VerProveedores, CrearProveedor, ModificarProveedor, EliminarProveedor, BuscarProveedor } from '../../modules/proveedores';
// Facturas venta
import { VerFacturasVenta, CrearFacturaVenta, ModificarFacturaVenta, EliminarFacturaVenta, BuscarFacturaVenta } from '../../modules/facturas-venta';
// Facturas compra
import { VerFacturasCompra, CrearFacturaCompra, ModificarFacturaCompra, EliminarFacturaCompra, BuscarFacturaCompra } from '../../modules/facturas-compra';

import { Unauthorized } from '../../pages/Unauthorized';

// Wrapper que combina autenticación + layout + outlet
function ProtectedLayout() {
  return (
    <PrivateRoute>
      <Layout>
        <Outlet />
      </Layout>
    </PrivateRoute>
  );
}

// Guard de permiso para rutas hijas
function PermissionRoute({ permission }: { permission: Permission }) {
  const { hasPermission } = usePermissions();
  return hasPermission(permission)
    ? <Outlet />
    : <Navigate to="/unauthorized" replace />;
}

export function AppRouter() {
  return (
    <Routes>
      {/* Ruta pública — sin layout ni autenticación */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Todas las rutas protegidas comparten ProtectedLayout */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Home />} />

        {/* Artículos */}
        <Route element={<PermissionRoute permission={Permissions.ARTICULOS_READ} />}>
          <Route path="/articulos" element={<VerArticulos />} />
          <Route path="/articulos/buscar" element={<BuscarArticulo />} />
        </Route>
        <Route element={<PermissionRoute permission={Permissions.ARTICULOS_WRITE} />}>
          <Route path="/articulos/crear" element={<CrearArticulo />} />
          <Route path="/articulos/modificar" element={<ModificarArticulo />} />
        </Route>
        <Route element={<PermissionRoute permission={Permissions.ARTICULOS_DELETE} />}>
          <Route path="/articulos/eliminar" element={<EliminarArticulo />} />
        </Route>

        {/* Clientes */}
        <Route element={<PermissionRoute permission={Permissions.CLIENTES_READ} />}>
          <Route path="/clientes" element={<VerClientes />} />
          <Route path="/clientes/buscar" element={<BuscarCliente />} />
        </Route>
        <Route element={<PermissionRoute permission={Permissions.CLIENTES_WRITE} />}>
          <Route path="/clientes/crear" element={<CrearCliente />} />
          <Route path="/clientes/modificar" element={<ModificarCliente />} />
        </Route>
        <Route element={<PermissionRoute permission={Permissions.CLIENTES_DELETE} />}>
          <Route path="/clientes/eliminar" element={<EliminarCliente />} />
        </Route>

        {/* Proveedores */}
        <Route element={<PermissionRoute permission={Permissions.PROVEEDORES_READ} />}>
          <Route path="/proveedores" element={<VerProveedores />} />
          <Route path="/proveedores/buscar" element={<BuscarProveedor />} />
        </Route>
        <Route element={<PermissionRoute permission={Permissions.PROVEEDORES_WRITE} />}>
          <Route path="/proveedores/crear" element={<CrearProveedor />} />
          <Route path="/proveedores/modificar" element={<ModificarProveedor />} />
        </Route>
        <Route element={<PermissionRoute permission={Permissions.PROVEEDORES_DELETE} />}>
          <Route path="/proveedores/eliminar" element={<EliminarProveedor />} />
        </Route>

        {/* Facturas venta */}
        <Route element={<PermissionRoute permission={Permissions.FACTURAS_VENTA_READ} />}>
          <Route path="/facturas-venta" element={<VerFacturasVenta />} />
          <Route path="/facturas-venta/buscar" element={<BuscarFacturaVenta />} />
        </Route>
        <Route element={<PermissionRoute permission={Permissions.FACTURAS_VENTA_WRITE} />}>
          <Route path="/facturas-venta/crear" element={<CrearFacturaVenta />} />
          <Route path="/facturas-venta/modificar" element={<ModificarFacturaVenta />} />
        </Route>
        <Route element={<PermissionRoute permission={Permissions.FACTURAS_VENTA_DELETE} />}>
          <Route path="/facturas-venta/eliminar" element={<EliminarFacturaVenta />} />
        </Route>

        {/* Facturas compra */}
        <Route element={<PermissionRoute permission={Permissions.FACTURAS_COMPRA_READ} />}>
          <Route path="/facturas-compra" element={<VerFacturasCompra />} />
          <Route path="/facturas-compra/buscar" element={<BuscarFacturaCompra />} />
        </Route>
        <Route element={<PermissionRoute permission={Permissions.FACTURAS_COMPRA_WRITE} />}>
          <Route path="/facturas-compra/crear" element={<CrearFacturaCompra />} />
          <Route path="/facturas-compra/modificar" element={<ModificarFacturaCompra />} />
        </Route>
        <Route element={<PermissionRoute permission={Permissions.FACTURAS_COMPRA_DELETE} />}>
          <Route path="/facturas-compra/eliminar" element={<EliminarFacturaCompra />} />
        </Route>
      </Route>
    </Routes>
  );
}