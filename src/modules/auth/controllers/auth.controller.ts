import { randomUUID } from 'node:crypto'

import { Body, Controller, Get, Ip, Post } from '@nestjs/common'
import { create } from 'svg-captcha'

import { genCaptchaImgKey } from '~/constants/redis-key'
import { RegisterDto, SendEmailCodeDto } from '~/modules/auth/dto/auth.dto'
import { MailerService } from '~/modules/shared/mailer/mailer.service'
import { RedisService } from '~/modules/shared/redis/redis.service'
import { UserService } from '~/modules/system/user/user.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly mailer: MailerService,
    private readonly redis: RedisService,
    private readonly userService: UserService,
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

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const { email, code } = dto
    await this.mailer.checkCode(email, code)
    await this.userService.register(dto)
  }
}
