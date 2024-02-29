import { Controller, Get, Query } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) { }

  @Get('config')
  getConfig(@Query('path') path: string): string {
    return this.configService.get(path)
  }
}
