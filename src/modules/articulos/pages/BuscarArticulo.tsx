/**
 * Página que permite buscar un artículo por ID.
 * Muestra campo de búsqueda y, si la llamada a la API tiene éxito,
 * renderiza los datos del artículo en un grid de sólo lectura.
 * Toda la lógica del formulario proviene de 'useArticuloForm y
 * el renderizado de 'ArticuloForm'.
 * 
 * Flujo:
 *  1. Usuario escribe un ID en 'SearchInput' y pulsa Buscar.
 *  2. El handler 'handleBuscar' llama al servicio y actualiza el estado.
 *  3. Si hay error se muestra 'FormFeedBack'; si hay datos se muestra el grid.
 */

import { useBusqueda, FormFeedback, SearchInput } from '../../../shared'
import { ArticuloDetail, getArticuloByDesc }      from '../'
import type { Articulo }                          from '../'

export default function BuscarArticulo() {
    const { valores, setValor, resultado: articulo, error, buscando, handleBuscar } =
    useBusqueda<Articulo>([
      { label: 'Descripción', buscarFn: getArticuloByDesc },
    ])

    return (
      <div className="flex flex-col items-center p-6 w-full">
      <h2 className="text-gray-300 text-2xl font-bold mb-6">
        Buscar Artículo
        </h2>
      <FormFeedback error={error} />
      <SearchInput
        label="Descripción"
        value={valores[0]}
        onChange={v => setValor(0, v)}
        onSearch={() => handleBuscar(0)}
        loading={buscando}
      />
      {articulo && <ArticuloDetail articulo={articulo} />}
    </div>
    )
}