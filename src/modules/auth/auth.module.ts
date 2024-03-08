import { Module } from '@nestjs/common'

import { UserModule } from '~/modules/system/user/user.module'

import { AuthController } from './controllers/auth.controller'

@Module({
  imports: [UserModule],
  controllers: [AuthController],
})
export class AuthModule { }
