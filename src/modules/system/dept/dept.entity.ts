import { Column, Entity, OneToMany, Relation } from 'typeorm'

import { CommonEntity } from '~/common/base.entity'
import { UserEntity } from '~/modules/system/user/user.entity'

@Entity({ name: 'sys_dept' })
export class DeptEntity extends CommonEntity {
  @Column()
  name: string

  @Column({ name: 'order_no', default: 0 })
  orderNo: number

  @Column({ nullable: true })
  parentId: number

  @OneToMany(() => UserEntity, user => user.dept)
  users: Relation<UserEntity[]>
}
