import { Module } from '@nestjs/common'

import { AccountController } from '~/modules/account/account.controller'
import { AccountService } from '~/modules/account/account.service'

@Module({
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
