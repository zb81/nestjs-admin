import { Module } from '@nestjs/common'

import { AccountController } from '~/modules/account/account.controller'
import { AccountService } from '~/modules/account/account.service'
import { MenuModule } from '~/modules/system/menu/menu.module'
import { UserModule } from '~/modules/system/user/user.module'

@Module({
  imports: [UserModule, MenuModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
