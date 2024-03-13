import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import { MenuEntity } from '~/modules/system/menu/menu.entity'
import { CreateRoleDto } from '~/modules/system/role/role.dto'
import { RoleEntity } from '~/modules/system/role/role.entity'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
    @InjectRepository(MenuEntity) private menuRepository: Repository<MenuEntity>,
  ) {}

  async create(dto: CreateRoleDto) {
    const { menuIds, ...data } = dto
    const role = await this.roleRepository.save({
      ...data,
      menus: menuIds
        ? (await this.menuRepository.findBy({ id: In(menuIds) }))
        : [],
    })
    return { roleId: role.id }
  }
}
