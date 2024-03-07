import { randomUUID } from 'node:crypto'

import { Body, Controller, Get, Ip, Post } from '@nestjs/common'
import { create } from 'svg-captcha'

import { genCaptchaImgKey } from '~/constants/redis-key'
import { MailerService } from '~/modules/shared/mailer/mailer.service'
import { RedisService } from '~/modules/shared/redis/redis.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly mailer: MailerService,
    private readonly redis: RedisService,
  ) {}

  @Post('email/send')
  async sendEmailCode(@Body() dto: { email: string }, @Ip() ip: string) {
    const { email } = dto
    await this.mailer.checkLimit(email, ip)
    const { code } = await this.mailer.sendVerificationCode(email)
    await this.mailer.log(email, code, ip)
  }

  @Get('captcha/img')
  async imgCaptcha() {
    const svg = create({
      size: 4,
      color: true,
      noise: 4,
      width: 100,
      height: 50,
      charPreset: '0123456789',
    })

    const res = {
      img: `data:image/svg+xml;base64,${Buffer.from(svg.data).toString('base64')}`,
      id: randomUUID(),
    }

    await this.redis.set(genCaptchaImgKey(res.id), svg.text, 60 * 5)
    return res
  }
}
