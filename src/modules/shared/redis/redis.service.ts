import { Inject, Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'

import { REDIS_CLIENT_TOKEN } from '~/constants/provider-token'

@Injectable()
export class RedisService {
  @Inject(REDIS_CLIENT_TOKEN)
  private readonly redis: Redis

  async get(key: string) {
    return await this.redis.get(key)
  }

  async set(key: string, value: string | number, ttl?: number) {
    await this.redis.set(key, value)
    if (ttl)
      await this.redis.expire(key, ttl)
  }

  async del(key: string) {
    await this.redis.del(key)
  }
}
