/**
 * Página que permite crear un nuevo artículo
 * Toda la lógica del formulario proviene de 'useArticuloForm y
 * el renderizado de 'ArticuloForm'.
 * Tras la creación de un artículo, se llama a reset() para limpiar el form
 * y dejarlo listo para una nueva entrada
 */

import type React                                        from 'react'
import { useArticuloForm, ArticuloForm, createArticulo } from '../'
import { FormFeedback }                                  from '../../../shared'

export default function CrearArticulo() {
    const { form, mensaje, error, cargando, handleChange, handleSelectChange, reset, ejecutar } = useArticuloForm()

    // ── Handlers ────────────────────────────────────────────────────────────────
    
    const handleSubmit = () =>
        ejecutar(async () => {
            await createArticulo(form)
            reset()
        }, 'Artículo creado correctamente')

      // ── Render ──────────────────────────────────────────────────────────────────

    return (
    <div className="flex flex-col items-center p-6 w-full">
            <h2 className="text-gray-200 text-2xl font-bold mb-6">Crear Artículo</h2>
            <FormFeedback mensaje={mensaje} error={error} />
            <ArticuloForm
                form={form}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
                onSubmit={handleSubmit}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSubmit()}
                cargando={cargando}
                submitLabel="Crear Artículo"
            />
        </div>
    )
}