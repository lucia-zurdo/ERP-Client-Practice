/**
 * Grid de solo lectura para mostrar los datos de cabecera de una factura.
 * Compartido entre las páginas de facturas-compra y facturas-venta.
 * La única diferencia entre ambos tipos (idProveedor/idCliente) se
 * gestiona con las props 'labelTercero' e 'idTercero'.
 */

import { labelClass, inputReadOnlyClass } from '../../../shared'
import { Fragment } from 'react'

interface CampoConfig {
  label: string
  value: string
  wide?: boolean
}

interface FacturaCabeceraDetailProps {
  factura: {
    idFactura: number
    nFactura: string
    fechaFactura: string
    cifTercero: string
    razonSocial: string
    formaPago: string
    estado: number
    impLineas: number
    dtoFactura: number
    impDtoFactura: number
    dtoProntoPago: number
    impDpp: number
    recFinan: number
    impRE: number
    baseImponible: number
    impIva: number
    retencionIRPF: number
    impRetencion: number
    impTotal: number
    fechaVencimiento: string | null
    observaciones: string
  }
  /** 'ID Proveedor' para compra, 'ID Cliente' para venta */
  labelTercero: string
  /** idProveedor para compra, idCliente para venta */
  idTercero: string
}

export function FacturaCabeceraDetail({
  factura,
  labelTercero,
  idTercero,
}: FacturaCabeceraDetailProps) {

  // Campos definidos como array para evitar repetición de JSX.
  // `format` aplica Number().toFixed(2) a los campos monetarios.
  const campos: CampoConfig[] = [
    { label: 'ID Factura',         value: String(factura.idFactura)                           },
    { label: 'Nº Factura',         value: factura.nFactura                                    },
    { label: 'Fecha Factura',      value: factura.fechaFactura.split('T')[0]                  },
    { label: labelTercero,         value: idTercero                                           },
    { label: 'CIF',                value: factura.cifTercero                                  },
    { label: 'Razón Social',       value: factura.razonSocial                                 },
    { label: 'Forma de Pago',      value: factura.formaPago                                   },
    { label: 'Estado',             value: String(factura.estado)                              },
    { label: 'Imp. Líneas',        value: Number(factura.impLineas).toFixed(2)                },
    { label: 'Dto. Factura (%)',   value: Number(factura.dtoFactura).toFixed(2)               },
    { label: 'Imp. Dto. Fact.',    value: Number(factura.impDtoFactura).toFixed(2)            },
    { label: 'Dto. P. Pago (%)',   value: Number(factura.dtoProntoPago).toFixed(2)            },
    { label: 'Imp. DPP',          value: Number(factura.impDpp).toFixed(2)                    },
    { label: 'Rec. Finan. (%)',    value: Number(factura.recFinan).toFixed(2)                 },
    { label: 'Imp. RE',           value: Number(factura.impRE).toFixed(2)                     },
    { label: 'Base Imponible',     value: Number(factura.baseImponible).toFixed(2)            },
    { label: 'IVA',               value: Number(factura.impIva).toFixed(2)                    },
    { label: 'Retención IRPF (%)', value: Number(factura.retencionIRPF).toFixed(2)            },
    { label: 'Imp. Retención',     value: Number(factura.impRetencion).toFixed(2)             },
    { label: 'Total (€)',          value: Number(factura.impTotal).toFixed(2)                 },
    { label: 'Vencimiento',        value: factura.fechaVencimiento?.split('T')[0] ?? '—'      },
  ]

  return (
    <div className="grid grid-cols-[150px_1fr_150px_1fr] gap-x-4 gap-y-3 w-4/5 max-w-3xl items-center">
      {campos.map(({ label, value }) => (
        <Fragment key={label}>
          <label className={labelClass}>{label}</label>
          <input className={inputReadOnlyClass} readOnly value={value} />
        </Fragment>
      ))}

      {/* Observaciones fuera del flujo del grid para evitar desalineación */}
      <div className="col-span-4 flex items-center gap-4">
        <label className={`${labelClass} w-[150px] shrink-0`}>Observaciones</label>
        <textarea
          className={`${inputReadOnlyClass} flex-1 resize-none h-20`}
          readOnly
          value={factura.observaciones}
        />
      </div>
    </div>
  )
}