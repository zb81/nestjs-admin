import { Module } from '@nestjs/common'

import { RoleService } from '~/modules/system/role/role.service'

@Module({
  providers: [RoleService],
})
export class RoleModule {}
