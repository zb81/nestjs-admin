import { Controller, Get, Ip, Query } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { LoggerService } from '~/modules/shared/logger/logger.service'

@Controller()
export class AppController {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) { }

  @Get('config')
  getConfig(@Query('path') path: string, @Ip() ip: string): string {
    this.logger.log(`getConfig from ${ip}: ${path}`, AppController.name)
    return this.configService.get(path)
  }
}
