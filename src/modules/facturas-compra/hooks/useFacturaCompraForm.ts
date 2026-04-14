import { useFacturasForm, validateFactura } from '../../../shared'
import { createFacturaCompra }              from '../'

export function useFacturaCompraForm() {
  const form = useFacturasForm({
    tipo: 'compra',
    onSubmit: (cabecera, lineas) => createFacturaCompra(cabecera, lineas),
    validate: (cabecera, lineas) => validateFactura(cabecera, lineas, 'proveedor'),
  })
  return form
}