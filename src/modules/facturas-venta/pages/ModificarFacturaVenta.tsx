import { useState }                          from 'react'
import { useFacturaVentaForm,
         getFacturaVentaByNFactura,
         updateFacturaVenta }                from '../'
import type { FacturaVentaLinea }            from '../'
import type { LineaFacturaForm }             from '../../../shared'
import { FormFeedback, SearchInput,
         SubmitButton, validateFactura,
         FacturaCabeceraForm,
         FacturaLineasForm }                 from '../../../shared'

export default function ModificarFacturaVenta() {
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
  } = useFacturaVentaForm()

  const [nFactura, setNFactura]           = useState('')
  const [idFactura, setIdFactura]         = useState<number>(0)
  const [cifCliente, setCifCliente]       = useState('')
  const [razonSocial, setRazonSocial]     = useState('')
  const [buscando, setBuscando]           = useState(false)
  const [errorBusqueda, setErrorBusqueda] = useState('')
  const [encontrado, setEncontrado]       = useState(false)

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleBuscar = async () => {
    setErrorBusqueda('')
    setEncontrado(false)
    setBuscando(true)
    try {
      const data = await getFacturaVentaByNFactura(String(nFactura))

      setIdFactura(data.idFactura)
      setCifCliente(data.cifCliente)   
      setRazonSocial(data.razonSocial)

      setCabecera({
        nFactura:         data.nFactura,
        fechaFactura:     data.fechaFactura.split('T')[0],
        idTercero:        data.idCliente,
        formaPago:        data.formaPago,
        estado:           data.estado,
        dtoFactura:       data.dtoFactura,
        dtoProntoPago:    data.dtoProntoPago,
        recFinan:         data.recFinan,
        retencionIRPF:    data.retencionIRPF,
        fechaVencimiento: data.fechaVencimiento ? data.fechaVencimiento.split('T')[0] : null,
        observaciones:    data.observaciones,
      })

      const lineasMapeadas = data.lineas.map((l: FacturaVentaLinea) => ({
        idLineaFactura: l.idLineaFactura,
        idArticulo:     l.idArticulo,
        descArticulo:   l.descArticulo,
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
      const errorValidacion = validateFactura(cabecera, lineas, 'cliente')
      if (errorValidacion) throw new Error(errorValidacion)
      if (erroresLineas.some((err: string | null) => err !== null))
      throw new Error('Artículo/s no válido/s')
      await updateFacturaVenta(idFactura, cabecera, lineas.map((linea: LineaFacturaForm) => ({
      ...linea,
      precio: parseFloat(linea.precio) || 0,
      })))
    }, 'Factura modificada correctamente')

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <h2 className="text-gray-200 text-2xl font-bold mb-6">Modificar Factura de Venta</h2>
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
            cifTercero={cifCliente}
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