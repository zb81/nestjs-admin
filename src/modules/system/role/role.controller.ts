import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common'

import { IdParam } from '~/decorators/id-param.decorator'

import { RoleDto, RoleQueryDto } from './role.dto'
import { RoleService } from './role.service'

@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
  ) {}

  @Get()
  async list(@Query() dto: RoleQueryDto) {
    return await this.roleService.list(dto)
  }

  @Post()
  async create(@Body() dto: RoleDto) {
    await this.roleService.create(dto)
  }

  @Delete(':id')
  async delete(@IdParam() id: number) {
    return await this.roleService.deleteById(id)
  }
}
