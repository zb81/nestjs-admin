import { Injectable } from '@nestjs/common'

import { BizException } from '~/common/biz.exception'
import { BizError } from '~/constants/biz-error'
import { TokenService } from '~/modules/auth/services/token.service'
import { MenuService } from '~/modules/system/menu/menu.service'
import { RoleService } from '~/modules/system/role/role.service'
import { UserService } from '~/modules/system/user/user.service'
import { comparePassword } from '~/utils/crypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly roleService: RoleService,
    private readonly menuService: MenuService,
  ) { }

  async login(username: string, password: string) {
    const user = await this.userService.findByUsername(username)
    if (!user || !(await comparePassword(password, user.password)))
      throw new BizException(BizError.INVALID_USERNAME_PASSWORD)

    const roles = await this.roleService.getRolesByUserId(user.id)

    const permissions = await this.menuService.getPermissionsByUserId(user.id)
    console.log(permissions)

    return this.tokenService.genAccessToken(user.id, roles)
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
