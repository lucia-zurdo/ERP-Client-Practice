import type { LineaFacturaForm } from './LineaFacturaForm'

export type LineaFacturaConverted = Omit<LineaFacturaForm, 'precio'> & { precio: number }