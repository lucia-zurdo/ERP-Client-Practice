import { useEntityForm } from '../../../shared'
import type { Cliente }  from '../types/Cliente'

const CLIENTE_INICIAL: Cliente = {
    descCliente: '',
    razonSocial: '',
    cifCliente: '',
    direccion: '',
    codPostal: '',
    poblacion: '',
    provincia: '',
    pais: '',
    telefono: '',
    fax: '',
    eMail: '',
    web: '',
    telefono2: '',
    movil: '',
    formaPago: '',
    ccCliente: '',
    dtoComercial: 0,
    observaciones: ''
}

// Validación testeable de forma aislada
function validateCliente(form: Cliente): string | null {
  if (!form.descCliente.trim()) return 'La descripción es obligatoria'
  return null
}

export function useClienteForm(initialData?: Cliente) {
  return useEntityForm({
    initialData: initialData ?? CLIENTE_INICIAL,
    validate: validateCliente,
    numericFields: new Set<keyof Cliente>(['dtoComercial']),
    numericOnlyFields: new Set<keyof Cliente>(['codPostal']),
    signedFields: new Set<keyof Cliente>(['telefono', 'telefono2', 'fax', 'movil', 'ccCliente'])
  })
}