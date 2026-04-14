// ── Hook ────────────────────────────────────────────────────────────────
export { useFacturaCompraForm }       from './hooks/useFacturaCompraForm'

// ── Pages ────────────────────────────────────────────────────────────────
export { default as VerFacturasCompra }      from './pages/VerFacturasCompra';
export { default as CrearFacturaCompra }     from './pages/CrearFacturaCompra';
export { default as ModificarFacturaCompra } from './pages/ModificarFacturaCompra';
export { default as EliminarFacturaCompra }  from './pages/EliminarFacturaCompra';
export { default as BuscarFacturaCompra }    from './pages/BuscarFacturaCompra';

// ── Service ────────────────────────────────────────────────────────────────
export { getFacturaCompraByNFactura,
         getAllFacturasCompra,
         createFacturaCompra,
         updateFacturaCompra,
         deleteFacturaCompra }        from './services/FacturasCompraService'

// ── Types ────────────────────────────────────────────────────────────────
export type { FacturaCompraCabecera } from './types/FacturaCompraCabecera'
export type { FacturaCompraLinea }    from './types/FacturaCompraLinea'