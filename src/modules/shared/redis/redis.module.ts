import { Global, Inject, Module, OnApplicationShutdown } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'

import { IRedisConfig } from '~/config/redis.config'
import { REDIS_CLIENT_TOKEN } from '~/constants/provider-token'

import { RedisService } from './redis.service'

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: REDIS_CLIENT_TOKEN,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redis = new Redis({
          ...(configService.get<IRedisConfig>('redis')),
          lazyConnect: true,
        })
        await redis.connect()
        return redis
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule implements OnApplicationShutdown {
  @Inject(REDIS_CLIENT_TOKEN)
  private readonly redis: Redis

  onApplicationShutdown() {
    this.redis.disconnect()
  }
}
