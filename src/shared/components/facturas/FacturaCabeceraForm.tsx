/**
 * Grid editable para los campos de cabecera de una factura.
 * Compartido entre CrearFacturaCompra, CrearFacturaVenta,
 * ModificarFacturaCompra y ModificarFacturaVenta.
 *
 * La única diferencia entre compra y venta es el label del tercero
 * ('ID Proveedor' vs 'ID Cliente'), que se recibe como prop 'labelTercero'
 * directamente desde 'useFacturasForm'.
 */

import type { CabeceraFacturaForm }                                     from '../../types/CabeceraFacturaForm'
import { Fragment }                                                     from 'react'
import { inputClass, inputReadOnlyClass,
         labelClass, createNumericKeyDownHandler, OPCIONES_FORMA_PAGO } from '../../../shared'

interface FacturaCabeceraFormProps {
  cabecera: CabeceraFacturaForm
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onTextAreaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  labelTercero: string
  idFactura?: number
  cifTercero?: string
  razonSocial?: string
  /** Si true, idTercero es readonly (modo modificación).
   *  Si false/undefined, es editable (modo creación). */
  terceroReadOnly?: boolean
}

export function FacturaCabeceraForm({
  cabecera,
  onChange,
  onKeyDown,
  onTextAreaChange,
  onSelectChange,
  labelTercero,
  idFactura,
  cifTercero,
  razonSocial,
  terceroReadOnly = false,
}: FacturaCabeceraFormProps) {
  return (
    <div className="w-4/5 max-w-3xl mb-8">
      <div className="grid grid-cols-[150px_1fr_150px_1fr] gap-x-4 gap-y-3 items-center">

        {/* ID Factura: solo visible en modo edición */}
        {idFactura != null && (
          <Fragment>
            <label className={labelClass}>ID Factura</label>
            <input className={inputReadOnlyClass} readOnly value={idFactura} />
          </Fragment>
        )}

        <label htmlFor="nFactura" className={labelClass}>Nº Factura <label className= {"text-red-400"}>*</label></label>
        <input
          id="nFactura"
          className={inputClass}
          name="nFactura"
          maxLength={25}
          value={cabecera.nFactura}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />

        <label htmlFor="fechaFactura" className={labelClass}>Fecha Factura</label>
        <input
          id="fechaFactura"
          className={inputClass}
          type="date"
          name="fechaFactura"
          value={cabecera.fechaFactura}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />

        {/* idTercero: editable en creación, readonly en modificación */}
        <label htmlFor="idTercero" className={labelClass}>{labelTercero} <label className= {"text-red-400"}>*</label></label>
        {terceroReadOnly ? (
          <input className={inputReadOnlyClass} readOnly value={cabecera.idTercero} />
        ) : (
          <input
            id="idTercero"
            className={inputClass}
            name="idTercero"
            maxLength={25}
            value={cabecera.idTercero}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        )}
        {cifTercero != null && (
          <Fragment>
            <label className={labelClass}>CIF</label>
            <input className={inputReadOnlyClass} readOnly value={cifTercero} />
          </Fragment>
        )}

        {razonSocial != null && (
          <Fragment>
            <label className={labelClass}>Razón Social</label>
            <input className={inputReadOnlyClass} readOnly value={razonSocial} />
          </Fragment>
        )}

        <label htmlFor="formaPago" className={labelClass}>Forma de Pago <label className= {"text-red-400"}>*</label></label>
              <select
                id="formaPago"
                className={inputClass}
                name="formaPago"
                value={cabecera.formaPago}
                onChange={onSelectChange}
              >
                {OPCIONES_FORMA_PAGO.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>

        <label htmlFor="estado" className={labelClass}>Estado <label className= {"text-red-400"}>*</label></label>
        <input
          id="estado"
          className={inputClass}
          type="number"
          name="estado"
          value={cabecera.estado}
          onChange={onChange}
          onKeyDown={createNumericKeyDownHandler(cabecera.estado, 'estado')}
        />

        <label htmlFor="dtoFactura" className={labelClass}>Dto. Factura (%)</label>
        <input
          id="dtoFactura"
          className={inputClass}
          type="number"
          name="dtoFactura"
          value={cabecera.dtoFactura}
          onChange={onChange}
          onKeyDown={createNumericKeyDownHandler(cabecera.dtoFactura, 'dtoFactura')}
        />

        <label htmlFor="dtoProntoPago" className={labelClass}>Dto. P. Pago (%)</label>
        <input
          id="dtoProntoPago"
          className={inputClass}
          type="number"
          name="dtoProntoPago"
          value={cabecera.dtoProntoPago}
          onChange={onChange}
          onKeyDown={createNumericKeyDownHandler(cabecera.dtoProntoPago, 'dtoProntoPago')}
        />

        <label htmlFor="recFinan" className={labelClass}>Rec. Financiero (%)</label>
        <input
          id="recFinan"
          className={inputClass}
          type="number"
          name="recFinan"
          value={cabecera.recFinan}
          onChange={onChange}
          onKeyDown={createNumericKeyDownHandler(cabecera.recFinan, 'recFinan')}
        />

        <label htmlFor="retencionIRPF" className={labelClass}>Retención IRPF (%)</label>
        <input
          id="retencionIRPF"
          className={inputClass}
          type="number"
          name="retencionIRPF"
          value={cabecera.retencionIRPF}
          onChange={onChange}
          onKeyDown={createNumericKeyDownHandler(cabecera.retencionIRPF, 'retencionIRPF')}
        />

        <label htmlFor="fechaVencimiento" className={labelClass}>Fecha Vencimiento</label>
        <input
          id="fechaVencimiento"
          className={inputClass}
          type="date"
          name="fechaVencimiento"
          value={cabecera.fechaVencimiento ?? ''}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />

        {/* Observaciones fuera del flujo del grid para evitar desalineación */}
        <div className="col-span-4 flex items-center gap-4">
          <label htmlFor="observaciones" className={`${labelClass} w-[150px] shrink-0`}>
            Observaciones
          </label>
          <textarea
            id="observaciones"
            className={`${inputClass} flex-1 resize-none h-20`}
            name="observaciones"
            value={cabecera.observaciones}
            onChange={onTextAreaChange}
          />
        </div>

      </div>
    </div>
  )
}