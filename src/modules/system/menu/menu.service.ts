import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateMenuDto } from '~/modules/system/menu/menu.dto'
import { MenuEntity } from '~/modules/system/menu/menu.entity'

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {}

  async create(menu: CreateMenuDto) {
    await this.menuRepository.save(menu)
  }
}
