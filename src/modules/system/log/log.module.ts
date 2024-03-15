import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LoginLogEntity } from '~/modules/system/log/entities/login-log.entity'
import { LogController } from '~/modules/system/log/log.controller'
import { LoginLogService } from '~/modules/system/log/services/login-log.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([LoginLogEntity]),
  ],
  providers: [LoginLogService],
  controllers: [LogController],
  exports: [LoginLogService],
})
export class LogModule {}
