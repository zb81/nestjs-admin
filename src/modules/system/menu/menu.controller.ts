import { Body, Controller, Post } from '@nestjs/common'

import { CreateMenuDto } from '~/modules/system/menu/menu.dto'
import { MenuService } from '~/modules/system/menu/menu.service'

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(@Body() dto: CreateMenuDto) {
    await this.menuService.create(dto)
  }
}
