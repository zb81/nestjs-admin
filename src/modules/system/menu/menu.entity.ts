import { Column, Entity, Tree, TreeChildren, TreeParent } from 'typeorm'

import { BaseEntity } from '~/common/base.entity'

@Entity({ name: 'sys_menu' })
@Tree('materialized-path')
export class MenuEntity extends BaseEntity {
  @Column({ name: 'parent_id', nullable: true })
  parentId: number

  @Column()
  name: string

  @Column({ nullable: true })
  permission: string

  @Column({ type: 'tinyint', default: 0, comment: '菜单类型 0:目录 1:菜单 2:按钮' })
  type: number

  @Column({ nullable: true, default: '' })
  icon: string

  @Column({ name: 'order_no', type: 'int', default: 0 })
  orderNo: number

  @Column({ name: 'keep_alive', type: 'tinyint', default: 1, comment: '是否缓存 0:不缓存 1:缓存' })
  keepAlive: number

  @Column({ type: 'tinyint', default: 1, comment: '是否显示 0:不显示 1:显示' })
  show: number

  @Column({ type: 'tinyint', default: 1, comment: '状态 0:禁用 1:启用' })
  status: number

  @Column({ name: 'component', nullable: true })
  component: string

  @Column({ nullable: true })
  path: string

  @TreeChildren({ cascade: true })
  children: MenuEntity[]

  @TreeParent({ onDelete: 'SET NULL' })
  parent?: MenuEntity
}
