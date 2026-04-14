/**
 * Página para eliminar un artículo por su ID.
 * Llama a useDeleteFlow para gestionar la eliminación
 */

import { useDeleteFlow, useBusqueda, FormFeedback,
         DeleteConfirm, DeleteButton, SearchInput }  from '../../../shared'
import { deleteArticulo, getArticuloByDesc }         from '../'
import type { Articulo }                             from '../types/Articulo'

export default function EliminarArticulo() {
  const { valores, setValor, resultado: articulo, error: errorBusqueda,
          buscando, handleBuscar } =
    useBusqueda<Articulo>([
      { label: 'Descripción', buscarFn: getArticuloByDesc },
    ])

  const { confirmacion, mensaje, error, eliminando,
          handleEliminar, activarConfirmacion, cancelarConfirmacion } =
    useDeleteFlow(deleteArticulo, 'Artículo')

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <h2 className="text-gray-200 text-2xl font-bold mb-6">Eliminar Artículo</h2>
      <FormFeedback mensaje={mensaje} error={error ?? errorBusqueda} />

        <SearchInput
          label= "Descripción"
          value={valores[0]}
          onChange={v => setValor(0, v)}
          onSearch={() => handleBuscar(0)}
          loading={buscando}
        />

        {articulo && !confirmacion && (
          <DeleteButton
            onClick={activarConfirmacion}
            disabled={false}
          />
        )}
        {articulo && confirmacion && (
          <DeleteConfirm
            id={articulo.idArticulo}
            entityLabel="el artículo"
            onConfirm={() => handleEliminar(articulo.idArticulo ?? '')}
            onCancel={cancelarConfirmacion}
            loading={eliminando}
          />
        )}

    </div>
  )
}