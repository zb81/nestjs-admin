import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import * as Joi from 'joi'

import { NestJSAdminConfigs } from '~/config'
import { LogInterceptor } from '~/interceptors/log.interceptor'
import { TransformInterceptor } from '~/interceptors/transform.interceptor'
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
  providers: [
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_INTERCEPTOR, useClass: LogInterceptor },
  ],
})
export class AppModule {}
