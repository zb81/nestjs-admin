import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { AuthController } from '~/modules/auth/auth.controller'
import { AuthService } from '~/modules/auth/auth.service'
import { CaptchaService } from '~/modules/auth/services/captcha.service'
import { TokenService } from '~/modules/auth/services/token.service'
import { JwtStrategy } from '~/modules/auth/strategies/jwt.strategy'
import { MenuModule } from '~/modules/system/menu/menu.module'
import { RoleModule } from '~/modules/system/role/role.module'
import { UserModule } from '~/modules/system/user/user.module'

@Module({
  imports: [
    UserModule,
    RoleModule,
    MenuModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [CaptchaService, AuthService, TokenService, JwtStrategy],
})
export class AuthModule { }
