import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DeptEntity } from '~/modules/system/dept/dept.entity'
import { DeptService } from '~/modules/system/dept/dept.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([DeptEntity]),
  ],
  providers: [DeptService],
})
export class DeptModule {}
