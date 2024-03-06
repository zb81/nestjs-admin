import { Module } from '@nestjs/common'

import { DatabaseModule } from './database/database.module'
import { LoggerModule } from './logger/logger.module'
import { MailerModule } from './mailer/mailer.module'
import { RedisModule } from './redis/redis.module'

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    RedisModule,
    MailerModule,
  ],
})
export class SharedModule {}
