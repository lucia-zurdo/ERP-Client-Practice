/**
 * Hook genérico para el flujo de eliminación en dos pasos:
 *  1. Usuario introduce ID y pulsa "Eliminar" → activa confirmación
 *  2. Usuario confirma → se ejecuta la llamada al servicio
 *
 * Centraliza los 4 useState y la lógica de handleEliminar y handleIdChange
 *
 * @param deleteFn - Función async del servicio que recibe el ID y elimina la entidad.
 * @param entityLabel - Nombre de la entidad para el mensaje de éxito.
 */

import { useState } from 'react'

interface UseDeleteFlowOptions<TId = string> {
  convertId?: (id: string) => TId
}

export function useDeleteFlow<TId = string>(
  deleteFn: (id: TId) => Promise<void>,
  entityLabel: string,
  options: UseDeleteFlowOptions<TId> = {}
) {
  const convertId = options.convertId ?? ((id: string) => id as unknown as TId)

  const [confirmacion, setConfirmacion] = useState(false)
  const [mensaje, setMensaje]           = useState('')
  const [error, setError]               = useState('')
  const [eliminando, setEliminando]     = useState(false)

  const handleEliminar = async (id: string) => {
    setMensaje('')
    setError('')
    setEliminando(true)
    try {
      await deleteFn(convertId(id))
      setMensaje(`${entityLabel} '${id}' eliminado correctamente`)
      setConfirmacion(false)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : `Error al eliminar ${entityLabel.toLowerCase()}`)
    } finally {
      setEliminando(false)
    }
  }

  return {
    confirmacion,
    mensaje,
    error,
    eliminando,
    handleEliminar,
    activarConfirmacion:  () => setConfirmacion(true),
    cancelarConfirmacion: () => setConfirmacion(false),
  }
}