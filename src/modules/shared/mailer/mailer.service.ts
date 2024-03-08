import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MailerService as NestMailerService } from '@nestjs-modules/mailer'

import { BizException } from '~/common/biz.exception'
import { ConfigInPath } from '~/config'
import { BizError } from '~/constants/biz-error'
import { genEmailCodeKey, genEmailIpCountKey, genEmailIpForbiddenKey, genEmailToCountKey, genEmailToForbiddenKey } from '~/constants/redis-key'
import { RedisService } from '~/modules/shared/redis/redis.service'
import { randomValue } from '~/utils'
import { getRemainSeconds } from '~/utils/date-time'

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name)

  constructor(
    private mailerService: NestMailerService,
    private configService: ConfigService<ConfigInPath<'app'>>,
    private redis: RedisService,
  ) { }

  async log(to: string, code: string, ip: string) {
    await this.redis.set(genEmailCodeKey(to), code, 60 * 10)
    await this.redis.set(genEmailIpForbiddenKey(ip), 1, 60)
    await this.redis.set(genEmailToForbiddenKey(to), 1, 60)

    // 更新计数
    const ipCountKey = genEmailIpCountKey(ip)
    const toCountKey = genEmailToCountKey(to)
    let ipCount: number | string = await this.redis.get(ipCountKey)
    ipCount = ipCount ? Number(ipCount) : 0
    let toCount: number | string = await this.redis.get(toCountKey)
    toCount = toCount ? Number(toCount) : 0
    await this.redis.set(ipCountKey, ipCount + 1, getRemainSeconds())
    await this.redis.set(toCountKey, toCount + 1, getRemainSeconds())
  }

  async checkLimit(to: string, ip: string) {
    // 同一 IP / 邮箱，60 秒内只能发送一次
    const ipForbidden = await this.redis.get(genEmailIpForbiddenKey(ip))
    if (ipForbidden)
      throw new BizException(BizError.EMAIL_FORBIDDEN)
    const toForbidden = await this.redis.get(genEmailToForbiddenKey(to))
    if (toForbidden)
      throw new BizException(BizError.EMAIL_FORBIDDEN)

    // 同一 IP / 邮箱，每天最多发送 5 次
    const LIMIT = 5
    const ipCountKey = genEmailIpCountKey(ip)
    const toCountKey = genEmailToCountKey(to)
    let ipCount: number | string = await this.redis.get(ipCountKey)
    ipCount = ipCount ? Number(ipCount) : 0
    if (ipCount >= LIMIT)
      throw new BizException(BizError.EMAIL_LIMIT)
    let toCount: number | string = await this.redis.get(toCountKey)
    toCount = toCount ? Number(toCount) : 0
    if (toCount >= LIMIT)
      throw new BizException(BizError.EMAIL_LIMIT)
  }

  async send(to: string, subject: string, content: string, type: 'text' | 'html' = 'text'): Promise<any> {
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

  async checkCode(to: string, code: string) {
    const key = genEmailCodeKey(to)
    const res = await this.redis.get(key)
    if (res !== code)
      throw new BizException(BizError.WRONG_CODE)

    await this.redis.del(key)
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
