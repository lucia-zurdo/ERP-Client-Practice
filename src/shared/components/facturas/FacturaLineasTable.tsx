/**
 * Tabla de solo lectura para mostrar las líneas de una factura.
 * Compartida entre compra y venta ya que los campos de línea
 * son idénticos en ambos tipos.
 */

import { thClass, tdClass, trClassReadonly, theadClass } from '../../../shared'

interface Linea {
  idLineaFactura: number
  idArticulo: string
  descArticulo: string
  idUdMedida: string
  cantidad: number
  precio: number
  dto: number
  dtoProntoPago: number
  tipoIva: string
  importe: number
  lote: string
}

interface FacturaLineasTableProps {
  lineas: Linea[]
}

const COLUMNAS = [
  { header: 'Artículo',      key: 'idArticulo'    },
  { header: 'Descripción',   key: 'descArticulo'  },
  { header: 'Ud. Medida',    key: 'idUdMedida'    },
  { header: 'Cantidad',      key: 'cantidad'      },
  { header: 'Precio',        key: 'precio'        },
  { header: 'Dto (%)',       key: 'dto'           },
  { header: 'Dto PP (%)',    key: 'dtoProntoPago' },
  { header: 'Tipo IVA',      key: 'tipoIva'       },
  { header: 'Importe',       key: 'importe'       },
  { header: 'Lote',          key: 'lote'          },
] as const

// Campos que deben mostrarse con 2 decimales
const CAMPOS_DECIMALES = new Set(['precio', 'importe'])

export function FacturaLineasTable({ lineas }: FacturaLineasTableProps) {
  if (!lineas?.length) return null

  return (
    <div className="w-full max-w-5xl mt-8">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className={theadClass}>
              {COLUMNAS.map(({ header, key }) => (
                <th key={key} className={thClass}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lineas.map(linea => (
              <tr key={linea.idLineaFactura} className={trClassReadonly}>
                {COLUMNAS.map(({ key }) => {
                  const valor = linea[key as keyof Linea]
                  return (
                    <td key={key} className={tdClass}>
                      {CAMPOS_DECIMALES.has(key)
                        ? Number(valor).toFixed(2)
                        : String(valor ?? '—')}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}