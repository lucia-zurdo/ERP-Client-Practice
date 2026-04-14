 // ── Components ────────────────────────────────────────────────────────────────
export { ArticuloForm }   from './components/ArticuloForm'
export { ArticuloDetail } from './components/ArticuloDetail'

 // ── Hook ────────────────────────────────────────────────────────────────
export { useArticuloForm } from './hooks/useArticuloForm'

// ── Pages ────────────────────────────────────────────────────────────────
export { default as VerArticulos }      from './pages/VerArticulos';
export { default as CrearArticulo }     from './pages/CrearArticulo';
export { default as ModificarArticulo } from './pages/ModificarArticulo';
export { default as EliminarArticulo }  from './pages/EliminarArticulo';
export { default as BuscarArticulo }    from './pages/BuscarArticulo';

 // ── Services ────────────────────────────────────────────────────────────────
export { getArticuloByDesc, getAllArticulos,
         createArticulo, updateArticulo,
         deleteArticulo }                from './services/ArticulosService'

 // ── Types ────────────────────────────────────────────────────────────────
export type { Articulo } from './types/Articulo'