import { Body, Controller, Get, Headers, Ip, Patch, Post, Query } from '@nestjs/common'

import { Public } from '~/decorators/public.decorator'
import { CheckUsernameDto, LoginDto, RefreshDto, RegisterDto, ResetPasswordDto } from '~/modules/auth/auth.dto'
import { AuthService } from '~/modules/auth/auth.service'
import { CaptchaService } from '~/modules/auth/services/captcha.service'
import { MailerService } from '~/modules/shared/mailer/mailer.service'
import { UserService } from '~/modules/system/user/user.service'

@Controller('auth')
@Public()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly mailService: MailerService,
    private readonly captchaService: CaptchaService,
  ) { }

  @Post('login')
  async login(@Body() dto: LoginDto, @Ip() ip: string, @Headers('user-agent') ua: string) {
    const { key, code, username, password } = dto
    await this.captchaService.checkCaptchaImg(key, code)
    return await this.authService.login(username, password, ip, ua)
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    await this.mailService.checkCode(dto.email, dto.code)
    await this.userService.register(dto)
  }

  @Post('refresh')
  async refresh(@Body() { refreshToken }: RefreshDto) {
    return await this.authService.resignToken(refreshToken)
  }

  @Get('checkusername')
  async checkUsername(@Query() { username }: CheckUsernameDto) {
    return await this.authService.checkUsername(username)
  }

  @Patch('resetpassword')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    const { username, email, code, password } = dto
    await this.mailService.checkCode(email, code)
    await this.authService.checkUsernameAndEmail(username, email)
    await this.userService.resetPassword(username, password)
  }
}
