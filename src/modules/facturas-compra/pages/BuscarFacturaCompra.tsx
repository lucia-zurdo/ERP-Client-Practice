import { useBusqueda, FormFeedback, SearchInput,
         FacturaCabeceraDetail, FacturaLineasTable }       from '../../../shared'
import { getFacturaCompraByNFactura }                      from '../'
import type { FacturaCompraCabecera }                      from '../types/FacturaCompraCabecera'

export default function BuscarFacturaCompra() {
  const { valores, setValor, resultado: factura, error,
          buscando, handleBuscar } =
    useBusqueda<FacturaCompraCabecera>([
      { label: 'Nº Factura',    buscarFn: getFacturaCompraByNFactura },
    ])

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <h2 className="text-gray-200 text-2xl font-bold mb-6">Buscar Factura de Compra</h2>
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
            factura={{ ...factura, cifTercero: factura.cifProveedor }}
            labelTercero="ID Proveedor"
            idTercero={factura.idProveedor}
          />
          <FacturaLineasTable lineas={factura.lineas} />
        </>
      )}
    </div>
  )
}