import { Column, Entity } from 'typeorm'

import { BaseEntity } from '~/common/base.entity'

@Entity({ name: 'sys_role' })
export class RoleEntity extends BaseEntity {
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
}
