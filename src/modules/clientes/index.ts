 // ── Components ────────────────────────────────────────────────────────────────
export { ClienteForm }   from './components/ClienteForm'
export { ClienteDetail } from './components/ClienteDetail'

 // ── Hook ────────────────────────────────────────────────────────────────
export { useClienteForm } from './hooks/useClienteForm'

 // ── Pages ────────────────────────────────────────────────────────────────
export { default as VerClientes }      from './pages/VerClientes';
export { default as CrearCliente }     from './pages/CrearCliente';
export { default as ModificarCliente } from './pages/ModificarCliente';
export { default as EliminarCliente }  from './pages/EliminarCliente';
export { default as BuscarCliente }    from './pages/BuscarCliente';

 // ── Services ────────────────────────────────────────────────────────────────
export { getClienteByCif, getClienteByRazonSocial, getAllClientes,
         createCliente, updateCliente,
         deleteCliente }               from './services/ClientesService'

 // ── Types ────────────────────────────────────────────────────────────────
export type { Cliente } from './types/Cliente'