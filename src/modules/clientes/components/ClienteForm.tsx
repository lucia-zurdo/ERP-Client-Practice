/**
 * Componente de formulario editable para crear o modificar un cliente.
 */

import type { Cliente }                                              from '../types/Cliente'
import { Fragment }                                                  from 'react'
import { inputClass, inputReadOnlyClass, labelClass,
         SubmitButton, OPCIONES_FORMA_PAGO, createCifChangeHandler } from '../../../shared'

// ── Props ────────────────────────────────────────────────────────────────────

interface ClienteFormProps {
  form: Cliente
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onSubmit: () => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  cargando?: boolean
  submitLabel?: string
}

// ── Componente ───────────────────────────────────────────────────────────────

export function ClienteForm({
  form,
  onChange,
  onSelectChange,
  onSubmit,
  onKeyDown,
  cargando = false,
  submitLabel = 'Guardar',
}: ClienteFormProps) {
  return (
    <div className="grid grid-cols-[150px_1fr_150px_1fr] gap-x-4 gap-y-3 w-4/5 max-w-3xl items-center">

      {/* ID: solo visible en modo edición, siempre readonly */}
      {form.idCliente != null && (
        <Fragment>
          <label className={labelClass}>ID Cliente</label>
          <input className={inputReadOnlyClass} readOnly value={form.idCliente} />
        </Fragment>
      )}

      {/* ── Identificación ── */}
      <label htmlFor="descCliente" className={labelClass}>Descripción <label className= {"text-red-400"}>*</label></label>
      <input
        id="descCliente"
        className={inputClass}
        name="descCliente"
        maxLength={300}
        value={form.descCliente}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      <label htmlFor="razonSocial" className={labelClass}>Razón Social</label>
      <input
        id="razonSocial"
        className={inputClass}
        name="razonSocial"
        maxLength={300}
        value={form.razonSocial}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      <label htmlFor="cifCliente" className={labelClass}>CIF <label className= {"text-red-400"}>*</label></label>
      <input
        id="cifCliente"
        className={inputClass}
        name="cifCliente"
        maxLength={9}
        value={form.cifCliente}
        onChange={createCifChangeHandler(onChange)}
        onKeyDown={onKeyDown}
      />

      {/* ── Dirección ── */}
      <label htmlFor="direccion" className={labelClass}>Dirección</label>
      <input
        id="direccion"
        className={inputClass}
        name="direccion"
        maxLength={100}
        value={form.direccion}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      <label htmlFor="codPostal" className={labelClass}>Código Postal <label className= {"text-red-400"}>*</label></label>
      <input
        id="codPostal"
        className={inputClass}
        name="codPostal"
        maxLength={5}
        value={form.codPostal}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      <label htmlFor="poblacion" className={labelClass}>Población</label>
      <input
        id="poblacion"
        className={inputClass}
        name="poblacion"
        maxLength={100}
        value={form.poblacion}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      <label htmlFor="provincia" className={labelClass}>Provincia</label>
      <input
        id="provincia"
        className={inputClass}
        name="provincia"
        maxLength={100}
        value={form.provincia}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      <label htmlFor="pais" className={labelClass}>País <label className= {"text-red-400"}>*</label></label>
      <input
        id="pais"
        className={inputClass}
        name="pais"
        maxLength={10}
        value={form.pais}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      {/* ── Contacto ── */}
      <label htmlFor="telefono" className={labelClass}>Teléfono</label>
      <input
        id="telefono"
        className={inputClass}
        name="telefono"
        maxLength={25}
        value={form.telefono}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      <label htmlFor="fax" className={labelClass}>Fax</label>
      <input
        id="fax"
        className={inputClass}
        name="fax"
        maxLength={25}
        value={form.fax}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      <label htmlFor="eMail" className={labelClass}>Email</label>
      <input
        id="eMail"
        className={inputClass}
        name="eMail"
        type="email"
        maxLength={100}
        value={form.eMail}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      <label htmlFor="web" className={labelClass}>Web</label>
      <input
        id="web"
        className={inputClass}
        name="web"
        maxLength={100}
        value={form.web}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      <label htmlFor="telefono2" className={labelClass}>Teléfono 2</label>
      <input
        id="telefono2"
        className={inputClass}
        name="telefono2"
        maxLength={25}
        value={form.telefono2}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      <label htmlFor="movil" className={labelClass}>Móvil</label>
      <input
        id="movil"
        className={inputClass}
        name="movil"
        maxLength={25}
        value={form.movil}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      {/* ── Comercial ── */}
      <label htmlFor="formaPago" className={labelClass}>Forma de Pago <label className= {"text-red-400"}>*</label></label>
      <select
        id="formaPago"
        className={inputClass}
        name="formaPago"
        value={form.formaPago}
        onChange={onSelectChange}
      >
        {OPCIONES_FORMA_PAGO.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      <label htmlFor="ccCliente" className={labelClass}>Cuenta Contable</label>
      <input
        id="ccCliente"
        className={inputClass}
        name="ccCliente"
        maxLength={10}
        value={form.ccCliente}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      <label htmlFor="dtoComercial" className={labelClass}>Dto. Comercial (%) <label className= {"text-red-400"}>*</label></label>
      <input
        id="dtoComercial"
        className={inputClass}
        name="dtoComercial"
        type="number"
        min={0}
        max={100}
        value={form.dtoComercial}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {/* ── Observaciones: textarea de ancho completo ── */}
      <div className="col-span-4 flex items-start gap-4">
      <label htmlFor="observaciones" className={`${labelClass} w-[150px] shrink-0 pt-9`}>
          Observaciones
      </label>
      <textarea
          id="observaciones"
          className={`${inputClass} flex-1 h-24 resize-y`}
          name="observaciones"
          maxLength={300}
          value={form.observaciones}
          onChange={onChange}
      />
      </div>
      <SubmitButton
        onClick={onSubmit}
        loading={cargando}
        label={submitLabel}
        className="col-span-4 mt-4"
      />

    </div>
  )
}