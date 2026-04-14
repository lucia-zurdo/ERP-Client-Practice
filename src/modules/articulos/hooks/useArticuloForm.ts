/**
 * Hook especializado para la gestión del formulario de artículos.
 * Actúa como capa de configuración sobre el hook genérico 'useEntityForm',
 * encapsulando el estado inicial, la validación y los campos numéricos
 * de la entidad 'Artículo'.
 * 
 * El componente que lo consuma no necesita conocer los detalles de
 * inicialización ni validación, sólo debe llamar al hook.
 */

import { useEntityForm } from '../../../shared'
import type { Articulo } from '../types/Articulo'

/**
 * Estado inicial del formulario de 'Artículo'
 * 
 * Se define fuera del hook para evitar recreación con cada render.
 * Al ser objeto constante sin dependencias reactivas,
 * es seguro compartirlo como referencia estática.
 * 
 * Los campos de texto se inicializan como string vacío y los 
 * numéricos como 0, para evitar valores undefined en los
 * inputs controlados.
 */

const ARTICULO_INICIAL: Articulo = {
    descArticulo: '',
    estado: '',
    familia: '',
    cCVenta: '',
    cCCompra: '',
    tipoIva: '',
    udVenta: '',
    udCompra: '',
    pesoNeto: 0,
    pesoBruto: 0,
    plazo: 0,
    volumen: 0
}

/**
 * Valida los datos de un artículo antes de ser enviados
 * 
 * @param articulo - Objeto con los datos actuales del formulario
 * @returns - Mensaje de error como string si la validación falla (o null si los campos son válidos)
 * 
 * Orden: primero los campos obligatorios, luego los opcionales con formato concreto y por último
 * los numéricos que requieren un valor positivo.
 */
function validateArticulo(articulo: Articulo): string | null {

  //.trim() para rechazar strings que sólo contengan espacios en blanco
  if (!articulo.descArticulo.trim()) return 'La descripción es obligatoria'
  if (!articulo.estado.trim())       return 'El estado es obligatorio'
  if (!articulo.familia.trim())      return 'La familia es obligatoria'

  //Las cuentas corrientes son opcionales pero si se escriben, deben ser numéricas
  //Se usa isNaN para detectar también decimales y notación científica incorrecta
  if (articulo.cCVenta && isNaN(Number(articulo.cCVenta))) return 'La cuenta corriente de venta debe ser numérica'
  if (articulo.cCCompra && isNaN(Number(articulo.cCCompra))) return 'La cuenta corriente de compra debe ser numérica'

  //Campos numéricos obligatorios, deben existir y ser estrictamente positivos.
  if (!articulo.pesoNeto || articulo.pesoNeto <= 0) return 'El peso neto debe ser mayor que 0'
  if (!articulo.pesoBruto || articulo.pesoBruto <= 0) return 'El peso bruto debe ser mayor que 0'
  if (!articulo.plazo || articulo.plazo <= 0) return 'El plazo debe ser mayor que 0'
  if (!articulo.volumen || articulo.volumen <= 0) return 'El volumen debe ser mayor que 0'

  return null
}

/**
 * Hook para gestionar el formularios de creación/edición de artículos
 * 
 * Abstrae la configuración de 'useEntityForm' para la entidad 'Artículo',
 * exponiendo directamente los handlers, el estado y los errores
 * que el componente de formulario necesita.
 * 
 * @param initialData - datos opcionales para pre-rellenar el formulario.
 *  - Si se pasa (modo edición), se usan como estado inicial
 *  - Si no se pasa (modo creación), se usa 'ARTICULO_INICIAL'. 
 * @returns - todo lo que devuelve 'useEntityForm' tipado para 'Artículo'.
 */

export function useArticuloForm(initialData?: Articulo) {
  return useEntityForm({
    initialData: initialData ?? ARTICULO_INICIAL,
    validate: validateArticulo,

    //Indica a 'useEntityForm' qué campos deben convertirse en string a número al actualizar estado.
    numericFields: new Set<keyof Articulo>(['pesoNeto', 'pesoBruto', 'plazo', 'volumen']),
    signedFields: new Set<keyof Articulo>(['cCVenta', 'cCCompra'])
  })
}