import { SubmitButton } from './SubmitButton'

interface SearchInputProps {
  label?: string
  value: string
  id?: string
  onChange: (value: string) => void
  onSearch: () => void
  loading?: boolean
  error?: string
}

export function SearchInput({
  label, value, onChange, onSearch, loading, error
}: SearchInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch()
  }

  return (
    <div className="grid grid-cols-[150px_1fr] gap-x-4 gap-y-3 w-96 items-center mb-6">
      <label className="!text-gray-300 font-semibold text-sm text-right">{label}</label>
      <input
        className="w-full !bg-gray-300 !text-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:!border-green-400"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {error && (
        <p className="col-span-2 text-center text-red-400 font-bold">{error}</p>
      )}
      <SubmitButton
        onClick={onSearch}
        loading={loading}
        label="Buscar"
        loadingLabel="Buscando..."
        className="col-span-2 mt-2"
      />
    </div>
  )
}