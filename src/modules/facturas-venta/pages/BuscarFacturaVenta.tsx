import { useBusqueda, FormFeedback, SearchInput,
         FacturaCabeceraDetail, FacturaLineasTable }      from '../../../shared'
import { getFacturaVentaByNFactura }                      from '../'
import type { FacturaVentaCabecera }                      from '../types/FacturaVentaCabecera'

export default function BuscarFacturaVenta() {
  const { valores, setValor, resultado: factura, error,
          buscando, handleBuscar } =
    useBusqueda<FacturaVentaCabecera>([
      { label: 'Nº Factura',    buscarFn: getFacturaVentaByNFactura },
    ])

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <h2 className="text-gray-200 text-2xl font-bold mb-6">Buscar Factura de Venta</h2>
      <FormFeedback error={error} />

      <SearchInput
        label="Nº Factura"
        value={valores[0]}
        onChange={v => setValor(0, v)}
        onSearch={() => handleBuscar(0)}
        loading={buscando}
      />
      {factura && (
        <>
          <FacturaCabeceraDetail
            factura={{ ...factura, cifTercero: factura.cifCliente }}
            labelTercero="ID Cliente"
            idTercero={factura.idCliente}
          />
          <FacturaLineasTable lineas={factura.lineas} />
        </>
      )}
    </div>
  )
}