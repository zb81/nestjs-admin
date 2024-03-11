import { randomUUID } from 'node:crypto'

import { Injectable } from '@nestjs/common'
import { create } from 'svg-captcha'

import { BizException } from '~/common/biz.exception'
import { BizError } from '~/constants/biz-error'
import { genCaptchaImgKey } from '~/constants/redis-key'
import { RedisService } from '~/modules/shared/redis/redis.service'

@Injectable()
export class CaptchaService {
  constructor(
    private readonly redis: RedisService,
  ) {}

  async genCaptchaImg() {
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

    // 图形验证码 1 分钟有效
    await this.redis.set(genCaptchaImgKey(res.id), svg.text, 60 * 1)
    return res
  }

  async checkCaptchaImg(id: string, code: string) {
    const key = genCaptchaImgKey(id)
    const res = await this.redis.get(key)
    if (res !== code)
      throw new BizException(BizError.WRONG_CODE)
    await this.redis.del(key)
  }
}
