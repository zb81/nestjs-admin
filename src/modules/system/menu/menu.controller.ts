import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common'

import { IdParam } from '~/decorators/id-param.decorator'
import { QueryDeptDto } from '~/modules/system/dept/dept.dto'
import { CreateMenuDto, UpdateMenuDto } from '~/modules/system/menu/menu.dto'
import { MenuService } from '~/modules/system/menu/menu.service'

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('tree')
  async tree(@Query() dto: QueryDeptDto) {
    return await this.menuService.tree(dto.name)
  }

  @Post()
  async create(@Body() dto: CreateMenuDto) {
    await this.menuService.create(dto)
  }

  @Put(':id')
  async update(@IdParam() id: number, @Body() dto: UpdateMenuDto) {
    await this.menuService.update(id, dto)
  }
}
