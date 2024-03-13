import { Controller, Get } from '@nestjs/common'

@Controller('account')
export class AccountController {
  @Get('info')
  getInfo() {
    return 'hello'
  }
}
