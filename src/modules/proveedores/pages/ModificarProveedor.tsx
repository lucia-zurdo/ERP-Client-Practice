/**
 * Página para buscar un proveedor por ID y modificar sus datos.
 */

import { useProveedorForm, ProveedorForm,
         getProveedorByCif, getProveedorByRazonSocial, 
         updateProveedor }                    from '../'
import { useBusqueda, FormFeedback,
         SearchInput }                        from '../../../shared'
import type { Proveedor } from '../'

export default function ModificarProveedor() {
  const {
    form, setForm,
    mensaje, error,
    cargando,
    handleChange, handleSelectChange,
    ejecutar,
  } = useProveedorForm()

  const {
    valores, setValor,
    resultado: encontrado,
    error: errorBusqueda,
    buscando,
    handleBuscar,
  } = useBusqueda<Proveedor>([ 
      { label: 'CIF', buscarFn: getProveedorByCif },
      { label: 'Razón Social', buscarFn: getProveedorByRazonSocial }
    ], 
    {
    onSuccess: setForm,
    }
  )

  const handleSubmit = () =>
    ejecutar(
      async () => { await updateProveedor(form) },
      'Proveedor modificado correctamente'
    )

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <h2 className="text-gray-200 text-2xl font-bold mb-6">Modificar Proveedor</h2>

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
        <ProveedorForm
          form={form}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
          onSubmit={handleSubmit}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          cargando={cargando}
          submitLabel="Modificar Proveedor"
        />
      )}
    </div>
  )
}