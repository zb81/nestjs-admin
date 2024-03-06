import { Module } from '@nestjs/common'

import { DatabaseModule } from './database/database.module'
import { LoggerModule } from './logger/logger.module'

@Module({
  imports: [LoggerModule, DatabaseModule],
})
export class SharedModule {}
