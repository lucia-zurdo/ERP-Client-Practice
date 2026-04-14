/**
 * ArticuloDetail
 *
 * Componente de presentación que muestra datos de un artículo
 * en un grid de sólo lectura de 4 columnas [label | valor | label | valor].
 *
 * Es un componente reutilizable desde cualquier página.
 */

import { Fragment }                       from 'react'
import { labelClass, inputReadOnlyClass } from '../../../shared'
import type { Articulo }                  from '../types/Articulo'

// ── Configuración de campos ─────────────────────────────────────────────────

//Se definen los metadatos de cada campo visible del artículo.
interface CampoConfig {
  label: string
  key: keyof Articulo
  unidad?: string
}

const CAMPOS: CampoConfig[] = [
  // Identificación
  { label: 'ID Artículo',      key: 'idArticulo'   },
  { label: 'Descripción',      key: 'descArticulo' },
  // Clasificación
  { label: 'Estado',           key: 'estado'       },
  { label: 'Familia',          key: 'familia'      },
  // Contabilidad
  { label: 'C. C. de venta',   key: 'cCVenta'      },
  { label: 'C. C. de compra',  key: 'cCCompra'     },
  { label: 'Tipo de IVA',      key: 'tipoIva'      },
  // Unidades
  { label: 'Ud. Venta',        key: 'udVenta'      },
  { label: 'Ud. Compra',       key: 'udCompra'     },
  // Dimensiones físicas
  { label: 'Peso Neto',        key: 'pesoNeto',    unidad: 'kg' },
  { label: 'Peso Bruto',       key: 'pesoBruto',   unidad: 'kg' },
  { label: 'Plazo',            key: 'plazo'        },
  { label: 'Volumen',          key: 'volumen'      },
]

// ── Tipos ───────────────────────────────────────────────────────────────────

interface ArticuloDetailProps {
  articulo: Articulo
}

// ── Componente ──────────────────────────────────────────────────────────────

export function ArticuloDetail({ articulo }: ArticuloDetailProps) {
  return (
    <div className="grid grid-cols-[150px_1fr_150px_1fr] gap-x-4 gap-y-3 w-4/5 max-w-3xl items-center">
      {CAMPOS.map(({ label, key, unidad }) => {
        // Construimos el label final incluyendo la unidad si existe
        const labelTexto = unidad ? `${label} (${unidad})` : label

        /**
         * Se normaliza el valor a string para el input:
         *  - null/undefined → string vacío
         *  - números → su representación string */
        const valor = articulo[key] != null ? String(articulo[key]) : ''

        return (
          <Fragment key={key}>
            <label htmlFor={key} className={labelClass}>
              {labelTexto}
            </label>
            <input
              id={key}
              className={inputReadOnlyClass}
              readOnly
              value={valor}
            />
          </Fragment>
        )
      })}
    </div>
  )
}