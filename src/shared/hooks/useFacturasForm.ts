import { useState }                  from 'react'
import { useAsyncAction }            from './useAsyncAction'
import type { CabeceraFacturaForm }  from '../types/CabeceraFacturaForm'
import type { LineaFacturaForm }     from '../types/LineaFacturaForm'
import { lineaVacia as LINEA_VACIA } from '../types/LineaFacturaForm'
import { getArticuloByDesc }         from '../../modules/articulos'
 
// ─── Types ───────────────────────────────────────────────────────────────────
 
export type TipoFactura = 'compra' | 'venta'

// Tipo para las líneas una vez convertidas, listas para enviar a la API
type LineaFacturaConverted = Omit<LineaFacturaForm, 'precio'> & { precio: number }

interface UseFacturasFormOptions {
  tipo: TipoFactura
  onSubmit: (cabecera: CabeceraFacturaForm, lineas: LineaFacturaConverted[]) => Promise<unknown>
  validate: (cabecera: CabeceraFacturaForm, lineas: LineaFacturaForm[]) => string | null
}
 
// ─── Constants ───────────────────────────────────────────────────────────────
 
const CABECERA_INICIAL: CabeceraFacturaForm = {
  nFactura: '',
  fechaFactura: '',
  idTercero: '',
  formaPago: '',
  estado: 0,
  dtoFactura: 0,
  dtoProntoPago: 0,
  recFinan: 0,
  retencionIRPF: 0,
  fechaVencimiento: null,
  observaciones: '',
}
 
const CAMPOS_NUMERICOS_CABECERA = new Set<keyof CabeceraFacturaForm>([
  'estado', 'dtoFactura', 'dtoProntoPago', 'recFinan', 'retencionIRPF',
])
 
const CAMPOS_NUMERICOS_LINEA = new Set<keyof LineaFacturaForm>([
  'cantidad', 'dto', 'dtoProntoPago',
])
 
// ─── Hook ────────────────────────────────────────────────────────────────────
 
export function useFacturasForm({ tipo, onSubmit, validate }: UseFacturasFormOptions) {
  
  const { mensaje, error, cargando, ejecutar } = useAsyncAction()
 
  const [cabecera, setCabecera] = useState<CabeceraFacturaForm>(CABECERA_INICIAL)
  const [lineas, setLineas] = useState<LineaFacturaForm[]>([{ ...LINEA_VACIA }])
  const [erroresLineas, setErroresLineas] = useState<(string | null)[]>([null])
 
  // Metadatos que cambian según el tipo — usados en la UI
  const labelTercero = tipo === 'compra' ? 'ID Proveedor' : 'ID Cliente'
  const campoTercero = tipo === 'compra' ? 'idProveedor' : 'idCliente'

  // Validar artículo en la línea de facturas
  const validarArticulo = async (index: number, descArticulo: string) => {
  if (!descArticulo.trim()) {
    setErroresLineas(prev => prev.map((e, i) => i === index ? null : e))
    return
  }
  try {
    const articulo = await getArticuloByDesc(descArticulo)
    // Para autocompletar campos de la línea con datos del artículo
    setLineas(prev => prev.map((linea, i) =>
      i === index
        ? {
            ...linea,
            idArticulo:   articulo.idArticulo,
            tipoIva:      articulo.tipoIva,
            idUdMedida:   tipo === 'compra' ? articulo.udCompra : articulo.udVenta,
          }
        : linea
    ))
    // Limpiar error de esa línea
    setErroresLineas(prev => prev.map((e, i) => i === index ? null : e))
  } catch {
    // Artículo no encontrado — limpiar autocompletado y marcar error
    setLineas(prev => prev.map((linea, i) =>
      i === index
        ? { ...linea, descArticulo: '', tipoIva: '', idUdMedida: '' }
        : linea
    ))
    setErroresLineas(prev => prev.map((e, i) =>
      i === index ? `'${descArticulo}' no encontrado` : e
    ))
  }
}
 
  // ── Handlers cabecera ─────────────────────────────────────────────────────
 
  const handleCabeceraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCabecera(prev => ({
      ...prev,
      [name]: CAMPOS_NUMERICOS_CABECERA.has(name as keyof CabeceraFacturaForm)
        ? parseFloat(value) || 0
        : name === 'fechaVencimiento'
          ? value || null 
          : value.trim(),
    }))
  }

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCabecera(prev => ({ ...prev, [name]: value.trim() }))
  }
 
  const handleCabeceraSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setCabecera(prev => ({ ...prev, [name]: value }))
  }
  // ── Handlers líneas ───────────────────────────────────────────────────────
 
  const handleLineaChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLineas(prev =>
      prev.map((linea, i) =>
        i === index
          ? {
              ...linea,
              [name]: CAMPOS_NUMERICOS_LINEA.has(name as keyof LineaFacturaForm)
                ? parseFloat(value) || 0
                : value.trim(),
            }
          : linea,
      ),
    )
  }
 
  const handleLineaSelectChange = (index: number, e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setLineas(prev =>
      prev.map((linea, i) => (i === index ? { ...linea, [name]: value } : linea)),
    )
  }
 
  const añadirLinea = () => {
    setLineas(prev => [...prev, { ...LINEA_VACIA }])
    setErroresLineas(prev => [...prev, null])
  }
 
  const eliminarLinea = (index: number) => {
  setLineas(prev => prev.filter((_, i) => i !== index))
  setErroresLineas(prev => prev.filter((_, i) => i !== index))
}
 
  // ── Submit ────────────────────────────────────────────────────────────────
 
  const handleSubmit = () =>
    ejecutar(async () => {
      const errorValidacion = validate(cabecera, lineas)
      if (errorValidacion) throw new Error(errorValidacion)

      // Bloquea si alguna línea tiene error de artículo
      const hayErroresArticulos = erroresLineas.some(e => e !== null)
      if (hayErroresArticulos) throw new Error('Artículo/s no válido/s')

      //Bloquea si alguna línea tiene idArticulo vacío
      const hayArticulosVacios = lineas.some(l => !l.idArticulo.trim())
      if (hayArticulosVacios) throw new Error('Todas las líneas deben tener un artículo')
 
      const lineasConvertidas = lineas.map(l => ({
        ...l,
        precio: parseFloat(l.precio) || 0,
      }))
 
      await onSubmit(cabecera, lineasConvertidas)
    }, tipo === 'compra' ? 'Factura de compra creada correctamente' : 'Factura de venta creada correctamente')
 
  const reset = () => {
    setCabecera(CABECERA_INICIAL)
    setLineas([{ ...LINEA_VACIA }])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit()
  }
 
  // ── Return ────────────────────────────────────────────────────────────────
 
  return {
    cabecera,
    setCabecera,
    lineas,
    setLineas,
    mensaje,
    error,
    cargando,
    labelTercero,
    campoTercero,
    erroresLineas,
    setErroresLineas,
    validarArticulo,
    handleCabeceraChange,
    handleLineaChange,
    handleLineaSelectChange,
    añadirLinea,
    eliminarLinea,
    handleSubmit,
    handleKeyDown,
    handleTextAreaChange,
    handleCabeceraSelectChange,
    ejecutar,
    reset,
  }
}