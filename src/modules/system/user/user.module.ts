import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from '~/modules/system/user/user.entity'
import { UserService } from '~/modules/system/user/user.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
}
