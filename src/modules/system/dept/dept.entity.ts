import { Column, Entity, OneToMany, Relation, Tree, TreeChildren, TreeParent } from 'typeorm'

import { BaseEntity } from '~/common/base.entity'
import { UserEntity } from '~/modules/system/user/user.entity'

@Entity({ name: 'sys_dept' })
@Tree('materialized-path')
export class DeptEntity extends BaseEntity {
  @Column()
  name: string

  @Column({ default: 0 })
  orderNo: number

  @TreeChildren({ cascade: true })
  children: DeptEntity[]

  @TreeParent({ onDelete: 'SET NULL' })
  parent?: DeptEntity

  @OneToMany(() => UserEntity, user => user.dept)
  users: Relation<UserEntity[]>
}
