import { Body, Controller, Get, Ip, Patch, Post, Query } from '@nestjs/common'

import { Public } from '~/decorators/public.decorator'
import { AuthService } from '~/modules/auth/auth.service'
import { CheckUsernameDto, ForgetEmailCodeDto, LoginDto, RefreshDto, RegisterDto, RegisterEmailCodeDto, ResetPasswordDto } from '~/modules/auth/dto/auth.dto'
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

  @Post('email/code/register')
  async sendRegisterEmailCode(@Body() dto: RegisterEmailCodeDto, @Ip() ip: string) {
    const { email } = dto
    await this.mailer.checkLimit(email, ip)
    const { code } = await this.mailer.sendVerificationCode(email)
    await this.mailer.log(email, code, ip)
  }

  @Post('email/code/forget')
  async sendForgetEmailCode(@Body() dto: ForgetEmailCodeDto, @Ip() ip: string) {
    const { email, username } = dto
    await this.mailer.checkLimit(email, ip)
    await this.authService.checkUsernameAndEmail(username, email)
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

  @Patch('resetpassword')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    const { username, email, code, password } = dto
    await this.authService.checkUsernameAndEmail(username, email)
    await this.mailer.checkCode(email, code)
    await this.userService.resetPassword(username, password)
  }
}
