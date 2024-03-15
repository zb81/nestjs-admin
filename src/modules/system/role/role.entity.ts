import { Column, Entity, JoinTable, ManyToMany, Relation } from 'typeorm'

import { CommonEntity } from '~/common/base.entity'
import { MenuEntity } from '~/modules/system/menu/menu.entity'
import { UserEntity } from '~/modules/system/user/user.entity'

@Entity({ name: 'sys_role' })
export class RoleEntity extends CommonEntity {
  @Column({ length: 50, unique: true, comment: '角色名' })
  name: string

  @Column({ unique: true, comment: '角色标识' })
  value: string

  @Column({ nullable: true })
  remark: string

  @Column({ type: 'tinyint', default: 1, comment: '状态：0-禁用 1-启用' })
  status: number

  @Column({ nullable: true, comment: '是否默认用户' })
  default: boolean

  @ManyToMany(() => MenuEntity, menu => menu.roles)
  @JoinTable({
    name: 'sys_role_menu',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'menu_id', referencedColumnName: 'id' },
  })
  menus: Relation<MenuEntity[]>

  @ManyToMany(() => UserEntity, user => user.roles)
  users: Relation<UserEntity[]>
}
