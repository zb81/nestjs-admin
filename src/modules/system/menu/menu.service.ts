import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, IsNull, Like, Not, Repository } from 'typeorm'

import { CommonStatus, ROOT_ROLE_ID } from '~/constants'

import { RoleService } from '~/modules/system/role/role.service'
import { buildTreeFromList } from '~/utils/tree'

import { MenuDto, MenuQueryDto } from './menu.dto'
import { MenuEntity } from './menu.entity'

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
    private readonly roleService: RoleService,
  ) { }

  async tree(dto: MenuQueryDto) {
    const { name, status, sortField, sortOrder } = dto

    const list = await this.menuRepository.find({
      where: { status, name: name ? Like(`%${name}%`) : undefined },
      order: {
        [sortField || 'id']: sortOrder || 'ASC',
      },
    })

    return buildTreeFromList(list)
  }

  async info(id: number) {
    return await this.menuRepository.findOneBy({ id })
  }

  async create(menu: MenuDto) {
    await this.menuRepository.save(menu)
  }

  async update(id: number, menu: MenuDto) {
    await this.menuRepository.update(id, menu)
  }

  async deleteByIds(ids: number[]) {
    await this.menuRepository.delete(ids)
  }

  async findChildren(id: number) {
    const children = await this.menuRepository.findBy({ parentId: id })
    const ret = [...children]
    for (const child of children) {
      const r = await this.findChildren(child.id)
      ret.push(...r)
    }
    return ret
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
