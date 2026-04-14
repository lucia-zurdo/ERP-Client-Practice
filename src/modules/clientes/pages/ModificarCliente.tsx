/**
 * Página para buscar un cliente por ID y modificar sus datos.
 */

import { useClienteForm, ClienteForm,
         getClienteByCif,
         getClienteByRazonSocial, updateCliente } from '../'
import { useBusqueda, FormFeedback,
         SearchInput }                            from '../../../shared'
import type { Cliente }                           from '../'

export default function ModificarCliente() {
  const {
    form, setForm,
    mensaje, error,
    cargando,
    handleChange, handleSelectChange,
    ejecutar,
  } = useClienteForm()

  const {
    valores, setValor,
    resultado: encontrado,
    error: errorBusqueda,
    buscando,
    handleBuscar,
  } = useBusqueda<Cliente>([ 
      { label: 'CIF', buscarFn: getClienteByCif },
      { label: 'Razón Social', buscarFn: getClienteByRazonSocial }
    ], 
    {
    onSuccess: setForm,
    }
  )

  const handleSubmit = () =>
    ejecutar(
      async () => { await updateCliente(form) },
      'Cliente modificado correctamente'
    )

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <h2 className="text-gray-200 text-2xl font-bold mb-6">Modificar Cliente</h2>

      <FormFeedback mensaje={mensaje} error={error} />

      <SearchInput
        label="CIF"
        value={valores[0]}
        onChange={v => setValor(0, v)}
        onSearch={() => handleBuscar(0)}
        loading={buscando}
        error={errorBusqueda}
      />
      <SearchInput
        label="Razón Social"
        value={valores[1]}
        onChange={v => setValor(1, v)}
        onSearch={() => handleBuscar(1)}
        loading={buscando}
      />

      {encontrado && (
        <ClienteForm
          form={form}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
          onSubmit={handleSubmit}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          cargando={cargando}
          submitLabel="Modificar Cliente"
        />
      )}
    </div>
  )
}