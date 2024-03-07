import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'

import { NestJSAdminConfigs } from '~/config'
import { AuthModule } from '~/modules/auth/auth.module'
import { SharedModule } from '~/modules/shared/shared.module'

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

    AuthModule,
  ],
})
export class AppModule {}
