import { Injectable } from '@nestjs/common'

import { BizException } from '~/common/biz.exception'
import { BizError } from '~/constants/biz-error'
import { TokenService } from '~/modules/auth/services/token.service'
import { UserService } from '~/modules/system/user/user.service'
import { comparePassword } from '~/utils/crypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) { }

  async login(username: string, password: string) {
    const user = await this.userService.findByUsername(username)
    if (!user || !(await comparePassword(password, user.password)))
      throw new BizException(BizError.USER_PASSWORD_ERROR)

    // TODO: 查询角色

    return this.tokenService.genAccessToken(user.id)
  }
}
