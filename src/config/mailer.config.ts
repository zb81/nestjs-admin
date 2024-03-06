import { ConfigType, registerAs } from '@nestjs/config'

import { envNumber, envString } from './util'

export const MailerConfig = registerAs('mailer', () => ({
  host: envString('SMTP_HOST'),
  port: envNumber('SMTP_PORT'),
  ignoreTLS: true,
  secure: true,
  auth: {
    user: envString('SMTP_USER'),
    pass: envString('SMTP_PASS'),
  },
}))

export type IMailerConfig = ConfigType<typeof MailerConfig>
