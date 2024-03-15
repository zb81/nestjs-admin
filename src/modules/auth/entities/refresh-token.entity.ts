import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { AccessTokenEntity } from '~/modules/auth/entities/access-token.entity'

@Entity('user_refresh_token')
export class RefreshTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 500 })
  value: string

  @CreateDateColumn({ comment: '令牌创建时间' })
  created_at!: Date

  @Column({ comment: '令牌过期时间' })
  expired_at!: Date

  @OneToOne(() => AccessTokenEntity, accessToken => accessToken.refreshToken, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'access_token_id' })
  accessToken: AccessTokenEntity
}
