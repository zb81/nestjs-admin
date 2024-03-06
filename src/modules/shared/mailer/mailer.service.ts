import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MailerService as NestMailerService } from '@nestjs-modules/mailer'

import { ConfigInPath } from '~/config'
import { randomValue } from '~/utils'

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name)

  constructor(
    private mailerService: NestMailerService,
    private configService: ConfigService<ConfigInPath<'app'>>,
  ) { }

  async send(
    to: string,
    subject: string,
    content: string,
    type: 'text' | 'html' = 'text',
  ): Promise<any> {
    if (type === 'text') {
      return this.mailerService.sendMail({
        to,
        subject,
        text: content,
      })
    }
    else {
      return this.mailerService.sendMail({
        to,
        subject,
        html: content,
      })
    }
  }

  async sendVerificationCode(to: string, code = randomValue(6, '1234567890')) {
    const subject = `[${this.configService.get('app.name')}] 验证码`

    try {
      await this.mailerService.sendMail({
        to,
        subject,
        template: './verification-code',
        context: { code },
      })
      this.logger.log(`✅ Verification code sent to ${to}.`)
    }
    catch (error) {
      this.logger.error(error)
    }

    return { to, code }
  }
}
