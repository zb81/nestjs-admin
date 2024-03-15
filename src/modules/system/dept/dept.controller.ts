import { Body, Controller, Get, Post, Query } from '@nestjs/common'

import { Permission, definePermissionGroup } from '~/decorators/permission.decorator'

import { CreateDeptDto, QueryDeptDto } from '~/modules/system/dept/dept.dto'
import { DeptService } from '~/modules/system/dept/dept.service'

const pg = definePermissionGroup('system:dept', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
} as const)

@Controller('dept')
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @Get('tree')
  @Permission(pg.LIST)
  async tree(@Query() dto: QueryDeptDto) {
    return await this.deptService.tree(dto.name)
  }

  @Post()
  @Permission(pg.CREATE)
  async create(@Body() dto: CreateDeptDto) {
    await this.deptService.create(dto)
  }
}
