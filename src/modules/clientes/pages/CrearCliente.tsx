/**
 * Página que permite crear un nuevo cliente
 * Toda la lógica del formulario proviene de 'useClienteForm y
 * el renderizado de 'ClienteForm'.
 * Tras la creación de un cliente, se llama a reset() para limpiar el form
 * y dejarlo listo para una nueva entrada
 */

import type React                                     from 'react'
import { useClienteForm, ClienteForm, createCliente } from '../'
import { FormFeedback }                               from '../../../shared'

export default function CrearCliente() {
    const { form, mensaje, error, cargando, handleChange, handleSelectChange, reset, ejecutar } = useClienteForm()

    // ── Handlers ────────────────────────────────────────────────────────────────
    
    const handleSubmit = () =>
        ejecutar(async () => {
            await createCliente(form)
            reset()
        }, 'Cliente creado correctamente')

      // ── Render ──────────────────────────────────────────────────────────────────

    return (
    <div className="flex flex-col items-center p-6 w-full">
            <h2 className="text-gray-200 text-2xl font-bold mb-6">Crear Cliente</h2>
            <FormFeedback mensaje={mensaje} error={error} />
            <ClienteForm
                form={form}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
                onSubmit={handleSubmit}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSubmit()}
                cargando={cargando}
                submitLabel="Crear Cliente"
            />
        </div>
    )
}