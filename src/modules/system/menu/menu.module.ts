import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MenuController } from '~/modules/system/menu/menu.controller'
import { MenuEntity } from '~/modules/system/menu/menu.entity'
import { MenuService } from '~/modules/system/menu/menu.service'
import { RoleModule } from '~/modules/system/role/role.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuEntity]),
    RoleModule,
  ],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule { }
