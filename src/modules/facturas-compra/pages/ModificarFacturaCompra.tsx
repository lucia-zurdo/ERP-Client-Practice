import { useState }                                from 'react'
import { useFacturaCompraForm,
         getFacturaCompraByNFactura,
         updateFacturaCompra }                     from '../'
import { FormFeedback, SearchInput,
         SubmitButton, validateFactura, 
         FacturaCabeceraForm, FacturaLineasForm  } from '../../../shared'
import type { LineaFacturaForm,  }                 from '../../../shared'
import type { FacturaCompraLinea }                 from '../'

export default function ModificarFacturaCompra() {
  const {
    cabecera, setCabecera,
    lineas, setLineas,
    mensaje, error, cargando,
    labelTercero,
    erroresLineas, setErroresLineas,
    validarArticulo,
    handleCabeceraChange,
    handleLineaChange,
    handleLineaSelectChange,
    handleCabeceraSelectChange,
    añadirLinea, eliminarLinea,
    handleKeyDown,
    handleTextAreaChange,
    ejecutar,
  } = useFacturaCompraForm()

  const [nFactura, setNFactura]                     = useState('')
  const [idFactura, setIdFactura]       = useState<number>(0)
  const [cifProveedor, setCifProveedor] = useState('')
  const [razonSocial, setRazonSocial]   = useState('')
  const [buscando, setBuscando]         = useState(false)
  const [errorBusqueda, setErrorBusqueda] = useState('')
  const [encontrado, setEncontrado]     = useState(false)

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleBuscar = async () => {
    setErrorBusqueda('')
    setEncontrado(false)
    setBuscando(true)
    try {
      const data = await getFacturaCompraByNFactura(String(nFactura))

      // Campos de sólo lectura enriquecidos por el backend
      setIdFactura(data.idFactura)
      setCifProveedor(data.cifProveedor)
      setRazonSocial(data.razonSocial)

      // Cabecera editable → CabeceraFacturaForm
      setCabecera({
        nFactura:          data.nFactura,
        fechaFactura:      data.fechaFactura.split('T')[0],
        idTercero:         data.idProveedor,
        formaPago:         data.formaPago,
        estado:            data.estado,
        dtoFactura:        data.dtoFactura,
        dtoProntoPago:     data.dtoProntoPago,
        recFinan:          data.recFinan,
        retencionIRPF:     data.retencionIRPF,
        fechaVencimiento:  data.fechaVencimiento ? data.fechaVencimiento.split('T')[0] : null,
        observaciones:     data.observaciones,
      })

      // FacturaCompraLinea[] → LineaFacturaForm[]
      // precio: number (API) → string (input de texto)
      const lineasMapeadas = data.lineas.map((l: FacturaCompraLinea) => ({
        idLineaFactura: l.idLineaFactura,
        idArticulo:     l.idArticulo,
        descArticulo:  l.descArticulo,
        idUdMedida:     l.idUdMedida,
        cantidad:       l.cantidad,
        precio:         l.precio.toString(),
        dto:            l.dto,
        dtoProntoPago:  l.dtoProntoPago,
        tipoIva:        l.tipoIva,
        lote:           l.lote,
      }))

      setLineas(lineasMapeadas)
      setErroresLineas(lineasMapeadas.map(() => null))
      setEncontrado(true)

    } catch (e: unknown) {
      setErrorBusqueda(e instanceof Error ? e.message : 'Factura no encontrada')
    } finally {
      setBuscando(false)
    }
  }

  const handleSubmit = () =>
      ejecutar(async () => {
        const errorValidacion = validateFactura(cabecera, lineas, 'proveedor')
        if (errorValidacion) throw new Error(errorValidacion)
        if (erroresLineas.some((err: string | null) => err !== null))
        throw new Error('Artículo/s no válido/s')
        await updateFacturaCompra(idFactura, cabecera, lineas.map((linea: LineaFacturaForm) => ({
        ...linea,
        precio: parseFloat(linea.precio) || 0,
        })))
      }, 'Factura modificada correctamente')

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <h2 className="text-gray-200 text-2xl font-bold mb-6">Modificar Factura de Compra</h2>
      <FormFeedback mensaje={mensaje} error={error} />
      <SearchInput
        label="Nº Factura"
        value={nFactura}
        onChange={setNFactura}
        onSearch={handleBuscar}
        loading={buscando}
        error={errorBusqueda}
      />
      {encontrado && (
        <>
          <FacturaCabeceraForm
            cabecera={cabecera}
            onChange={handleCabeceraChange}
            onKeyDown={handleKeyDown}
            onTextAreaChange={handleTextAreaChange}
            onSelectChange={handleCabeceraSelectChange}
            labelTercero={labelTercero}
            idFactura={idFactura}
            cifTercero={cifProveedor}
            razonSocial={razonSocial}
            terceroReadOnly={true}
          />
          <FacturaLineasForm
            lineas={lineas}
            erroresLineas={erroresLineas}
            onLineaChange={handleLineaChange}
            onLineaSelectChange={handleLineaSelectChange}
            onValidarArticulo={validarArticulo}
            onAñadirLinea={añadirLinea}
            onEliminarLinea={eliminarLinea}
            onKeyDown={handleKeyDown}
          />
          <SubmitButton
            onClick={handleSubmit}
            loading={cargando}
            label="Modificar Factura"
          />
        </>
      )}
    </div>
  )
}