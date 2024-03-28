import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Like, Repository } from 'typeorm'

import { BizException } from '~/common/biz.exception'
import { BizError } from '~/constants/biz-error'
import { createRepoPagination } from '~/helper/pagination'
import { MenuEntity } from '~/modules/system/menu/menu.entity'

import { RoleDto, RoleQueryDto } from './role.dto'
import { RoleEntity } from './role.entity'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
    @InjectRepository(MenuEntity) private menuRepository: Repository<MenuEntity>,
  ) {}

  async list(dto: RoleQueryDto) {
    const { name, status, sortField, sortOrder, pageNo, pageSize } = dto

    return await createRepoPagination({
      repository: this.roleRepository,
      pageNo,
      pageSize,
      where: { status, name: name ? Like(`%${name}%`) : undefined },
      order: {
        [sortField || 'id']: sortOrder || 'ASC',
      },
    })
  }

  async create(dto: RoleDto) {
    const { menuIds, ...data } = dto
    const role = await this.roleRepository.save({
      ...data,
      menus: menuIds
        ? (await this.menuRepository.findBy({ id: In(menuIds) }))
        : [],
    })
    return { roleId: role.id }
  }

  async getRolesByUserId(id: number) {
    const roles = await this.roleRepository.findBy({ users: { id } })
    if (roles && roles.length)
      return roles.map(r => ({ id: r.id, value: r.value }))
    return []
  }

  async deleteById(id: number) {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['users'],
    })
    if (role) {
      if (role.users.length)
        throw new BizException(BizError.ROLE_HAS_USER)
      await role.remove()
    }
  }
}
