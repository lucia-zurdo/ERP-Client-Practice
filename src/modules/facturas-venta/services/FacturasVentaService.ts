import { apiClient }                                            from '../../../shared'
import type { FacturaVentaCabecera }                            from '../'
import type { CabeceraFacturaForm, LineaFacturaConverted }      from '../../../shared'

function toApiBody(
  cabecera: CabeceraFacturaForm,
  lineas: LineaFacturaConverted[],
  idFactura?: number
) {
  return {
    ...(idFactura !== undefined && { idFactura }),
    ...cabecera,
    idCliente: cabecera.idTercero,
    idTercero: undefined,
    fechaVencimiento: cabecera.fechaVencimiento || null,
    lineas,
  }
}

export function getAllFacturasVenta(): Promise<FacturaVentaCabecera[]> {
  return apiClient.get('/facturasventa')
}

export function getFacturaVentaByNFactura(nFactura: string): Promise<FacturaVentaCabecera> {
  return apiClient.get(`/facturasventa/buscar/nfactura/${encodeURIComponent(nFactura)}`)
}

export function createFacturaVenta(
  cabecera: CabeceraFacturaForm,
  lineas: LineaFacturaConverted[]
): Promise<void> {
  return apiClient.post('/facturasventa', toApiBody(cabecera, lineas))
}

export function updateFacturaVenta(
  idFactura: number,
  cabecera: CabeceraFacturaForm,
  lineas: LineaFacturaConverted[]
): Promise<void> {
  return apiClient.put(`/facturasventa/${idFactura}`, toApiBody(cabecera, lineas, idFactura))
}

export function deleteFacturaVenta(id: number): Promise<void> {
  return apiClient.delete('/facturasventa', id)
}