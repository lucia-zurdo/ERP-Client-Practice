import { useState }                                          from 'react'
import { useDeleteFlow, FormFeedback, DeleteConfirm,
         SearchInput, DeleteButton }                         from '../../../shared'
import { deleteFacturaCompra,
         getFacturaCompraByNFactura }                        from '../'
import type { FacturaCompraCabecera }                        from '../'

export default function EliminarFacturaCompra() {
  const [nFactura, setNFactura]           = useState('')
  const [factura, setFactura]             = useState<FacturaCompraCabecera | null>(null)
  const [buscando, setBuscando]           = useState(false)
  const [errorBusqueda, setErrorBusqueda] = useState('')

  const {
    confirmacion, mensaje, error, eliminando,
    handleEliminar, activarConfirmacion, cancelarConfirmacion,
  } = useDeleteFlow(
    (id) => deleteFacturaCompra(Number(id)),
    'Factura de compra'
  )

  const handleBuscar = async () => {
    if (!nFactura.trim()) {
      setErrorBusqueda('Introduce un número de factura')
      return
    }
    setErrorBusqueda('')
    setFactura(null)
    setBuscando(true)
    try {
      const data = await getFacturaCompraByNFactura(nFactura)
      setFactura(data)
    } catch (e: unknown) {
      setErrorBusqueda(e instanceof Error ? e.message : 'Factura no encontrada')
    } finally {
      setBuscando(false)
    }
  }

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <h2 className="text-gray-200 text-2xl font-bold mb-6">Eliminar Factura de Compra</h2>
      <FormFeedback mensaje={mensaje} error={error} />
      <SearchInput
        label="Nº Factura"
        value={nFactura}
        onChange={setNFactura}
        onSearch={handleBuscar}
        loading={buscando}
        error={errorBusqueda}
      />
      {factura && !mensaje && (
        <div className="flex flex-col items-center gap-4 mt-4">
          <p className="text-gray-300 text-sm">
            Factura <span className="text-green-400 font-bold">{factura.nFactura}</span> —{' '}
            {factura.razonSocial} ({factura.cifProveedor})
          </p>
          {!confirmacion && (
            <DeleteButton onClick={activarConfirmacion} disabled={false} />
          )}
          {confirmacion && (
            <DeleteConfirm
              id={String(factura.idFactura)}
              entityLabel="la factura de compra"
              onConfirm={() => handleEliminar(String(factura.idFactura))}
              onCancel={cancelarConfirmacion}
              loading={eliminando}
            />
          )}
        </div>
      )}
    </div>
  )
}