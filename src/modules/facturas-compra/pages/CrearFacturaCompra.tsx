import { useFacturaCompraForm }                                  from '../'
import { FormFeedback, SubmitButton, 
         FacturaCabeceraForm, FacturaLineasForm }                from '../../../shared'

export default function CrearFacturaCompra() {
  const {
    cabecera,
    lineas,
    mensaje,
    error,
    cargando,
    labelTercero,
    erroresLineas,
    validarArticulo,
    handleCabeceraChange,
    handleLineaChange,
    handleLineaSelectChange,
    handleCabeceraSelectChange,
    añadirLinea,
    eliminarLinea,
    handleSubmit,
    handleKeyDown,
    handleTextAreaChange,
  } = useFacturaCompraForm()

  return (
    <div className="flex flex-col items-center p-3 w-full">
      <h2 className="text-gray-300 text-2xl font-bold mb-6">Crear Factura de Compra</h2>
      <FormFeedback mensaje={mensaje} error={error} />

      <FacturaCabeceraForm
        cabecera={cabecera}
        onChange={handleCabeceraChange}
        onKeyDown={handleKeyDown}
        onTextAreaChange={handleTextAreaChange}
        onSelectChange={handleCabeceraSelectChange}
        labelTercero={labelTercero}
        terceroReadOnly={false}
      />

      <FacturaLineasForm
        lineas={lineas}
        erroresLineas={erroresLineas}
        onKeyDown={handleKeyDown}
        onLineaChange={handleLineaChange}
        onLineaSelectChange={handleLineaSelectChange}
        onValidarArticulo={validarArticulo}
        onAñadirLinea={añadirLinea}
        onEliminarLinea={eliminarLinea}
      />

      <SubmitButton
        onClick={handleSubmit}
        loading={cargando}
        label="Crear Factura"
      />
    </div>
  )
}