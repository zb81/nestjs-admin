import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'

import { BizException } from '~/common/biz.exception'
import { ROLE_ADMIN } from '~/constants'
import { BizError } from '~/constants/biz-error'
import { ALLOW_NON_PERMISSION_KEY } from '~/decorators/allow-non-permission.decorator'
import { PERMISSION_KEY } from '~/decorators/permission.decorator'

import { PUBLIC_KEY } from '~/decorators/public.decorator'
import { AuthService } from '~/modules/auth/auth.service'

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    // 无需登录
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic)
      return true

    const request = context.switchToHttp().getRequest<Request>()
    const { user } = request
    if (!user)
      throw new BizException(BizError.INVALID_LOGIN)

    // 无需权限
    const allowNonPermission = this.reflector.getAllAndOverride<boolean>(
      ALLOW_NON_PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    )
    if (allowNonPermission)
      return true

    // 获取权限
    const permissions = this.reflector.getAllAndOverride<string | string[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    )

    // 未设置权限，通过
    if (!permissions)
      return true

    // 管理员，通过
    if (user.roles.includes(ROLE_ADMIN))
      return true

    // 获取 Redis 中的权限
    const redisPermissions = await this.authService.getPermissionCache(user.uid)
    // 如果装饰器设置的是数组，只需要满足其中一个即可
    if (Array.isArray(permissions)) {
      if (permissions.some(p => redisPermissions.includes(p)))
        return true
    }
    else {
      if (redisPermissions.includes(permissions))
        return true
    }

    throw new BizException(BizError.NOT_ALLOWED)
  }
}
