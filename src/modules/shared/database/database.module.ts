import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LoggerOptions } from 'typeorm'

import { IDatabaseConfig } from '~/config/database.config'
import { envString } from '~/config/util'

import { TypeOrmLogger } from './typeorm-logger'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        let loggerOptions: LoggerOptions = envString('DB_LOGGING') as 'all'
        try {
          loggerOptions = JSON.parse(loggerOptions)
        }
        catch { }

        return {
          type: 'mysql',
          ...configService.get<IDatabaseConfig>('database'),
          autoLoadEntities: true,
          logging: loggerOptions,
          logger: new TypeOrmLogger(loggerOptions),
        }
      },
    }),
  ],
})
export class DatabaseModule { }
