import type { CabeceraFacturaForm } from '../'
import type { LineaFacturaForm }    from '../'

const MAX_DATE = new Date('2100-01-01')

export function validateFactura(
  cabecera: CabeceraFacturaForm,
  lineas: LineaFacturaForm[],
  labelTercero: string = 'tercero'
): string | null {
  const hoy = new Date()

  if (!cabecera.nFactura.trim())      return 'El número de factura es obligatorio'
  if (!cabecera.fechaFactura)         return 'La fecha es obligatoria'
  if (!cabecera.idTercero.trim())     return `El ID del ${labelTercero} es obligatorio`
  if (!cabecera.formaPago.trim())     return 'La forma de pago es obligatoria'
  if (!cabecera.estado)               return 'El estado es obligatorio'
  if (!cabecera.fechaFactura)         return 'La fecha es obligatoria'
  if (new Date(cabecera.fechaFactura) > hoy) return 'La fecha de factura no es válida'
  if (cabecera.fechaVencimiento && new Date(cabecera.fechaVencimiento) > MAX_DATE) return 'La fecha de vencimiento no es válida'

  const porcentajes: Array<[number, string]> = [
    [cabecera.dtoFactura,    'Dto. Factura'],
    [cabecera.dtoProntoPago, 'Dto. Pronto Pago'],
    [cabecera.recFinan,      'Rec. Financiero'],
    [cabecera.retencionIRPF, 'Retención IRPF'],
  ]
  for (const [val, label] of porcentajes) {
    if (val > 100) return `${label} no puede ser mayor que 100`
  }

  if (lineas.length === 0)                                        return 'La factura debe tener al menos una línea'
  if (lineas.some(l => !l.idArticulo.trim()))                     return 'Todas las líneas deben tener un artículo'
  if (lineas.some(l => l.cantidad <= 0))                          return 'La cantidad debe ser mayor que 0'
  if (lineas.some(l => !l.precio || parseFloat(l.precio) <= 0))   return 'El precio debe ser mayor que 0'
  if (lineas.some(l => l.dto > 100))                              return 'El descuento de línea no puede ser mayor que 100'

  return null
}