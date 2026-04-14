export interface FacturaVentaLinea {
  idLineaFactura: number
  idFactura: number
  idArticulo: string
  descArticulo: string
  tipoIva: string
  idUdMedida: string
  cantidad: number
  precio: number
  dto: number
  dtoProntoPago: number
  importe: number
  lote: string
}