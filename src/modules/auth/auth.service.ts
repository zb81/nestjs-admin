import { Injectable } from '@nestjs/common'

import { BizException } from '~/common/biz.exception'
import { BizError } from '~/constants/biz-error'
import { genAuthPVKey, genAuthPermKey } from '~/constants/redis-key'
import { TokenService } from '~/modules/auth/services/token.service'
import { RedisService } from '~/modules/shared/redis/redis.service'
import { LoginLogService } from '~/modules/system/log/services/login-log.service'
import { MenuService } from '~/modules/system/menu/menu.service'
import { UserService } from '~/modules/system/user/user.service'
import { comparePassword } from '~/utils/crypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly redis: RedisService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly menuService: MenuService,
    private readonly loginLogService: LoginLogService,
  ) { }

  async login(username: string, password: string, ip: string, ua: string) {
    const user = await this.userService.findByUsername(username)
    if (!user || !(await comparePassword(password, user.password)))
      throw new BizException(BizError.INVALID_USERNAME_PASSWORD)

    const token = await this.tokenService.genAccessToken(user.id)

    // 密码版本号用于修改密码重新登录
    await this.redis.set(genAuthPVKey(user.id), 1)

    // 菜单权限
    const permissions = await this.menuService.getPermissionsByUserId(user.id)
    await this.setPermissionCache(user.id, permissions)

    // 登录日志入库
    await this.loginLogService.create(user.id, ip, ua)

    return token
  }

  async resignToken(refreshToken: string) {
    return await this.tokenService.resignToken(refreshToken)
  }

  async setPermissionCache(uid: number, permissions: string[]) {
    await this.redis.set(genAuthPermKey(uid), JSON.stringify(permissions))
  }

  async getPermissionCache(uid: number): Promise<string[]> {
    const permissions = await this.redis.get(genAuthPermKey(uid))
    return permissions ? JSON.parse(permissions) : []
  }

  async checkUsername(username: string) {
    const user = await this.userService.findByUsername(username)
    if (user)
      return false
    return true
  }

  async checkUsernameAndEmail(username: string, email: string) {
    const user = await this.userService.findByUsernameAndEmail(username, email)
    if (!user)
      throw new BizException(BizError.USER_NOT_EXIST)
  }
}
