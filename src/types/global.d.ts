interface JwtPayload {
  uid: number
  roles: string[]
  pv: number
  iat?: number
  exp?: number
}

interface JwtRefreshPayload {
  uid: number
  refreshId: string
  iat?: number
  exp?: number
}
