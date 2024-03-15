import { randomUUID } from 'node:crypto'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import dayjs from 'dayjs'

import { ConfigInPath } from '~/config'
import { AccessTokenEntity } from '~/modules/auth/entities/access-token.entity'
import { RefreshTokenEntity } from '~/modules/auth/entities/refresh-token.entity'
import { RedisService } from '~/modules/shared/redis/redis.service'
import { RoleService } from '~/modules/system/role/role.service'
import { UserEntity } from '~/modules/system/user/user.entity'

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<ConfigInPath<'jwt'>>,
    private readonly redis: RedisService,
    private readonly roleService: RoleService,
  ) {}

  async genAccessToken(uid: number, roles: JwtRoleItem[]) {
    const payload: JwtPayload = { uid, roles, pv: 1 }

    const jwt = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt.secret'),
      expiresIn: this.configService.get('jwt.expiresIn'),
    })

    // accessToken 入库
    const accessToken = new AccessTokenEntity()
    accessToken.value = jwt
    accessToken.user = { id: uid } as UserEntity
    accessToken.expired_at = dayjs().add(this.configService.get('jwt.expiresIn'), 'second').toDate()
    await accessToken.save()

    // 生成 refreshToken 并入库
    const refreshToken = await this.genRefreshToken(accessToken, dayjs())

    return { accessToken: jwt, refreshToken }
  }

  async genRefreshToken(accessToken: AccessTokenEntity, now: dayjs.Dayjs) {
    const payload: JwtRefreshPayload = { uuid: randomUUID() }
    const refreshJwt = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('jwt.refreshExpiresIn'),
      secret: this.configService.get('jwt.refreshSecret'),
    })

    const refreshToken = new RefreshTokenEntity()
    refreshToken.value = refreshJwt
    refreshToken.accessToken = accessToken
    refreshToken.expired_at = now.add(this.configService.get('jwt.refreshExpiresIn'), 'second').toDate()
    await refreshToken.save()

    return refreshJwt
  }
}
