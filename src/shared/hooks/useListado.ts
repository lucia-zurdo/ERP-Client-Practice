/**
 * Hook genérico para cargar un listado de entidades al montar el componente.
 * Evita duplicar el useEffect + estados de carga/error en cada página de listado.
 *
 * @param fetchFn - Función async que devuelve el array de entidades.
 */

import { useEffect, useState } from 'react'

export function useListado<T>(fetchFn: () => Promise<T[]>) {
  const [datos, setDatos]       = useState<T[]>([])
  const [error, setError]       = useState('')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetchFn()
      .then(data => { setDatos(data); setCargando(false) })
      .catch(() => { setError('Error al conectar con la API'); setCargando(false) })
  }, [])

  return { datos, error, cargando }
}