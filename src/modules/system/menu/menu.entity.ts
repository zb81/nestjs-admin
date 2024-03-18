import { Column, Entity, ManyToMany, Relation } from 'typeorm'

import { CommonEntity } from '~/common/base.entity'
import { RoleEntity } from '~/modules/system/role/role.entity'

@Entity({ name: 'sys_menu' })
export class MenuEntity extends CommonEntity {
  @Column({ name: 'parent_id', nullable: true })
  parentId: number

  @Column()
  name: string

  @Column({ nullable: true })
  permission: string

  @Column({ type: 'tinyint', comment: '菜单类型 0:目录 1:菜单 2:按钮' })
  type: number

  @Column({ nullable: true })
  icon: string

  @Column({ name: 'order_no', type: 'int' })
  orderNo: number

  @Column({ name: 'keep_alive', type: 'tinyint', default: 0, comment: '是否缓存 0:不缓存 1:缓存' })
  keepAlive: number

  @Column({ type: 'tinyint', default: 1, comment: '是否显示 0:不显示 1:显示' })
  show: number

  @Column({ type: 'tinyint', default: 1, comment: '状态 0:禁用 1:启用' })
  status: number

  @Column({ name: 'component', nullable: true })
  component: string

  @Column({ nullable: true })
  path: string

  @ManyToMany(() => RoleEntity, role => role.menus)
  roles: Relation<RoleEntity[]>
}
