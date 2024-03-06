import { Inject, Injectable, Logger } from '@nestjs/common'
import { Redis } from 'ioredis'

import { REDIS_CLIENT_TOKEN } from '~/constants/provider-token'

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name)

  @Inject(REDIS_CLIENT_TOKEN)
  private readonly redis: Redis

  async get(key: string) {
    this.logger.debug(`Get ${key}`)
    return await this.redis.get(key)
  }

  async set(key: string, value: string | number, ttl?: number) {
    this.logger.debug(`Set ${key}: ${value}`)
    await this.redis.set(key, value)

    if (ttl)
      await this.redis.expire(key, ttl)
  }
}
