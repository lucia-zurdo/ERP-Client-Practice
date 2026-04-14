/**
 * Página que permite crear un nuevo proveedor
 * Toda la lógica del formulario proviene de 'useProveedorForm y
 * el renderizado de 'ProveedorForm'.
 * Tras la creación de un proveedor, se llama a reset() para limpiar el form
 * y dejarlo listo para una nueva entrada
 */

import type React                                           from 'react'
import { useProveedorForm, ProveedorForm, createProveedor } from '../'
import { FormFeedback }                                     from '../../../shared'

export default function CrearProveedor() {
    const { form, mensaje, error, cargando, handleChange, handleSelectChange, reset, ejecutar } = useProveedorForm()

    // ── Handlers ────────────────────────────────────────────────────────────────
    
    const handleSubmit = () =>
        ejecutar(async () => {
            await createProveedor(form)
            reset()
        }, 'Proveedor creado correctamente')

      // ── Render ──────────────────────────────────────────────────────────────────

    return (
    <div className="flex flex-col items-center p-6 w-full">
            <h2 className="text-gray-200 text-2xl font-bold mb-6">Crear Proveedor</h2>
            <FormFeedback mensaje={mensaje} error={error} />
            <ProveedorForm
                form={form}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
                onSubmit={handleSubmit}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSubmit()}
                cargando={cargando}
                submitLabel="Crear Proveedor"
            />
        </div>
    )
}