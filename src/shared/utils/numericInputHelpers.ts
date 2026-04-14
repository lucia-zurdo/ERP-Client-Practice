import type React from 'react'

// ─── Constantes ───────────────────────────────────────────────────────────────

/**
 * Teclas de navegación y edición permitidas, 
 * independientemente del límite de dígitos configurado
 */
const TECLAS_PERMITIDAS = new Set ([
    'Backspace',
    'Delete',
    'Tab',
    'ArrowLeft',
    'ArrowRight',
])

/**
 * Campos cuyo valor numérico se limita a 3 dígitos
 * Corresponde a campos de porcentaje (0-100 con hasta 3 cifras: "100")
 */
const CAMPOS_3_DIGITOS = new Set<string>([
  // Cabecera de facturas
  'dtoFactura',
  'dtoProntoPago',
  'recFinan',
  'retencionIRPF',
  // Líneas de facturas
  'dto',
  // Clientes / Proveedores
  'dtoComercial',
])

// ─── Lógica ──────────────────────────────────────────────────────────────

/**
 * Función para determinar el número máximo de dígitos permitidos para un campo dado
 * 
 * Reglas:
 *      - Campos de % → 3 dígitos (máximo "100")
 *      - Resto de campos numéricos → 10 dígitos
 * 
 * @param fieldName → nombre del campo (atributo 'name del input)
 */
export function getMaxDigits(fieldName: string): number {
    return CAMPOS_3_DIGITOS.has(fieldName) ? 3 : 10
}

// ─── Exportar ─────────────────────────────────────────────────────────────

/**
 * Función para generar un handler 'onKeyDown' que bloquea la entrada de dígitos adicionales 
 * una vez se alcanza el límite máximo para ese campo.
 * 
 * @param currentValue → valor actual del campo (string o number)
 * @param fieldName → nombre del campo, para determinar el límite
 */
export function createNumericKeyDownHandler(
    currentValue: string | number,
    fieldName: string,
): React.KeyboardEventHandler<HTMLInputElement>{
    const maxDigits = getMaxDigits(fieldName)

    return (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (TECLAS_PERMITIDAS.has(e.key)) return

        const digitCount = currentValue
            .toString()
            .replace('-', '')
            .replace('.', '')
            .length
        
        if (digitCount >= maxDigits) {
            e.preventDefault()
        }
    }
}

/**
 * Función para generar un handle que bloquea teclas no numéricas para campos específicos, 
 * como las Cuentas Contables, que requieren introducir sólo números.
 */
export function createAccountKeyDownHandler(): React.KeyboardEventHandler<HTMLInputElement> {
  return (e) => {
    if (TECLAS_PERMITIDAS.has(e.key)) return
    if (!/^\d$/.test(e.key)) e.preventDefault()
  }
}

/**
 * Función para generar un handle que bloquea teclas no numéricas para los números de teléfono, 
 * siendo más permisivo que el anterior porque permite agregar + o - si fuese necesario
 */
export function createPhoneKeyDownHandler(): React.KeyboardEventHandler<HTMLInputElement> {
  return (e) => {
    if (TECLAS_PERMITIDAS.has(e.key)) return
    if (!/[\d+\-\s]/.test(e.key)) e.preventDefault()
  }
}

/**
 * Función para inputs de CIF con formato: 1 letra mayus + hasta 8 dígitos
 * Bloquea cualquier carácter que no encaje en esta estructura
 */
export function createCifChangeHandler(
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.toUpperCase()
    if (/^(?=.*[A-Z])[A-Z0-9]{1,9}$/.test(raw)) {
      e.target.value = raw
      onChange(e)
    }
  }
}