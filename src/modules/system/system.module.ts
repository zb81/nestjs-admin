import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'

import { DeptModule } from '~/modules/system/dept/dept.module'
import { MenuModule } from '~/modules/system/menu/menu.module'
import { RoleModule } from '~/modules/system/role/role.module'
import { UserModule } from '~/modules/system/user/user.module'

const modules = [
  DeptModule,
  MenuModule,
  UserModule,
  RoleModule,
]

@Module({
  imports: [
    ...modules,
    RouterModule.register([
      { path: 'system', module: SystemModule, children: modules },
    ]),
  ],
})
export class SystemModule {}
