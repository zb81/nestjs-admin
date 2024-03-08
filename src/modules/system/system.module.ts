import { Module } from '@nestjs/common'

import { DeptModule } from '~/modules/system/dept/dept.module'
import { UserModule } from '~/modules/system/user/user.module'

@Module({
  imports: [UserModule, DeptModule],
})
export class SystemModule {}
