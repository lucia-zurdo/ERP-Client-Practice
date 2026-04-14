interface DeleteConfirmProps {
  id?: string | number
  entityLabel: string       // "cliente", "proveedor", "artículo"
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
}
 
export function DeleteConfirm({ id, entityLabel, onConfirm, onCancel, loading }: DeleteConfirmProps) {
  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <p className="text-gray-300 text-sm">
        ¿Estás seguro de que quieres eliminar {entityLabel}{' '}
        <span className="text-green-400 font-bold">{id}</span>?
      </p>
      <div className="flex gap-4">
        <button
          className="py-2 px-6 bg-gray-900 text-red-400 border border-red-400 rounded font-bold hover:bg-red-400 hover:text-gray-900 transition-colors cursor-pointer disabled:opacity-50"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? 'Eliminando...' : 'Sí, eliminar'}
        </button>
        <button
          className="py-2 px-6 bg-gray-700 text-gray-300 border border-gray-500 rounded font-bold hover:bg-gray-500 transition-colors cursor-pointer"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}