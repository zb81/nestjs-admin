import { Module } from '@nestjs/common'

import { DatabaseModule } from './database/database.module'
import { LoggerModule } from './logger/logger.module'
import { RedisModule } from './redis/redis.module'

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    RedisModule,
  ],
})
export class SharedModule {}
