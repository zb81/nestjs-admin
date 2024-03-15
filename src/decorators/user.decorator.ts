import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { Request } from 'express'

export const User = createParamDecorator(
  (prop: keyof JwtPayload, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<Request>()
    return prop ? req.user?.[prop] : req.user
  },
)
