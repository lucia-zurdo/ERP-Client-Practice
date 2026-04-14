import { apiClient }                                            from '../../../core/http/apiClient'
import type { FacturaCompraCabecera }                           from '../'
import type { CabeceraFacturaForm, LineaFacturaConverted }      from '../../../shared'

function toApiBody(
  cabecera: CabeceraFacturaForm,
  lineas: LineaFacturaConverted[],
  idFactura?: number
) {
  return {
    ...(idFactura !== undefined && { idFactura }),
    ...cabecera,
    idProveedor: cabecera.idTercero,
    idTercero:   undefined,
    fechaVencimiento: cabecera.fechaVencimiento || null,
    lineas,
  }
}

export function getAllFacturasCompra(): Promise<FacturaCompraCabecera[]> {
  return apiClient.get('/facturascompra')
}

export function getFacturaCompraByNFactura(nFactura: string): Promise<FacturaCompraCabecera> {
  return apiClient.get(`/facturascompra/buscar/nfactura/${encodeURIComponent(nFactura)}`)
}

export function createFacturaCompra(
  cabecera: CabeceraFacturaForm,
  lineas: LineaFacturaConverted[]
): Promise<void> {
  return apiClient.post('/facturascompra', toApiBody(cabecera, lineas))
}

export function updateFacturaCompra(
  idFactura: number,
  cabecera: CabeceraFacturaForm,
  lineas: LineaFacturaConverted[]
): Promise<void> {
  return apiClient.put(`/facturascompra/${idFactura}`, toApiBody(cabecera, lineas, idFactura))
}

export function deleteFacturaCompra(id: number): Promise<void> {
  return apiClient.delete('/facturascompra', id)
}