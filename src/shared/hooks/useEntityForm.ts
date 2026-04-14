import { useState } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface UseEntityFormOptions<T extends object> {
  initialData: T
  validate: (form: T) => string | null
  numericFields?: Set<keyof T>
  numericOnlyFields?: Set<keyof T>
  signedFields?: Set<keyof T>
}

// ─── Hook ───────────────────────────────────────────────────────────────────

/**
 * Hook genérico para formularios CRUD de cualquier entidad
 * 
 * Gestiona:
 *  - Estado del formulario
 *  - handleChange con conversión numérica opcional
 *  - Ciclo completo de submit: validación → acción async → feedback
 *  - Estados de mensaje, error y carga
 */
export function useEntityForm<T extends object>({
  initialData,
  validate,
  numericFields = new Set(),
  numericOnlyFields = new Set(),
  signedFields = new Set(),
}: UseEntityFormOptions<T>) {
  const [form, setForm] = useState<T>(initialData)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const key = name as keyof T

    let sanitized = value

    if(signedFields.has(key)) {
      sanitized = value.replace(/[^\d+\-]/g, '')
    } else if (numericOnlyFields.has(key)) {
      sanitized = value.replace(/\D/g, '')
    }

    setForm(prev => ({
      ...prev,
      [key]: numericFields.has(key)
        ? parseFloat(sanitized) || 0
        : sanitized.trim(),
    }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const { name, value } = e.target
  setForm(prev => ({
    ...prev,
    [name]: value,
  }))
  }

  const reset = () => setForm(initialData)

  /**
   * Para ejecutar una acción asincrónica tras validar el formulario
   * Gestiona automáticamente estado de carga y mensajes de feedback
   * 
   * @param accion → función asincrónica a ejecutar (llamada al servicio)
   * @param mensajeExito → texto a mostrar si la acción tiene éxito
   */

  const ejecutar = async (accion: () => Promise<unknown>, mensajeExito: string) => {
    setMensaje('')
    setError('')

    const errorValidacion = validate(form)
    if (errorValidacion) { setError(errorValidacion); return }

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

  return { form, setForm, mensaje, error, cargando, handleChange, reset, ejecutar, handleSelectChange }
}