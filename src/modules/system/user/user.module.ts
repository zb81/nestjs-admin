import { Module } from '@nestjs/common'

import { UserService } from '~/modules/system/user/user.service'

@Module({
  providers: [UserService],
})
export class UserModule {
}
