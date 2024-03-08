import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MenuController } from '~/modules/system/menu/menu.controller'
import { MenuEntity } from '~/modules/system/menu/menu.entity'
import { MenuService } from '~/modules/system/menu/menu.service'

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule { }
