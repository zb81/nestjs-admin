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
  uuid: string
  iat?: number
  exp?: number
}
