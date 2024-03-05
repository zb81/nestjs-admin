import { Module } from '@nestjs/common'

import { LoggerModule } from '~/modules/shared/logger/logger.module'

@Module({
  imports: [LoggerModule],
})
export class SharedModule {}
