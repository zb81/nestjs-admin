import { Body, Controller, Post } from '@nestjs/common'

import { Public } from '~/decorators/public.decorator'
import { CreateRoleDto } from '~/modules/system/role/role.dto'
import { RoleService } from '~/modules/system/role/role.service'

@Controller('role')
@Public()
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
  ) {}

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto)
  }
}
