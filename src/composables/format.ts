const number = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 })

/** Zahl im deutschen Format: 41.800, 4,6 */
export const de = (value: number) => number.format(value)
