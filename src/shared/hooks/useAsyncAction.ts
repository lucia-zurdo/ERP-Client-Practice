import { useState } from 'react'
 
// ─── Hook ────────────────────────────────────────────────────────────────────
 
/**
 * Gestiona el ciclo completo de una acción asíncrona:
 * estado de carga, mensaje de éxito y mensaje de error.
 *
 * Usado internamente por useEntityForm y useFacturasForm.
 */
export function useAsyncAction() {
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
 
  const ejecutar = async (accion: () => Promise<unknown>, mensajeExito: string) => {
    setMensaje('')
    setError('')
 
    if (cargando) return
    setCargando(true)
 
    try {
      await accion()
      setMensaje(mensajeExito)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setCargando(false)
    }
  }
 
  return { mensaje, error, cargando, ejecutar }
}