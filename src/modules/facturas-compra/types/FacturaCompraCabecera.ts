import type { FacturaCabeceraBase } from '../../../shared'
import type { FacturaCompraLinea } from './FacturaCompraLinea'

export interface FacturaCompraCabecera extends FacturaCabeceraBase<FacturaCompraLinea> {
  idFactura: number
  nFactura: string
  fechaFactura: string
  idProveedor: string
  cifProveedor: string
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
  lineas: FacturaCompraLinea[]
}