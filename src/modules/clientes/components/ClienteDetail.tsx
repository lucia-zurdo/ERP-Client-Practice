/**
 * Componente de presentación que muestra los datos de un cliente
 * en un grid de solo lectura.
 *
 * Nota: 'observaciones' ocupa col-span-3 porque su contenido puede
 * ser extenso, aprovechando el ancho disponible del grid de 4 columnas.
 */

import type { Cliente } from '../types/Cliente'
import { Fragment }      from 'react'
import { labelClass, inputReadOnlyClass } from '../../../shared'

interface CampoConfig {
  label: string
  key: keyof Cliente
  /** Si es true, el input ocupa las 3 columnas restantes (col-span-3) */
  wide?: boolean
  multiline?: boolean
}

const CAMPOS: CampoConfig[] = [
  // Identificación
  { label: 'ID Cliente',         key: 'idCliente'    },
  { label: 'Descripción',        key: 'descCliente'  },
  { label: 'Razón Social',       key: 'razonSocial'  },
  { label: 'CIF',                key: 'cifCliente'   },
  // Dirección
  { label: 'Dirección',          key: 'direccion'    },
  { label: 'Código Postal',      key: 'codPostal'    },
  { label: 'Población',          key: 'poblacion'    },
  { label: 'Provincia',          key: 'provincia'    },
  { label: 'País',               key: 'pais'         },
  // Contacto
  { label: 'Teléfono',           key: 'telefono'     },
  { label: 'Fax',                key: 'fax'          },
  { label: 'Email',              key: 'eMail'        },
  { label: 'Web',                key: 'web'          },
  { label: 'Teléfono 2',         key: 'telefono2'    },
  { label: 'Móvil',              key: 'movil'        },
  // Comercial
  { label: 'Forma de Pago',      key: 'formaPago'    },
  { label: 'Cuenta Contable',    key: 'ccCliente'    },
  { label: 'Dto. Comercial (%)', key: 'dtoComercial' },
  { label: 'Observaciones',      key: 'observaciones', wide: true, multiline: true },
]

interface ClienteDetailProps {
  cliente: Cliente
}

export function ClienteDetail({ cliente }: ClienteDetailProps) {
  return (
    <div className="grid grid-cols-[150px_1fr_150px_1fr] gap-x-4 gap-y-3 w-4/5 max-w-3xl items-center">
      {CAMPOS.map(({ label, key, wide, multiline }) => (
        <Fragment key={key}>
          <label htmlFor={key} className={labelClass}>{label}</label>
          {multiline ? (
            <textarea
              id={key}
              className={`${inputReadOnlyClass}${wide ? ' col-span-3' : ''} resize-none h-20`}
              readOnly
              value={cliente[key] != null ? String(cliente[key]) : ''}
            />
          ) : (
            <input
              id={key}
              className={`${inputReadOnlyClass}${wide ? ' col-span-3' : ''}`}
              readOnly
              value={cliente[key] != null ? String(cliente[key]) : ''}
            />
          )}
        </Fragment>
      ))}
    </div>
  )
}