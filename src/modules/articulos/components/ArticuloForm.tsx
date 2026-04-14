/**
 * Componente de formulario editable para crear o modificar un artículo.
 * Recibe el estado del formulario y los handlers desde el componente padre.
 */

import { Fragment }                                 from 'react'
import { inputClass, inputReadOnlyClass, labelClass,
         SubmitButton, createNumericKeyDownHandler,
         createAccountKeyDownHandler, OPCIONES_IVA, 
         OPCIONES_UNIDAD_MEDIDA }                   from '../../../shared'
import type { Articulo }                            from '../types/Articulo'

interface ArticuloFormProps {
  form: Articulo
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onSubmit: () => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  cargando?: boolean
  /** Texto del botón de acción. Por defecto: 'Guardar' */
  submitLabel?: string
}

export function ArticuloForm({
  form,
  onChange,
  onSelectChange,
  onSubmit,
  onKeyDown,
  cargando = false,
  submitLabel = 'Guardar',
}: ArticuloFormProps) {
  return (
    <div className="grid grid-cols-[150px_1fr_150px_1fr] gap-x-4 gap-y-3 w-4/5 max-w-3xl items-center">

      {/* ID: siempre readonly, solo visible en modo edición */}
      {form.idArticulo != null && (
        <Fragment>
          <label className={labelClass}>ID Artículo</label>
          <input className={inputReadOnlyClass} readOnly value={form.idArticulo} />
        </Fragment>
      )}

      <label htmlFor="descArticulo" className={labelClass}>Descripción <label className= {"text-red-400"}>*</label></label>
      <input
        id="descArticulo"
        className={inputClass}
        name="descArticulo"
        maxLength={300}
        value={form.descArticulo}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      <label htmlFor="estado" className={labelClass}>Estado <label className= {"text-red-400"}>*</label></label>
      <input
        id="estado"
        className={inputClass}
        name="estado"
        maxLength={10}
        value={form.estado}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      <label htmlFor="familia" className={labelClass}>Familia <label className= {"text-red-400"}>*</label></label>
      <input
        id="familia"
        className={inputClass}
        name="familia"
        maxLength={10}
        value={form.familia}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      <label htmlFor="cCVenta" className={labelClass}>C. C. Venta</label>
      <input
        id="cCVenta"
        className={inputClass}
        name="cCVenta"
        maxLength={10}
        value={form.cCVenta}
        onChange={onChange}
        onKeyDown={createAccountKeyDownHandler()}
      />

      <label htmlFor="cCCompra" className={labelClass}>C. C. Compra</label>
      <input
        id="cCCompra"
        className={inputClass}
        name="cCCompra"
        maxLength={10}
        value={form.cCCompra}
        onChange={onChange}
        onKeyDown={createAccountKeyDownHandler()}
      />

      <label htmlFor="tipoIva" className={labelClass}>Tipo IVA <label className= {"text-red-400"}>*</label></label>
      <select
        id="tipoIva"
        className={inputClass}
        name="tipoIva"
        value={form.tipoIva}
        onChange={onSelectChange}
      >
        {OPCIONES_IVA.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      <label htmlFor="udVenta" className={labelClass}>Ud. Venta</label>
      <select
        id="udVenta"
        className={inputClass}
        name="udVenta"
        value={form.udVenta}
        onChange={onSelectChange}
      >
        {OPCIONES_UNIDAD_MEDIDA.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      <label htmlFor="udCompra" className={labelClass}>Ud. Compra</label>
      <select
        id="udCompra"
        className={inputClass}
        name="udCompra"
        value={form.udCompra}
        onChange={onSelectChange}
      >
        {OPCIONES_UNIDAD_MEDIDA.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      <label htmlFor="pesoNeto" className={labelClass}>Peso neto (kg) <label className= {"text-red-400"}>*</label></label>
      <input
        id="pesoNeto"
        className={inputClass}
        name="pesoNeto"
        type="number"
        value={form.pesoNeto}
        onChange={onChange}
        onKeyDown={createNumericKeyDownHandler(form.pesoNeto, 'pesoNeto')}
      />

      <label htmlFor="pesoBruto" className={labelClass}>Peso bruto (kg) <label className= {"text-red-400"}>*</label></label>
      <input
        id="pesoBruto"
        className={inputClass}
        name="pesoBruto"
        type="number"
        value={form.pesoBruto}
        onChange={onChange}
        onKeyDown={createNumericKeyDownHandler(form.pesoBruto, 'pesoBruto')}
      />

      <label htmlFor="plazo" className={labelClass}>Plazo <label className= {"text-red-400"}>*</label></label>
      <input
        id="plazo"
        className={inputClass}
        name="plazo"
        type="number"
        value={form.plazo}
        onChange={onChange}
        onKeyDown={createNumericKeyDownHandler(form.plazo, 'plazo')}
      />

      <label htmlFor="volumen" className={labelClass}>Volumen <label className= {"text-red-400"}>*</label></label>
      <input
        id="volumen"
        className={inputClass}
        name="volumen"
        type="number"
        value={form.volumen}
        onChange={onChange}
        onKeyDown={createNumericKeyDownHandler(form.volumen, 'volumen')}
      />

      <SubmitButton
        onClick={onSubmit}
        loading={cargando}
        label={submitLabel}
        className="col-span-4 mt-4"
      />
    </div>
  )
}