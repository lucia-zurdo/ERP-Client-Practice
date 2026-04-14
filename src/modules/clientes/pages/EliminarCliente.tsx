/**
 * Página para eliminar un cliente por su ID.
 * Llama a useDeleteFlow para gestionar la eliminación
 */

import { useDeleteFlow, FormFeedback, DeleteConfirm, 
         DeleteButton, labelClass, useBusqueda, inputClass } from '../../../shared'
import { deleteCliente, getClienteByCif, 
          getClienteByRazonSocial }                          from '../'
import type { Cliente }                                      from '../'

export default function EliminarCliente() {
   const { valores, setValor, resultado: cliente, error: errorBusqueda, handleBuscar } =
    useBusqueda<Cliente>([
      { label: 'Razón Social', buscarFn: getClienteByRazonSocial },
      { label: 'CIF',          buscarFn: getClienteByCif },
    ])

  const { confirmacion, mensaje, error, eliminando,
          handleEliminar, activarConfirmacion, cancelarConfirmacion } =
    useDeleteFlow(deleteCliente, 'Cliente')


  return (
    <div className="grid grid-cols-150px_1fr] gap-x-4 gap-y-3 w-96 items-center mx-auto">
      <h2 className="col-span-2 text-center text-gray-200 text-2xl font-bold mb-6">Eliminar Cliente</h2>
      <FormFeedback mensaje={mensaje} error={error ?? errorBusqueda} />
      <label className={labelClass}>CIF</label>
      <input
        className={inputClass}
        value={valores[0]}
        onChange={e => setValor(0, e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') handleBuscar(0) }}
      />
      <DeleteButton
        onClick={() => handleBuscar(0)}
        disabled={!valores[0].trim()}
        className="col-span-2"
      />
      <label className={labelClass}>Razón Social</label>
      <input
        className={inputClass}
        value={valores[1]}
        onChange={e => setValor(1, e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') handleBuscar(1) }}
      />
      <DeleteButton
        onClick={() => handleBuscar(1)}
        disabled={!valores[1].trim()}
        className="col-span-2"
      />
        {cliente && !confirmacion && (
          <DeleteButton
            onClick={activarConfirmacion}
            disabled={false}
          />
        )}
        {cliente && confirmacion && (
          <DeleteConfirm
            id={cliente.idCliente}
            entityLabel="el cliente"
            onConfirm={() => handleEliminar(cliente.idCliente ?? '')}
            onCancel={cancelarConfirmacion}
            loading={eliminando}
          />
        )}
    </div>
  )
}