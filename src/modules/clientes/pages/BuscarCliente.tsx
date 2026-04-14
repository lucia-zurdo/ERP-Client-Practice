/**
 * Página que permite buscar un cliente por ID.
 * Muestra campo de búsqueda y, si la llamada a la API tiene éxito,
 * renderiza los datos del cliente en un grid de sólo lectura.
 * Toda la lógica del formulario proviene de 'useClienteForm y
 * el renderizado de 'ClienteForm'.
 * 
 * Flujo:
 *  1. Usuario escribe un ID en 'SearchInput' y pulsa Buscar.
 *  2. El handler 'handleBuscar' llama al servicio y actualiza el estado.
 *  3. Si hay error se muestra 'FormFeedBack'; si hay datos se muestra el grid.
 */

import { useBusqueda, FormFeedback, SearchInput }                  from '../../../shared'
import { ClienteDetail, getClienteByCif, getClienteByRazonSocial } from '../'
import type { Cliente }                                            from '../'

export default function BuscarCliente() {
  const { valores, setValor, resultado: cliente, error, buscando, handleBuscar } =
    useBusqueda<Cliente>([
      { label: 'CIF',          buscarFn: getClienteByCif         },
      { label: 'Razón Social', buscarFn: getClienteByRazonSocial }
    ])

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <h2 className="text-gray-300 text-2xl font-bold mb-6">Buscar Cliente</h2>
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
      {cliente && <ClienteDetail cliente={cliente} />}
    </div>
  )
}