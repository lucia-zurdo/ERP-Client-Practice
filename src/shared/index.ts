// ── apiClient ────────────────────────────────────────────────────────────────
export { apiClient } from '../core/http/apiClient'

// ── Components ────────────────────────────────────────────────────────────────
export { FormFeedback }          from './components/FormFeedback'
export { SearchInput }           from './components/SearchInput'
export { DeleteConfirm }         from './components/DeleteConfirm'
export { DeleteButton }          from './components/DeleteButton'
export { SubmitButton }          from './components/SubmitButton'
export { FacturaCabeceraForm }   from './components/facturas/FacturaCabeceraForm'
export { FacturaCabeceraDetail } from './components/facturas/FacturaCabeceraDetail'
export { FacturaLineasForm }     from './components/facturas/FacturaLineasForm'
export { FacturaLineasTable }    from './components/facturas/FacturaLineasTable'

// ── Hooks ────────────────────────────────────────────────────────────────
export { useBusqueda }    from './hooks/useBusqueda'
export { useListado }     from './hooks/useListado'
export { useDeleteFlow }  from './hooks/useDeleteFlow'
export { useEntityForm }  from './hooks/useEntityForm'
export { useAsyncAction } from './hooks/useAsyncAction'
export { useFacturasForm }            from './hooks/useFacturasForm'
export type { TipoFactura }           from './hooks/useFacturasForm'

// ── Types ────────────────────────────────────────────────────────────────
export type { CabeceraFacturaForm }   from './types/CabeceraFacturaForm'
export type { LineaFacturaForm }      from './types/LineaFacturaForm'
export type { LineaFacturaConverted } from './types/LineaFacturaConverted'
export type { FacturaCabeceraBase }   from './types/FacturaCabeceraBase'

// ── Styles ────────────────────────────────────────────────────────────────
export { labelClass, inputClass, inputReadOnlyClass,
         thClass, tdClass, trClass, trClassReadonly, theadClass } from './styles/formStyles'

// ── Utils ────────────────────────────────────────────────────────────────
export { fmt2, fmtFecha }                                                    from './utils/formatters'
export { OPCIONES_IVA, OPCIONES_FORMA_PAGO, OPCIONES_UNIDAD_MEDIDA  }        from './constants/selectOptions'
export { createNumericKeyDownHandler, createAccountKeyDownHandler,
         createCifChangeHandler }                                            from './utils/numericInputHelpers'
export { validateFactura }                                                   from './utils/validateFactura'