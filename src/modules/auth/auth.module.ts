import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { AuthController } from '~/modules/auth/auth.controller'
import { AuthService } from '~/modules/auth/auth.service'
import { CaptchaController } from '~/modules/auth/controllers/captcha.controller'
import { EmailController } from '~/modules/auth/controllers/email.controller'
import { CaptchaService } from '~/modules/auth/services/captcha.service'
import { TokenService } from '~/modules/auth/services/token.service'
import { JwtStrategy } from '~/modules/auth/strategies/jwt.strategy'
import { LogModule } from '~/modules/system/log/log.module'
import { MenuModule } from '~/modules/system/menu/menu.module'
import { RoleModule } from '~/modules/system/role/role.module'
import { UserModule } from '~/modules/system/user/user.module'

@Module({
  imports: [
    UserModule,
    RoleModule,
    MenuModule,
    LogModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController, EmailController, CaptchaController],
  providers: [CaptchaService, AuthService, TokenService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
