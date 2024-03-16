import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt } from 'passport-jwt'

import { BizException } from '~/common/biz.exception'
import { BizError } from '~/constants/biz-error'
import { genAuthAccessTokenKey, genAuthInvalidTokenKey, genAuthPVKey } from '~/constants/redis-key'
import { PUBLIC_KEY } from '~/decorators/public.decorator'
import { RedisService } from '~/modules/shared/redis/redis.service'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  jwtFromRequestFn = ExtractJwt.fromAuthHeaderAsBearerToken()

  constructor(
    private reflector: Reflector,
    private readonly redis: RedisService,
  ) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic)
      return true

    const request = context.switchToHttp().getRequest<Request>()

    const token = this.jwtFromRequestFn(request)
    // 检查 accessToken 是否有效
    if (!token || await this.redis.get(genAuthInvalidTokenKey(token)))
      throw new BizException(BizError.INVALID_LOGIN)

    request.accessToken = token

    let result: any = false

    try {
      result = await super.canActivate(context)
    }
    catch (e) {
      throw new UnauthorizedException('令牌过期')
    }

    // 此时 request 中有了 user
    // 判断密码是否修改
    const pv = await this.redis.get(genAuthPVKey(request.user.uid))
    if (pv !== String(request.user.pv))
      throw new BizException(BizError.INVALID_LOGIN)

    // 判断是否二次登录
    const redisToken = await this.redis.get(genAuthAccessTokenKey(request.user.uid))
    if (!redisToken)
      throw new UnauthorizedException('令牌过期')

    if (token !== redisToken)
      throw new BizException(BizError.LOGIN_ELSEWHERE)

    return result
  }
}
