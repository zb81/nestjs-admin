import { Body, Controller, Ip, Post } from '@nestjs/common'

import { Public } from '~/decorators/public.decorator'
import { ForgetEmailCodeDto, RegisterEmailCodeDto } from '~/modules/auth/auth.dto'
import { AuthService } from '~/modules/auth/auth.service'
import { MailerService } from '~/modules/shared/mailer/mailer.service'

@Controller('auth/email')
export class EmailController {
  constructor(
    private readonly mailer: MailerService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('register')
  async sendRegisterEmailCode(@Body() dto: RegisterEmailCodeDto, @Ip() ip: string) {
    const { email } = dto
    await this.mailer.checkLimit(email, ip)
    const { code } = await this.mailer.sendVerificationCode(email)
    await this.mailer.log(email, code, ip)
  }

  @Public()
  @Post('resetpassword')
  async sendForgetEmailCode(@Body() dto: ForgetEmailCodeDto, @Ip() ip: string) {
    const { email, username } = dto
    await this.mailer.checkLimit(email, ip)
    await this.authService.checkUsernameAndEmail(username, email)
    const { code } = await this.mailer.sendVerificationCode(email)
    await this.mailer.log(email, code, ip)
  }
}
