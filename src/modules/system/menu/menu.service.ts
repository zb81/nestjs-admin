import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateMenuDto } from '~/modules/system/menu/menu.dto'
import { MenuEntity } from '~/modules/system/menu/menu.entity'
import { buildTreeFromList } from '~/utils/tree'

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {}

  async tree(name?: string) {
    const list = await this.menuRepository
      .createQueryBuilder('menu')
      .where('menu.name like :name', { name: `%${name || ''}%` })
      .orderBy('menu.order_no', 'ASC')
      .getMany()
    return buildTreeFromList(list)
  }

  async create(menu: CreateMenuDto) {
    await this.menuRepository.save(menu)
  }
}
