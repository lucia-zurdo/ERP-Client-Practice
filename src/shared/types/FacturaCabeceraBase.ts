/**
 * Tipo base compartido entre FacturaCompraCabecera y FacturaVentaCabecera.
 * Contiene todos los campos comunes. Cada módulo extiende este tipo
 * añadiendo su campo específico de tercero.
 */

export interface FacturaCabeceraBase<TLinea = unknown> {
  idFactura: number
  nFactura: string
  fechaFactura: string
  cifTercero: string
  razonSocial: string
  formaPago: string
  estado: number
  impLineas: number
  dtoFactura: number
  impDtoFactura: number
  dtoProntoPago: number
  impDpp: number
  recFinan: number
  impRE: number
  baseImponible: number
  impIva: number
  retencionIRPF: number
  impRetencion: number
  impTotal: number
  fechaVencimiento: string | null
  observaciones: string
  lineas: TLinea[]
}