import { Exclude } from 'class-transformer'
import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm'

import { BaseEntity } from '~/common/base.entity'
import { DeptEntity } from '~/modules/system/dept/dept.entity'

@Entity({ name: 'sys_user' })
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  username: string

  @Exclude()
  @Column()
  password: string

  @Column({ nullable: true })
  nickname: string

  @Column({ nullable: true })
  avatar: string

  @Column({ nullable: true })
  email: string

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  remark: string

  @Column({ type: 'tinyint', default: 1 })
  status: number

  @ManyToOne(() => DeptEntity, dept => dept.users)
  @JoinColumn({ name: 'dept_id' })
  dept: Relation<DeptEntity>
}
