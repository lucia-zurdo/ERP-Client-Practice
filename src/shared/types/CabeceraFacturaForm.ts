export type CabeceraFacturaForm = {
  nFactura: string
  fechaFactura: string
  idTercero: string
  formaPago: string
  estado: number
  dtoFactura: number
  dtoProntoPago: number
  recFinan: number
  retencionIRPF: number
  fechaVencimiento: string | null
  observaciones: string
}