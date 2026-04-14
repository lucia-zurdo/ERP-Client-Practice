export interface LineaFacturaForm {
  idLineaFactura?: number
  idArticulo: string
  descArticulo: string
  idUdMedida: string
  cantidad: number
  precio: string
  dto: number
  dtoProntoPago: number
  tipoIva: string
  lote: string
}

export const lineaVacia: LineaFacturaForm = {
  idLineaFactura: 0,
  idArticulo: '',
  descArticulo: '',
  idUdMedida: '',
  cantidad: 0,
  precio: '',
  dto: 0,
  dtoProntoPago: 0,
  tipoIva: '',
  lote: '',
}