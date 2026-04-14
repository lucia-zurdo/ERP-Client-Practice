/**
 * Hook genérico para el patrón "buscar entidad".
 * Gestiona los estados de los campos, resultado, error y carga,
 * que son idénticos en todas las páginas de búsqueda.
 */

import { useState } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────
interface UseBusquedaOptions<T> {
  // Callback opcional ejecutado cuando la búsqueda tiene éxito.
  onSuccess?: (data: T) => void
}

export interface CampoBusqueda<T> {
  label: string
  buscarFn: (valor: string) => Promise<T>
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useBusqueda<T>(
  campos: CampoBusqueda<T>[],
  options: UseBusquedaOptions<T> = {}
) {
  const [valores, setValores]     = useState<string[]>(campos.map(() => ''))
  const [resultado, setResultado] = useState<T | null>(null)
  const [error, setError]         = useState('')
  const [buscando, setBuscando]   = useState(false)

  const setValor = (index: number, valor: string) =>
    setValores(prev => prev.map((v, i) => i === index ? valor : v))

  const handleBuscar = async (index: number) => {
    const valor = valores[index]
    if (!valor.trim()) {
      setError(`Introduce un valor para buscar por ${campos[index].label}`)
      return
    }
    setError('')
    setResultado(null)
    setBuscando(true)
    try {
      const data = await campos[index].buscarFn(valor)
      setResultado(data)
      options.onSuccess?.(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al buscar')
    } finally {
      setBuscando(false)
    }
  }

  const reset = () => {
    setValores(campos.map(() => ''))
    setResultado(null)
    setError('')
  }

  return { valores, setValor, resultado, error, buscando, handleBuscar, reset }
}