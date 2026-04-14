/**
 * Página que permite la modificación de un artículo
 * Primero el usuario busca por ID y si existe,
 * se muestra el formulario con campos de sólo lectura (los que no se pueden modificar)
 * y campos para modificar.
 * Toda la lógica del formulario proviene de 'useArticuloForm y
 * el renderizado de 'ArticuloForm'.
 */

import { useArticuloForm, ArticuloForm,
         getArticuloByDesc, updateArticulo, }  from '../'
import { useBusqueda, FormFeedback,
         SearchInput }                         from '../../../shared'
import type { Articulo }                       from '../'

export default function ModificarArticulo() {
  const {
    form, setForm,
    mensaje, error,
    cargando,
    handleChange, handleSelectChange,
    ejecutar,
  } = useArticuloForm()

  const {
    valores, setValor,
    resultado: encontrado,
    error: errorBusqueda,
    buscando,
    handleBuscar,
  } = useBusqueda<Articulo>([ 
    { label: 'Descripción', buscarFn: getArticuloByDesc }
    ],
    {
      // Una vez encontrado el artículo, precarga sus datos en el formulario
      onSuccess: setForm,
    } 
  )

  const handleSubmit = () =>
    ejecutar(
      async () => { await updateArticulo(form) },
      'Artículo modificado correctamente'
    )

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <h2 className="text-gray-200 text-2xl font-bold mb-6">Modificar Artículo</h2>

      <FormFeedback mensaje={mensaje} error={error} />

      {/* ── Búsqueda ── */}
      <SearchInput
        label="Descripción"
        value={valores[0]}
        onChange={v => setValor(0, v)}
        onSearch={() => handleBuscar(0)}
        loading={buscando}
        error={errorBusqueda}
      />

      {/* ── Formulario ── */}
      {encontrado && (
        <ArticuloForm
          form={form}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
          onSubmit={handleSubmit}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          cargando={cargando}
          submitLabel="Modificar Artículo"
        />
      )}
    </div>
  )
}