import { Controller, Get } from '@nestjs/common'

import { Public } from '~/decorators/public.decorator'

import { CaptchaService } from '~/modules/auth/services/captcha.service'

@Controller('auth/captcha')
export class CaptchaController {
  constructor(
    private readonly captchaService: CaptchaService,
  ) {}

  @Get('img')
  @Public()
  async imgCaptcha() {
    return await this.captchaService.genCaptchaImg()
  }
}
