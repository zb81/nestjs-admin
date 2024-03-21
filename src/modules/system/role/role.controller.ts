import { Body, Controller, Get, Post } from '@nestjs/common'

import { CreateRoleDto } from '~/modules/system/role/role.dto'
import { RoleService } from '~/modules/system/role/role.service'

@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
  ) {}

  @Get()
  async list() {
    return await this.roleService.list()
  }

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    await this.roleService.create(dto)
  }
}
