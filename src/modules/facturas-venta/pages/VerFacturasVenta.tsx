/**
 * Página que muestra el listado completo de facturas de venta en una tabla.
 * Usa 'useListado' para la carga y 'COLUMNAS' para generar
 * headers y celdas sin duplicar código.
 * 
 * Los tres early returns gestionan los estados de carga, error y lista vacía
 * antes del render principal, manteniéndolo libre de condicionales.
 */

import { useListado, thClass, tdClass,
         trClass, theadClass,
         fmt2, fmtFecha }                from '../../../shared'
import { getAllFacturasVenta }          from '../'
import type { FacturaVentaCabecera }    from '../'

// ── Configuración de columnas ────────────────────────────────────────────────

interface ColumnaConfig {
  header: string
  key: keyof FacturaVentaCabecera
  format?: (value: unknown) => string
}

const COLUMNAS: ColumnaConfig[] = [
  { header: 'ID Factura',       key: 'idFactura'      },
  { header: 'Nº Factura',       key: 'nFactura'       },
  { header: 'Fecha',            key: 'fechaFactura',  format: fmtFecha },
  { header: 'ID Cliente',       key: 'idCliente'           },
  { header: 'CIF',              key: 'cifCliente'          },
  { header: 'Razón Social',     key: 'razonSocial'    },
  { header: 'Forma Pago',       key: 'formaPago'      },
  { header: 'Estado',           key: 'estado'         },
  { header: 'Imp. Líneas',      key: 'impLineas',     format: fmt2 },
  { header: 'Dto. Factura (%)', key: 'impDtoFactura', format: fmt2 },
  { header: 'Dto. PP (%)',      key: 'impDpp',        format: fmt2 },
  { header: 'Rec. Finan. (%)',  key: 'impRE',         format: fmt2 },
  { header: 'Base Imp.',        key: 'baseImponible', format: fmt2 },
  { header: 'IVA',              key: 'impIva',        format: fmt2 },
  { header: 'Retención (%)',    key: 'impRetencion',  format: fmt2 },
  { header: 'Total (€)',        key: 'impTotal',      format: fmt2 },
  { header: 'Vencimiento',      key: 'fechaVencimiento', format: fmtFecha },
  { header: 'Observaciones',    key: 'observaciones'  },
]

// ── Componente ───────────────────────────────────────────────────────────────

export default function VerFacturasCompra() {
  const { datos: facturas, error, cargando } = useListado(getAllFacturasVenta)

  if (cargando) return <p className="text-center text-gray-200 p-6">Cargando...</p>
  if (error)    return <p className="text-center text-red-400 font-bold p-6">{error}</p>
  if (facturas.length === 0) return (
    <p className="text-center text-gray-400 p-6">No hay facturas de venta registradas</p>
  )

  return (
    <div className="p-6 w-full">
      <h2 className="text-gray-300 text-2xl font-bold mb-6 text-center">Facturas de Venta</h2>
      <div className="overflow-x-auto w-full pb-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className={theadClass}>
              {COLUMNAS.map(({ header, key }) => (
                <th key={key} className={thClass}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {facturas.map(factura => (
              <tr key={factura.idFactura} className={trClass}>
                {COLUMNAS.map(({ key, format }) => {
                  const valor = factura[key]
                  return (
                    <td key={key} className={tdClass}>
                      {format ? format(valor) : valor != null ? String(valor) : '—'}
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