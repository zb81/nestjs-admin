interface JwtRoleItem {
  roleId: number
  roleValue: string
}

interface JwtPayload {
  uid: number
  pv: number
  iat?: number
  exp?: number
}

interface JwtRefreshPayload {
  uid: number
  iat?: number
  exp?: number
}
