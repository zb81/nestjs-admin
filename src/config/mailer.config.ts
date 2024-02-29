import { ConfigType, registerAs } from '@nestjs/config'

import { envNumber, envString } from './util'

export const MailerConfig = registerAs('mailer', () => ({
  host: envString('MAILER_HOST'),
  port: envNumber('MAILER_PORT'),
  user: envString('MAILER_AUTH_USER'),
  pass: envString('MAILER_AUTH_PASS'),
}))

export type IMailerConfig = ConfigType<typeof MailerConfig>
