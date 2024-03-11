import { randomUUID } from 'node:crypto'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { BizException } from '~/common/biz.exception'
import { ConfigInPath } from '~/config'
import { BizError } from '~/constants/biz-error'
import { genRefreshTokenIdKey } from '~/constants/redis-key'
import { RedisService } from '~/modules/shared/redis/redis.service'

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<ConfigInPath<'jwt'>>,
    private readonly redis: RedisService,
  ) {}

  genAccessToken(uid: number) {
    const refreshToken = this.genRefreshToken(uid)
    const payload: JwtPayload = {
      uid,
      roles: [],
      pv: 1,
    }
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.secret'),
      expiresIn: this.configService.get('jwt.expiresIn'),
    })
    return { accessToken, refreshToken }
  }

  genRefreshToken(uid: number) {
    const refreshId = randomUUID()
    const payload: JwtRefreshPayload = {
      refreshId,
      uid,
    }
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('jwt.refreshExpiresIn'),
      secret: this.configService.get('jwt.refreshSecret'),
    })
    this.redis.set(
      genRefreshTokenIdKey(uid, refreshId),
      refreshToken,
      this.configService.get('jwt.refreshExpiresIn'),
    )
    return refreshToken
  }

  async checkRefreshToken(token: string) {
    let res: JwtRefreshPayload
    try {
      res = this.jwtService.verify(token, { secret: this.configService.get('jwt.refreshSecret') })
    }
    catch {
      throw new BizException(BizError.INVALID_REFRESH_TOKEN)
    }

    const { uid, refreshId } = res
    const k = await this.redis.get(genRefreshTokenIdKey(uid, refreshId))
    if (k !== token)
      throw new BizException(BizError.INVALID_REFRESH_TOKEN)

    return res
  }

  async refreshToken(refreshToken: string) {
    const { uid, refreshId } = await this.checkRefreshToken(refreshToken)
    await this.redis.del(genRefreshTokenIdKey(uid, refreshId))
    return this.genAccessToken(uid)
  }
}
