import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'

import { DeptModule } from './dept/dept.module'
import { MenuModule } from './menu/menu.module'
import { UserModule } from './user/user.module'

const modules = [
  DeptModule,
  MenuModule,
  UserModule,
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
