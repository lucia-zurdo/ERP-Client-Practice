/**
 * Página que muestra el listado completo de proveedores en una tabla.
 * Usa 'useListado' para la carga y 'COLUMNAS' para generar
 * headers y celdas sin duplicar código.
 * 
 * Los tres early returns gestionan los estados de carga, error y lista vacía
 * antes del render principal, manteniéndolo libre de condicionales.
 */

import { useListado, thClass, tdClass, 
         trClass, theadClass, fmt2 }            from '../../../shared'
import { getAllProveedores }                    from '../'
import type { Proveedor }                       from '../'

// ── Configuración de columnas ────────────────────────────────────────────────

interface ColumnaConfig {
  header: string
  key: keyof Proveedor
  /** Formato opcional para transformar el valor antes de mostrarlo */
  format?: (value: unknown) => string
}

const COLUMNAS: ColumnaConfig[] = [
  { header: 'ID Proveedor',          key: 'idProveedor' },
  { header: 'Descripción',         key: 'descProveedor' },
  { header: 'Razón Social',        key: 'razonSocial'   },
  { header: 'CIF',                 key: 'cifProveedor'  },
  { header: 'Dirección',           key: 'direccion'     },
  { header: 'Código Postal',       key: 'codPostal'     },
  { header: 'Población',           key: 'poblacion'     },
  { header: 'Provincia',           key: 'provincia'     },
  { header: 'País',                key: 'pais'          },
  { header: 'Teléfono',            key: 'telefono'      },
  { header: 'Fax',                 key: 'fax'           },
  { header: 'Email',               key: 'eMail'         },
  { header: 'Web',                 key: 'web'           },
  { header: 'Teléfono 2',          key: 'telefono2'     },
  { header: 'Móvil',               key: 'movil'         },
  { header: 'Forma de Pago',       key: 'formaPago'     },
  { header: 'Cuenta Contable',     key: 'ccProveedor'     },
  { header: 'Dto. Comercial (%)', key: 'dtoComercial', format: fmt2 },
  { header: 'Observaciones',       key: 'observaciones' },
]

// ── Componente ───────────────────────────────────────────────────────────────

export default function VerProveedores() {
  const { datos: proveedores, error, cargando } = useListado(getAllProveedores)

  // ── Early returns para estados de carga y error ─────────────────────────
  if (cargando) return <p className="text-center text-gray-200 p-6">Cargando...</p>
  if (error)    return <p className="text-center text-red-400 font-bold p-6">{error}</p>
  if (proveedores.length === 0) return (
    <p className="text-center text-gray-400 p-6">No hay proveedores registrados</p>
  )

  return (
    <div className="p-6 w-full">
      <h2 className="text-gray-200 text-2xl font-bold mb-6 text-center">Proveedores</h2>
      <div className="overflow-x-auto w-full pb-4">
        {proveedores.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No hay proveedores registrados</p>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className={theadClass}>
                {COLUMNAS.map(({ header, key }) => (
                  <th key={key} className={thClass}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {proveedores.map(proveedor => (
                <tr key={proveedor.idProveedor} className={trClass}>
                  {COLUMNAS.map(({ key, format }) => {
                    const valor = proveedor[key]
                    return (
                      <td key={key} className={tdClass}>
                        {/* Si tiene formato lo aplica, si no normaliza a string */}
                        {format ? format(valor) : valor != null ? String(valor) : '—'}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}