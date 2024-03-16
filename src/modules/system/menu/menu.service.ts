import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, IsNull, Not, Repository } from 'typeorm'

import { CommonStatus, ROOT_ROLE_ID } from '~/constants'

import { CreateMenuDto } from '~/modules/system/menu/menu.dto'
import { MenuEntity } from '~/modules/system/menu/menu.entity'
import { RoleService } from '~/modules/system/role/role.service'
import { buildTreeFromList } from '~/utils/tree'

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
    private readonly roleService: RoleService,
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

  async getPermissionsByUserId(uid: number) {
    const roles = await this.roleService.getRolesByUserId(uid)
    if (!roles || !roles.length)
      return []

    const roleIds = roles.map(r => r.id)
    if (roleIds.includes(ROOT_ROLE_ID)) {
      const menus = await this.menuRepository.findBy({
        permission: Not(IsNull()),
        type: In([1, 2]),
      })
      return Array.from(new Set(menus.map(m => m.permission)))
    }

    const menus = await this.menuRepository.findBy({ roles: { id: In(roleIds) } })
    return Array.from(new Set(menus.map(m => m.permission)))
  }

  async getMenusByRoleIds(roleIds: number[]) {
    if (!roleIds || !roleIds.length)
      return []

    let menus: MenuEntity[]
    if (roleIds.includes(ROOT_ROLE_ID)) {
      menus = await this.menuRepository.find({
        where: { type: In([0, 1]) },
        order: { orderNo: 'ASC' },
      })
    }
    else {
      menus = await this.menuRepository
        .createQueryBuilder('menu')
        .innerJoin('menu.roles', 'role')
        .andWhere('menu.type IN (:...types)', { types: [0, 1] })
        .andWhere('menu.status = :status', { status: CommonStatus.ENABLE })
        .andWhere('role.id IN (:...roleIds)', { roleIds })
        .orderBy('menu.order_no', 'ASC')
        .getMany()
    }

    return buildTreeFromList(menus)
  }

  async getPermissionsByRoleIds(roleIds: number[]) {
    if (!roleIds || !roleIds.length)
      return []

    const result = await this.menuRepository.createQueryBuilder('menu')
      .innerJoin('menu.roles', 'role')
      .andWhere('menu.type = :type', { type: 2 })
      .andWhere('role.id IN (:...roleIds)', { roleIds })
      .andWhere('menu.permission IS NOT NULL')
      .getMany()

    if (result && result.length)
      return Array.from(new Set(result.map(m => m.permission)))
    return []
  }
}
