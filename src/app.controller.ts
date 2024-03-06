import { Controller, Get, Ip, Query } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { RedisService } from '~/modules/shared/redis/redis.service'

@Controller()
export class AppController {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) { }

  @Get('config')
  getConfig(@Query('path') path: string, @Ip() ip: string): string {
    return this.configService.get(path)
  }

  @Get('foo')
  async foo() {
    await this.redisService.set('foo', 'asdfasdf', 5)
    return { msg: 'ok' }
  }
}
