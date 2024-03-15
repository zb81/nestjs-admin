interface JwtPayload {
  uid: number
  pv: number
  roleIds: number[]
  roleValues: string[]
  iat?: number
  exp?: number
}

interface JwtRefreshPayload {
  uid: number
  iat?: number
  exp?: number
}
