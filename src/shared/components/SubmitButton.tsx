/**
 * Botón de acción principal reutilizado en todos los formularios
 * de creación y modificación (artículos, clientes, proveedores, facturas).
 *
 * Muestra `loadingLabel` mientras `loading` es true para dar
 * feedback visual y evitar envíos duplicados.
 */

interface SubmitButtonProps {
  onClick: () => void
  loading?: boolean
  label: string
  loadingLabel?: string
  className?: string
}

export function SubmitButton({
  onClick,
  loading = false,
  label,
  loadingLabel = 'Guardando...',
  className = 'w-4/5 max-w-3xl',
}: SubmitButtonProps) {
  return (
    <button
      className={`${className} py-2 bg-gray-900 text-green-400 border border-green-400 rounded font-bold hover:bg-green-400 hover:text-gray-900 transition-colors cursor-pointer disabled:opacity-50`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? loadingLabel : label}
    </button>
  )
}