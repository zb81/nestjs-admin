interface JwtRoleItem {
  roleId: number
  roleValue: string
}

interface JwtPayload {
  uid: number
  roles: JwtRoleItem[]
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
