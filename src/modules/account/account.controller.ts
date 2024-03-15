import { Controller, Get } from '@nestjs/common'

import { User } from '~/decorators/user.decorator'
import { MenuService } from '~/modules/system/menu/menu.service'

import { UserService } from '~/modules/system/user/user.service'

@Controller('account')
export class AccountController {
  constructor(
    private readonly userService: UserService,
    private readonly menuService: MenuService,
  ) {}

  @Get('profile')
  async profile(@User('uid') uid: number) {
    return await this.userService.getUserInfo(uid)
  }

  @Get('menus')
  async menus(@User('roleIds') roleIds: number[]) {
    return roleIds
    // return await this.menuService
  }
}
