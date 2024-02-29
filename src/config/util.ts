function extract(k: string) {
  const v = process.env[k]
  if (typeof v === 'undefined')
    throw new Error(`Environment variable ${k} is required`)
  return v
}

export function envString(k: string) {
  return extract(k)
}

export function envNumber(k: string) {
  const v = extract(k)
  const n = +v
  if (Number.isNaN(n))
    throw new Error(`Environment variable ${k}:${v} is not a number.`)
  return n
}

export function envBoolean(k: string): boolean {
  const v = extract(k)
  try {
    const b = JSON.parse(v)
    if (typeof b !== 'boolean')
      throw new Error(`Environment variable ${k}:${v} is not a boolean.`)
    return b
  }
  catch {
    throw new Error(`Environment variable ${k}:${v} is not a boolean.`)
  }
}
