import type { FacturaCabeceraBase } from '../../../shared'
import type { FacturaVentaLinea }   from "./FacturaVentaLinea"

export interface FacturaVentaCabecera extends FacturaCabeceraBase<FacturaVentaLinea> {
  idFactura: number
  nFactura: string
  fechaFactura: string
  idCliente: string
  cifCliente: string
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
  lineas: FacturaVentaLinea[]
}