import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { BizException } from '~/common/biz.exception'

import { ConfigInPath } from '~/config'
import { BizError } from '~/constants/biz-error'
import { genAuthAccessTokenKey, genAuthInvalidTokenKey, genAuthRefreshTokenKey } from '~/constants/redis-key'
import { RedisService } from '~/modules/shared/redis/redis.service'
import { RoleService } from '~/modules/system/role/role.service'

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<ConfigInPath<'jwt'>>,
    private readonly redis: RedisService,
    private readonly roleService: RoleService,
  ) {}

  get accessTokenOptions() {
    return {
      secret: this.configService.get('jwt.secret'),
      expiresIn: this.configService.get('jwt.expiresIn'),
    }
  }

  get refreshTokenOptions() {
    return {
      secret: this.configService.get('jwt.refreshSecret'),
      expiresIn: this.configService.get('jwt.refreshExpiresIn'),
    }
  }

  async genAccessToken(uid: number) {
    const roleItems = await this.roleService.getRolesByUserId(uid)
    const payload: JwtPayload = {
      uid,
      roleValues: roleItems.map(r => r.value),
      roleIds: roleItems.map(r => r.id),
      pv: 1,
    }
    const accessToken = await this.jwtService.signAsync(payload, this.accessTokenOptions)
    await this.redis.set(genAuthAccessTokenKey(uid), accessToken, this.accessTokenOptions.expiresIn)
    const refreshToken = await this.genRefreshToken(uid)
    return { accessToken, refreshToken }
  }

  async genRefreshToken(uid: number) {
    const payload: JwtRefreshPayload = { uid }
    const refreshToken = await this.jwtService.signAsync(payload, this.refreshTokenOptions)
    await this.redis.set(genAuthRefreshTokenKey(uid), refreshToken, this.refreshTokenOptions.expiresIn)
    return refreshToken
  }

  async resignToken(refreshToken: string) {
    const { uid }: JwtRefreshPayload = await this.jwtService.verifyAsync(refreshToken, this.refreshTokenOptions)

    const redisRefreshToken = await this.redis.get(genAuthRefreshTokenKey(uid))
    const invalid = await this.redis.get(genAuthInvalidTokenKey(refreshToken))
    if (!redisRefreshToken || invalid)
      throw new BizException(BizError.INVALID_LOGIN)

    this.redis.del(genAuthRefreshTokenKey(uid))
    this.redis.del(genAuthAccessTokenKey(uid))

    await this.redis.set(genAuthInvalidTokenKey(refreshToken), refreshToken, this.refreshTokenOptions.expiresIn)

    return await this.genAccessToken(uid)
  }
}
