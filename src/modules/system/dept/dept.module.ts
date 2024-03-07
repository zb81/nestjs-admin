import { Module } from '@nestjs/common'

import { DeptService } from '~/modules/system/dept/dept.service'

@Module({
  providers: [DeptService],
})
export class DeptModule {}
