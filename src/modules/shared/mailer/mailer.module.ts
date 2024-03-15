import { join } from 'node:path'

import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

import { IAppConfig, IMailerConfig } from '~/config'

import { MailerService } from './mailer.service'

@Global()
@Module({
  imports: [
    NestMailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: configService.get<IMailerConfig>('mailer'),
        defaults: {
          from: {
            name: configService.get<IAppConfig>('app').name,
            address: configService.get<IMailerConfig>('mailer').auth.user,
          },
        },
        template: {
          dir: join(__dirname, '..', '..', '..', '/assets/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule { }
