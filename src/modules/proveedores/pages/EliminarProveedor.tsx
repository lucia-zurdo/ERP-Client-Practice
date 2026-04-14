/**
 * Página para eliminar un proveedor por su ID.
 * Llama a useDeleteFlow para gestionar la eliminación
 */

import { useDeleteFlow, FormFeedback, DeleteConfirm, 
         DeleteButton, SearchInput, useBusqueda } from '../../../shared'
import { deleteProveedor, getProveedorByCif, 
         getProveedorByRazonSocial }              from '../'
import type { Proveedor }                         from '../'

export default function EliminarProveedor() {
  const { valores, setValor, resultado: proveedor, error: errorBusqueda,
            buscando, handleBuscar } =
      useBusqueda<Proveedor>([
        { label: 'Razón Social', buscarFn: getProveedorByRazonSocial },
        { label: 'CIF',          buscarFn: getProveedorByCif },
      ])
  
    const { confirmacion, mensaje, error, eliminando,
            handleEliminar, activarConfirmacion, cancelarConfirmacion } =
      useDeleteFlow(deleteProveedor, 'Proveedor')

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <h2 className="text-gray-200 text-2xl font-bold mb-6">Eliminar Proveedor</h2>
      <FormFeedback mensaje={mensaje} error={error ?? errorBusqueda} />
        <SearchInput
          label="Razón Social"
          value={valores[0]}
          onChange={v => setValor(0, v)}
          onSearch={() => handleBuscar(0)}
          loading={buscando}
        />
        <SearchInput
          label="CIF"
          value={valores[1]}
          onChange={v => setValor(1, v)}
          onSearch={() => handleBuscar(1)}
          loading={buscando}
        />
        {proveedor && !confirmacion && (
          <DeleteButton
            onClick={activarConfirmacion}
            disabled={false}
          />
        )}
        {proveedor && confirmacion && (
          <DeleteConfirm
            id={proveedor.idProveedor}
            entityLabel="el proveedor"
            onConfirm={() => handleEliminar(proveedor.idProveedor ?? '')}
            onCancel={cancelarConfirmacion}
            loading={eliminando}
          />
        )}
    </div>
  )
}