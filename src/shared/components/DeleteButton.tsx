/**
 * Botón de eliminación reutilizable que aparece en el paso 1
 * del flujo de confirmación en dos pasos.
 * Se deshabilita cuando no hay ID introducido para evitar
 * mostrar la confirmación con un valor vacío.
 */

interface DeleteButtonProps {
  onClick: () => void
  disabled?: boolean
  className?: string
}

export function DeleteButton({ onClick, disabled = false, className = '' }: DeleteButtonProps) {
  return (
    <button
      className={`col-span-2 mt-2 py-2 bg-gray-900 text-red-400 border border-red-400 rounded font-bold hover:bg-red-400 hover:text-gray-900 transition-colors cursor-pointer ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      Eliminar
    </button>
  )
}