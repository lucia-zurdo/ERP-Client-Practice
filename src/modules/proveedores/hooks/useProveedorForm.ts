import { useEntityForm } from '../../../shared'
import type { Proveedor } from '../types/Proveedor'

const PROVEEDOR_INICIAL: Proveedor = {
    descProveedor: '',
    razonSocial: '',
    cifProveedor: '',
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
    ccProveedor: '',
    dtoComercial: 0,
    observaciones: ''
 }

export function useProveedorForm(initialData?: Proveedor) {
  return useEntityForm({
    initialData: initialData ?? PROVEEDOR_INICIAL,
    validate: () => null,
    numericFields: new Set<keyof Proveedor>(['dtoComercial']),
    numericOnlyFields: new Set<keyof Proveedor>(['codPostal']),
    signedFields: new Set<keyof Proveedor>(['telefono', 'telefono2', 'fax', 'movil', 'ccProveedor'])
  })
}