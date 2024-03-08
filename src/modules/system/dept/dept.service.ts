import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TreeRepository } from 'typeorm'

import { shakeTree } from '~/utils/tree'

import { CreateDeptDto } from './dept.dto'
import { DeptEntity } from './dept.entity'

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(DeptEntity)
    private readonly deptRepository: TreeRepository<DeptEntity>,
  ) {}

  async tree(name?: string) {
    if (name) {
      const tree: DeptEntity[] = []
      const list = await this.deptRepository.createQueryBuilder('dept')
        .where('dept.name like :name', { name: `%${name}%` })
        .getMany()

      for (const d of list)
        tree.push(await this.deptRepository.findDescendantsTree(d))

      shakeTree(tree)
      return tree
    }

    const deptTree = await this.deptRepository.findTrees({
      depth: 2,
      relations: ['parent'],
    })

    shakeTree(deptTree)

    return deptTree
  }

  async create(dto: CreateDeptDto) {
    const parent = await this.deptRepository.findOneBy({ id: dto.parentId })
    await this.deptRepository.save({
      ...dto,
      parent,
    })
  }
}
