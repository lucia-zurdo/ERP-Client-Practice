export const Permissions = {
  // Artículos
  ARTICULOS_READ:   'articulos:read',
  ARTICULOS_WRITE:  'articulos:write',
  ARTICULOS_DELETE: 'articulos:delete',

  // Clientes
  CLIENTES_READ:   'clientes:read',
  CLIENTES_WRITE:  'clientes:write',
  CLIENTES_DELETE: 'clientes:delete',

  // Proveedores
  PROVEEDORES_READ:   'proveedores:read',
  PROVEEDORES_WRITE:  'proveedores:write',
  PROVEEDORES_DELETE: 'proveedores:delete',

  // Facturas venta
  FACTURAS_VENTA_READ:   'facturas-venta:read',
  FACTURAS_VENTA_WRITE:  'facturas-venta:write',
  FACTURAS_VENTA_DELETE: 'facturas-venta:delete',

  // Facturas compra
  FACTURAS_COMPRA_READ:   'facturas-compra:read',
  FACTURAS_COMPRA_WRITE:  'facturas-compra:write',
  FACTURAS_COMPRA_DELETE: 'facturas-compra:delete',
} as const;

export type Permission = typeof Permissions[keyof typeof Permissions];