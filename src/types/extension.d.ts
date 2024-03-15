import 'express'

declare module 'express' {
  interface Request {
    accessToken: string
    user?: JwtPayload
  }
}
