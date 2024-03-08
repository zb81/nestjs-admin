import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { ConfigInPath } from '~/config'
import { AuthController } from '~/modules/auth/auth.controller'
import { AuthService } from '~/modules/auth/auth.service'
import { CaptchaService } from '~/modules/auth/services/captcha.service'
import { TokenService } from '~/modules/auth/services/token.service'
import { UserModule } from '~/modules/system/user/user.module'
import { isDev } from '~/utils'

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigInPath<'jwt'>>) => {
        return {
          secret: configService.get('jwt.secret'),
          signOptions: {
            expiresIn: configService.get('jwt.expiresIn'),
          },
          verifyOptions: {
            ignoreExpiration: isDev,
          },
        }
      },
    }),
  ],
  controllers: [AuthController],
  providers: [CaptchaService, AuthService, TokenService],
})
export class AuthModule { }
