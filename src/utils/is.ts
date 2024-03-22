export function isNumber(v: any): v is number {
  return typeof v === 'number'
}

export function isString(v: any): v is string {
  return typeof v === 'string'
}

export function notEmpty<V>(v: V | null | undefined): v is V {
  return v !== null && v !== undefined
}
