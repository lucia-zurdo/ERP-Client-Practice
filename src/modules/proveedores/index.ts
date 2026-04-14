 // ── Components ────────────────────────────────────────────────────────────────
export { ProveedorForm }   from './components/ProveedorForm'
export { ProveedorDetail } from './components/ProveedorDetail'

 // ── Constants ────────────────────────────────────────────────────────────────
export { OPCIONES_FORMA_PAGO } from '../../shared/constants/selectOptions'

// ── Hook ────────────────────────────────────────────────────────────────
export { useProveedorForm } from './hooks/useProveedorForm'

// ── Pages ────────────────────────────────────────────────────────────────
export { default as VerProveedores }    from './pages/VerProveedores';
export { default as CrearProveedor }    from './pages/CrearProveedor';
export { default as ModificarProveedor} from './pages/ModificarProveedor';
export { default as EliminarProveedor } from './pages/EliminarProveedor';
export { default as BuscarProveedor }   from './pages/BuscarProveedor';

 // ── Services ────────────────────────────────────────────────────────────────
export { getProveedorByCif, getProveedorByRazonSocial, 
         getAllProveedores, createProveedor, 
         updateProveedor, deleteProveedor } from './services/ProveedoresService'

 // ── Types ────────────────────────────────────────────────────────────────
export type { Proveedor } from './types/Proveedor'