export const fmt2 = (v: unknown) => Number(v).toFixed(2)
export const fmtFecha = (v: unknown) => (v as string)?.split('T')[0] ?? '—'