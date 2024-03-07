import { Body, Controller, Ip, Post } from '@nestjs/common'

import { MailerService } from '~/modules/shared/mailer/mailer.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly mailer: MailerService,
  ) {}

  @Post('email/send')
  async sendEmailCode(@Body() dto: { email: string }, @Ip() ip: string) {
    const { email } = dto
    await this.mailer.checkLimit(email, ip)
    const { code } = await this.mailer.sendVerificationCode(email)
    await this.mailer.log(email, code, ip)
  }
}
