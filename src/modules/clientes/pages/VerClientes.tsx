/**
 * Página que muestra el listado completo de clientes en una tabla.
 * Usa 'useListado' para la carga y 'COLUMNAS' para generar
 * headers y celdas sin duplicar código.
 * 
 * Los tres early returns gestionan los estados de carga, error y lista vacía
 * antes del render principal, manteniéndolo libre de condicionales.
 */

import { useListado, thClass, tdClass, 
         trClass, theadClass, fmt2 }            from '../../../shared'
import { getAllClientes }                       from '../'
import type { Cliente }                         from '../'

// ── Configuración de columnas ────────────────────────────────────────────────

interface ColumnaConfig {
  header: string
  key: keyof Cliente
  /** Formato opcional para transformar el valor antes de mostrarlo */
  format?: (value: unknown) => string
}

const COLUMNAS: ColumnaConfig[] = [
  { header: 'ID Cliente',          key: 'idCliente'     },
  { header: 'Descripción',         key: 'descCliente'   },
  { header: 'Razón Social',        key: 'razonSocial'   },
  { header: 'CIF',                 key: 'cifCliente'    },
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
  { header: 'Cuenta Contable',     key: 'ccCliente'     },
  { header: 'Dto. Comercial (%)',  key: 'dtoComercial', format: fmt2 },
  { header: 'Observaciones',       key: 'observaciones' },
]

// ── Componente ───────────────────────────────────────────────────────────────

export default function VerClientes() {
  const { datos: clientes, error, cargando } = useListado(getAllClientes)

  // ── Early returns para estados de carga y error ─────────────────────────
  if (cargando) return <p className="text-center text-gray-200 p-6">Cargando...</p>
  if (error)    return <p className="text-center text-red-400 font-bold p-6">{error}</p>
  if (clientes.length === 0) return (
    <p className="text-center text-gray-400 p-6">No hay clientes registrados</p>
  )

  return (
    <div className="p-6 w-full">
      <h2 className="text-gray-200 text-2xl font-bold mb-6 text-center">Clientes</h2>
      <div className="overflow-x-auto w-full pb-4">
        {clientes.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No hay clientes registrados</p>
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
              {clientes.map(cliente => (
                <tr key={cliente.idCliente} className={trClass}>
                  {COLUMNAS.map(({ key, format }) => {
                    const valor = cliente[key]
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