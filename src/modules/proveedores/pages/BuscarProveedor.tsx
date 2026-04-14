/**
 * Página que permite buscar un proveedor por ID.
 * Muestra campo de búsqueda y, si la llamada a la API tiene éxito,
 * renderiza los datos del proveedor en un grid de sólo lectura.
 * Toda la lógica del formulario proviene de 'useArticuloForm y
 * el renderizado de 'ArticuloForm'.
 * 
 * Flujo:
 *  1. Usuario escribe un ID en 'SearchInput' y pulsa Buscar.
 *  2. El handler 'handleBuscar' llama al servicio y actualiza el estado.
 *  3. Si hay error se muestra 'FormFeedBack'; si hay datos se muestra el grid.
 */

import { ProveedorDetail, getProveedorByCif, 
         getProveedorByRazonSocial }              from '../'
import { useBusqueda, FormFeedback, SearchInput } from '../../../shared'
import type { Proveedor }                         from '../'

export default function BuscarProveedor() {
  const { valores, setValor, resultado: proveedor, error, buscando, handleBuscar } =
    useBusqueda<Proveedor>([
          { label: 'CIF',          buscarFn: getProveedorByCif         },
          { label: 'Razón Social', buscarFn: getProveedorByRazonSocial }
        ])

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <h2 className="text-gray-300 text-2xl font-bold mb-6">Buscar Proveedor</h2>
      <FormFeedback error={error} />
      <SearchInput
        label="CIF"
        value={valores[0]}
        onChange={v => setValor(0, v)}
        onSearch={() => handleBuscar(0)}
        loading={buscando}
      />
      <SearchInput
        label="Razón Social"
        value={valores[1]}
        onChange={v => setValor(1, v)}
        onSearch={() => handleBuscar(1)}
        loading={buscando}
      />
      {proveedor && <ProveedorDetail proveedor={proveedor} />}
    </div>
  )
}