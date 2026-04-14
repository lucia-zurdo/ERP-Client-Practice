/**
 * Tabla editable de líneas de factura.
 * Compartida entre compra y venta ya que los campos de línea
 * son idénticos en ambos tipos.
 *
 * Cada fila puede mostrar un error de validación de artículo
 * en una fila adicional debajo, gestionado por 'erroresLineas'.
 */

import React                                     from 'react'
import { inputClass, thClass, theadClass,
         createNumericKeyDownHandler,
         OPCIONES_IVA, OPCIONES_UNIDAD_MEDIDA }  from '../../../shared'
import type { LineaFacturaForm }                 from '../../../shared'

interface FacturaLineasFormProps {
  lineas: LineaFacturaForm[]
  erroresLineas: (string | null)[]
  onLineaChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void
  onLineaSelectChange: (index: number, e: React.ChangeEvent<HTMLSelectElement>) => void
  onValidarArticulo: (index: number, idArticulo: string) => void
  onAñadirLinea: () => void
  onEliminarLinea: (index: number) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const COLUMNAS_HEADER = [
  'Artículo', 'Descripción', 'Ud. Medida', 'Cantidad', 'Precio (€)',
  'Dto (%)', 'Dto PP (%)', 'Tipo IVA', 'Lote', ''
]

export function FacturaLineasForm({
  lineas,
  erroresLineas,
  onLineaChange,
  onLineaSelectChange,
  onValidarArticulo,
  onAñadirLinea,
  onEliminarLinea,
  onKeyDown,
}: FacturaLineasFormProps) {
  return (
    <div className="w-full max-w-5xl mb-8">
      <div className="flex justify-between items-center mb-4">
        <button
          className="py-1 px-4 bg-gray-900 text-green-400 border border-green-400 rounded font-bold hover:bg-green-400 hover:text-gray-900 transition-colors cursor-pointer text-sm"
          onClick={onAñadirLinea}
        >
          + Añadir línea
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className={theadClass}>
              {COLUMNAS_HEADER.map(col => (
                <th key={col} className={thClass}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lineas.map((linea, index) => (
              <React.Fragment key={index}>
                <tr className="border-b border-gray-700">

                  <td className="px-2 py-1">
                    <input
                      className={inputClass}
                      name="idArticulo"
                      maxLength={25}
                      value={linea.idArticulo}
                      onChange={e => onLineaChange(index, e)}
                      onBlur={e => onValidarArticulo(index, e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') onValidarArticulo(index, (e.target as HTMLInputElement).value)
                        else onKeyDown(e)
                      }}
                    />
                  </td>

                  <td className="px-2 py-1">
                    <input
                      className={inputClass}
                      name="descArticulo"
                      value={linea.descArticulo}
                      onChange={e => onLineaChange(index, e)}
                      onKeyDown={onKeyDown}
                    />
                  </td>

                  <td className="px-2 py-1">
                    <select
                      className={inputClass}
                      name="idUdMedida"
                      value={linea.idUdMedida}
                      onChange={e => onLineaSelectChange(index, e)}
                    >
                      {OPCIONES_UNIDAD_MEDIDA.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </td>

                  <td className="px-2 py-1">
                    <input
                      className={inputClass}
                      type="number"
                      name="cantidad"
                      value={linea.cantidad}
                      onChange={e => onLineaChange(index, e)}
                      onKeyDown={createNumericKeyDownHandler(linea.cantidad, 'cantidad')}
                    />
                  </td>

                  <td className="px-2 py-1">
                    <input
                      className={inputClass}
                      type="text"
                      name="precio"
                      maxLength={10}
                      value={linea.precio}
                      onChange={e => onLineaChange(index, e)}
                      onKeyDown={onKeyDown}
                    />
                  </td>

                  <td className="px-2 py-1">
                    <input
                      className={inputClass}
                      type="number"
                      name="dto"
                      value={linea.dto}
                      onChange={e => onLineaChange(index, e)}
                      onKeyDown={createNumericKeyDownHandler(linea.dto, 'dto')}
                    />
                  </td>

                  <td className="px-2 py-1">
                    <input
                      className={inputClass}
                      type="number"
                      name="dtoProntoPago"
                      value={linea.dtoProntoPago}
                      onChange={e => onLineaChange(index, e)}
                      onKeyDown={createNumericKeyDownHandler(linea.dtoProntoPago, 'dtoProntoPago')}
                    />
                  </td>

                  <td className="px-2 py-1">
                    <select
                      className={inputClass}
                      name="tipoIva"
                      value={linea.tipoIva}
                      onChange={e => onLineaSelectChange(index, e)}
                    >
                      {OPCIONES_IVA.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </td>

                  <td className="px-2 py-1">
                    <input
                      className={inputClass}
                      name="lote"
                      maxLength={50}
                      value={linea.lote}
                      onChange={e => onLineaChange(index, e)}
                      onKeyDown={onKeyDown}
                    />
                  </td>

                  <td className="px-2 py-1">
                    <button
                      className="py-1 px-3 bg-gray-900 text-red-400 border border-red-400 rounded hover:bg-red-400 hover:text-gray-900 transition-colors cursor-pointer text-xs"
                      onClick={() => onEliminarLinea(index)}
                    >
                      Eliminar
                    </button>
                  </td>

                </tr>

                {/* Fila de error bajo la línea si el artículo no existe */}
                {erroresLineas[index] && (
                  <tr>
                    <td colSpan={10} className="px-2 pb-2 text-red-400 text-s">
                      {erroresLineas[index]}
                    </td>
                  </tr>
                )}

              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}