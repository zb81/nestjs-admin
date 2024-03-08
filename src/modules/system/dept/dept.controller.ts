import { Body, Controller, Get, Post } from '@nestjs/common'

import { CreateDeptDto } from './dept.dto'
import { DeptService } from './dept.service'

@Controller('dept')
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @Get('tree')
  async tree() {
    return await this.deptService.tree()
  }

  @Post()
  async create(@Body() dto: CreateDeptDto) {
    await this.deptService.create(dto)
  }
}
