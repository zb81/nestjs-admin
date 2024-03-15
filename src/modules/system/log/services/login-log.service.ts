import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { LoginLogEntity } from '~/modules/system/log/entities/login-log.entity'
import { getIpAddress } from '~/utils/ip'

@Injectable()
export class LoginLogService {
  constructor(
    @InjectRepository(LoginLogEntity)
    private readonly loginLogRepository: Repository<LoginLogEntity>,
  ) {}

  async create(uid: number, ip: string, ua: string) {
    const address = await getIpAddress(ip)
    await this.loginLogRepository.save({ ip, ua, address, user: { id: uid } })
  }
}
