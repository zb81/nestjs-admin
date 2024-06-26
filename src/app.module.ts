import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import * as Joi from 'joi'

import { NestJSAdminConfigs } from '~/config'
import { ExceptionsFilter } from '~/filters/exception.filter'
import { LogInterceptor } from '~/interceptors/log.interceptor'
import { TransformInterceptor } from '~/interceptors/transform.interceptor'
import { AuthModule } from '~/modules/auth/auth.module'
import { JwtAuthGuard } from '~/modules/auth/guards/jwt-auth.guard'
import { RbacGuard } from '~/modules/auth/guards/rbac.guard'
import { SharedModule } from '~/modules/shared/shared.module'
import { SystemModule } from '~/modules/system/system.module'

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
    SystemModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: ExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_INTERCEPTOR, useClass: LogInterceptor },

    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RbacGuard },
  ],
})
export class AppModule {}
