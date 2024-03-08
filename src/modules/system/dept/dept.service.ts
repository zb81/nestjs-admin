import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateDeptDto } from '~/modules/system/dept/dept.dto'
import { DeptEntity } from '~/modules/system/dept/dept.entity'
import { buildTreeFromList } from '~/utils/tree'

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(DeptEntity)
    private readonly deptRepository: Repository<DeptEntity>,
  ) {}

  async tree(name?: string) {
    const list = await this.deptRepository
      .createQueryBuilder('dept')
      .where('dept.name like :name', { name: `%${name || ''}%` })
      .orderBy('dept.order_no', 'ASC')
      .getMany()
    return buildTreeFromList(list)
  }

  async create(dto: CreateDeptDto) {
    await this.deptRepository.save(dto)
  }
}
