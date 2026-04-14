/**
 * Página que muestra el listado completo de artículos en una tabla.
 * Carga los datos al montarse mediante 'useEffect' y gestiona
 * tres estados de UI mutuamente excluyentes: cargando | error | datos
 * 
 * Toda la lógica del formulario proviene de 'useArticuloForm y
 * el renderizado de 'ArticuloForm'.
 * 
 * Los tres early returns gestionan los estados de carga, error y lista vacía
 * antes del render principal, manteniéndolo libre de condicionales.
 */

import { useListado, thClass, tdClass, trClass, theadClass }         from '../../../shared'
import { getAllArticulos }                      from '../'
import type { Articulo }                        from '../'

// ── Configuración de columnas ───────────────────────────────────────────────
  /**
   * Define las columnas de la tabla de forma declarativa
   * Centralizar aquí los metadatos evita duplicar el texto del header
   * y la clave de acceso al dato en cada fila.
   * 
   * 'keyof Articulo' garantiza en tiempo de compilación que la propiedad existe
   * en la interfaz.
   */

  interface ColumnaConfig {
  header: string
  key: keyof Articulo
  }

  const COLUMNAS: ColumnaConfig[] = [
    { header: 'ID Artículo',    key: 'idArticulo'   },
    { header: 'Descripción',    key: 'descArticulo' },
    { header: 'Estado',         key: 'estado'       },
    { header: 'Familia',        key: 'familia'      },
    { header: 'C. C. Venta',    key: 'cCVenta'      },
    { header: 'C. C. Compra',   key: 'cCCompra'     },
    { header: 'Tipo de IVA',    key: 'tipoIva'      },
    { header: 'Ud. Venta',      key: 'udVenta'      },
    { header: 'Ud. Compra',     key: 'udCompra'     },
    { header: 'P. Neto (kg)',   key: 'pesoNeto'     },
    { header: 'P. Bruto (kg)',  key: 'pesoBruto'    },
    { header: 'Plazo',          key: 'plazo'        },
    { header: 'Volumen',        key: 'volumen'      },
  ]

  // ── Componente ──────────────────────────────────────────────────────────────

export default function VerArticulos() {
  const { datos: articulos, error, cargando } = useListado(getAllArticulos)

  // ── Early returns para estados de carga y error ─────────────────────────
  if (cargando) return <p className="text-center text-gray-200 p-6">Cargando...</p>
  if (error)    return <p className="text-center text-red-400 font-bold p-6">{error}</p>
  if (articulos.length === 0) return (
    <p className="text-center text-gray-400 p-6">No hay artículos registrados</p>
  )

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="p-6 w-full">
      <h2 className="text-gray-200 text-2xl font-bold mb-6 text-center"> Artículos </h2>
      <div className="overflow-x-auto w-full pb-4">
        {articulos.length === 0 ? (
          // Estado vacío: la API respondió correctamente pero sin datos
          <p className="text-center text-gray-400 py-8"> No hay artículos registrados </p>
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
              {articulos.map(articulo => (
                <tr
                  key={articulo.idArticulo}
                  className={trClass}
                >
                  {COLUMNAS.map(({ key }) => (
                    <td key={key} className={tdClass}>
                      {/* String() normaliza números a texto sin perder el 0 */}
                      {articulo[key] != null ? String(articulo[key]) : '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}