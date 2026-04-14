import { apiClient } from '../../../shared'
import type { Cliente } from '../types/Cliente'

function toApiBody(cliente: Cliente) {
  return {
    IdCliente: cliente.idCliente,
    DescCliente: cliente.descCliente,
    RazonSocial: cliente.razonSocial,
    CifCliente: cliente.cifCliente,
    Direccion: cliente.direccion,
    CodPostal: cliente.codPostal,
    Poblacion: cliente.poblacion,
    Provincia: cliente.provincia,
    Pais: cliente.pais,
    Telefono: cliente.telefono,
    Fax: cliente.fax,
    EMail: cliente.eMail,
    Web: cliente.web,
    Telefono2: cliente.telefono2,
    Movil: cliente.movil,
    FormaPago: cliente.formaPago,
    CCCliente: cliente.ccCliente,
    DtoComercial: cliente.dtoComercial,
    Observaciones: cliente.observaciones
  }
}

export function getAllClientes(): Promise<Cliente[]> {
  return apiClient.get('/clientes')
}

export function getClienteByCif(cif: string): Promise<Cliente> {
  return apiClient.get(`/clientes/buscar/cif/${cif}`)
}

export function getClienteByRazonSocial(razonSocial: string): Promise<Cliente> {
  return apiClient.get(`/clientes/buscar/razonsocial/${encodeURIComponent(razonSocial)}`)
}

export function createCliente(cliente: Cliente): Promise<Cliente> {
  return apiClient.post('/clientes', toApiBody(cliente))
}

export function updateCliente(cliente: Cliente): Promise<Cliente> {
  return apiClient.put('/clientes', toApiBody(cliente))
}

export function deleteCliente(id: string): Promise<void> {
  return apiClient.delete('/clientes', id)
}