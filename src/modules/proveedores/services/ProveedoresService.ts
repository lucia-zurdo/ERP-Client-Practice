import { apiClient } from '../../../shared'
import type { Proveedor } from '../types/Proveedor'

function toApiBody(proveedor: Proveedor) {
    return {
        IdProveedor: proveedor.idProveedor,
        DescProveedor: proveedor.descProveedor,
            RazonSocial: proveedor.razonSocial,
            CifProveedor: proveedor.cifProveedor,
            Direccion: proveedor.direccion,
            CodPostal: proveedor.codPostal,
            Poblacion: proveedor.poblacion,
            Provincia: proveedor.provincia,
            Pais: proveedor.pais,
            Telefono: proveedor.telefono,
            Fax: proveedor.fax,
            EMail: proveedor.eMail,
            Web: proveedor.web,
            Telefono2: proveedor.telefono2,
            Movil: proveedor.movil,
            FormaPago: proveedor.formaPago,
            CCProveedor: proveedor.ccProveedor,
            DtoComercial: proveedor.dtoComercial,
            Observaciones: proveedor.observaciones
    }
}
export function getAllProveedores(): Promise<Proveedor[]> {
  return apiClient.get('/proveedores')
}

export function getProveedorByCif(cif: string): Promise<Proveedor> {
  return apiClient.get(`/proveedores/buscar/cif/${cif}`)
}

export function getProveedorByRazonSocial(razonSocial: string): Promise<Proveedor> {
  return apiClient.get(`/proveedores/buscar/razonsocial/${encodeURIComponent(razonSocial)}`)
}

export function createProveedor(cliente: Proveedor): Promise<Proveedor> {
  return apiClient.post('/proveedores', toApiBody(cliente))
}

export function updateProveedor(cliente: Proveedor): Promise<Proveedor> {
  return apiClient.put('/proveedores', toApiBody(cliente))
}

export function deleteProveedor(id: string): Promise<void> {
  return apiClient.delete('/proveedores', id)
}