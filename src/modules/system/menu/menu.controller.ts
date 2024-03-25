import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'

import { IdParam } from '~/decorators/id-param.decorator'
import { MenuDto, MenuQueryDto } from '~/modules/system/menu/menu.dto'
import { MenuService } from '~/modules/system/menu/menu.service'

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('tree')
  async tree(@Query() dto: MenuQueryDto) {
    return await this.menuService.tree(dto)
  }

  @Get(':id')
  async info(@IdParam() id: number) {
    return await this.menuService.info(id)
  }

  @Post()
  async create(@Body() dto: MenuDto) {
    await this.menuService.create(dto)
  }

  @Put(':id')
  async update(@IdParam() id: number, @Body() dto: MenuDto) {
    await this.menuService.update(id, dto)
  }

  @Delete(':id')
  async delete(@IdParam() id: number) {
    const children = await this.menuService.findChildren(id)
    await this.menuService.deleteByIds([id, ...children.map(c => c.id)])
  }
}
