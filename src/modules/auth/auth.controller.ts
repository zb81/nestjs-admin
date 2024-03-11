import { Body, Controller, Get, Ip, Post, Query } from '@nestjs/common'

import { Public } from '~/decorators/public.decorator'
import { AuthService } from '~/modules/auth/auth.service'
import { CheckUsernameDto, LoginDto, RefreshDto, RegisterDto, SendEmailCodeDto } from '~/modules/auth/dto/auth.dto'
import { CaptchaService } from '~/modules/auth/services/captcha.service'
import { TokenService } from '~/modules/auth/services/token.service'
import { MailerService } from '~/modules/shared/mailer/mailer.service'
import { UserService } from '~/modules/system/user/user.service'

@Controller('auth')
@Public()
export class AuthController {
  constructor(
    private readonly mailer: MailerService,
    private readonly userService: UserService,
    private readonly captchaService: CaptchaService,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) { }

  @Post('email/code')
  async sendEmailCode(@Body() dto: SendEmailCodeDto, @Ip() ip: string) {
    const { email } = dto
    await this.mailer.checkLimit(email, ip)
    const { code } = await this.mailer.sendVerificationCode(email)
    await this.mailer.log(email, code, ip)
  }

  @Get('captcha/img')
  async imgCaptcha() {
    return await this.captchaService.genCaptchaImg()
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const { key, code, username, password } = dto
    await this.captchaService.checkCaptchaImg(key, code)
    return await this.authService.login(username, password)
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const { email, code } = dto
    await this.mailer.checkCode(email, code)
    await this.userService.register(dto)
  }

  @Post('refresh')
  async refresh(@Body() { refreshToken }: RefreshDto) {
    return await this.tokenService.refreshToken(refreshToken)
  }

  @Get('checkusername')
  async checkUsername(@Query() { username }: CheckUsernameDto) {
    return await this.authService.checkUsername(username)
  }
}
