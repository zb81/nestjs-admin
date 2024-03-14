import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MenuEntity } from '~/modules/system/menu/menu.entity'
import { RoleController } from '~/modules/system/role/role.controller'
import { RoleEntity } from '~/modules/system/role/role.entity'
import { RoleService } from '~/modules/system/role/role.service'

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, MenuEntity])],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
