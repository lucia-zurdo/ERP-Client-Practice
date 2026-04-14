import { apiClient } from '../../../shared'
import type { Articulo } from '../types/Articulo'

function toApiBody(articulo: Articulo) {
  return {
    IdArticulo:   articulo.idArticulo,
    DescArticulo: articulo.descArticulo,
    Estado:       articulo.estado,
    Familia:      articulo.familia,
    CCVenta:      articulo.cCVenta,
    CCCompra:     articulo.cCCompra,
    TipoIva:      articulo.tipoIva,
    UdVenta:      articulo.udVenta,
    UdCompra:     articulo.udCompra,
    PesoNeto:     articulo.pesoNeto,
    PesoBruto:    articulo.pesoBruto,
    Plazo:        articulo.plazo,
    Volumen:      articulo.volumen,
  }
}

export function getAllArticulos(): Promise<Articulo[]> {
  return apiClient.get('/articulos')
}

export function getArticuloByDesc(descArticulo: string): Promise<Articulo> {
  return apiClient.get(`/articulos/buscar/descripcion/${encodeURIComponent(descArticulo)}`)
}

export function createArticulo(articulo: Articulo): Promise<Articulo> {
  return apiClient.post('/articulos', toApiBody(articulo))
}

export function updateArticulo(articulo: Articulo): Promise<Articulo> {
  return apiClient.put('/articulos', toApiBody(articulo))
}

export function deleteArticulo(descArticulo: string): Promise<void> {
  return apiClient.delete(`/articulos/eliminar/descripcion/${encodeURIComponent(descArticulo)}`)
}