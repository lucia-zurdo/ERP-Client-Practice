import { useFacturasForm, validateFactura } from '../../../shared'
import { createFacturaVenta }              from '../'

export function useFacturaVentaForm() {
  return useFacturasForm({
    tipo: 'venta',
    onSubmit: (cabecera, lineas) => createFacturaVenta(cabecera, lineas),
    validate: (cabecera, lineas) => validateFactura(cabecera, lineas, 'cliente'),
  })
}