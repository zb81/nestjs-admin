import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm'

import { CommonEntity } from '~/common/base.entity'
import { UserEntity } from '~/modules/system/user/user.entity'

@Entity('sys_login_log')
export class LoginLogEntity extends CommonEntity {
  @Column({ nullable: true })
  ip: string

  @Column({ nullable: true })
  address: string

  @Column({ nullable: true })
  provider: string

  @Column({ length: 500, nullable: true, comment: 'user-agent 请求头' })
  ua: string

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Relation<UserEntity>
}
