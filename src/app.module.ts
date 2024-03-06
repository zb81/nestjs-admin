import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'

import { NestJSAdminConfigs } from '~/config'
import { DatabaseModule } from '~/modules/shared/database/database.module'
import { SharedModule } from '~/modules/shared/shared.module'

import { AppController } from './app.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required().valid('development', 'production'),
      }),
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      load: NestJSAdminConfigs,
    }),
    SharedModule,
    DatabaseModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
