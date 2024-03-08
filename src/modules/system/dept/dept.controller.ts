import { Body, Controller, Get, Post, Query } from '@nestjs/common'

import { CreateDeptDto, QueryDeptDto } from '~/modules/system/dept/dept.dto'
import { DeptService } from '~/modules/system/dept/dept.service'

@Controller('dept')
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @Get('tree')
  async tree(@Query() dto: QueryDeptDto) {
    return await this.deptService.tree(dto.name)
  }

  @Post()
  async create(@Body() dto: CreateDeptDto) {
    await this.deptService.create(dto)
  }
}
