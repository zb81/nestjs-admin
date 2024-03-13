import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { EntityManager, Repository } from 'typeorm'

import { BizException } from '~/common/biz.exception'
import { CommonStatus } from '~/constants'
import { BizError } from '~/constants/biz-error'
import { RegisterDto } from '~/modules/auth/auth.dto'
import { UserEntity } from '~/modules/system/user/user.entity'
import { encryptPassword } from '~/utils/crypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) { }

  async register(dto: RegisterDto) {
    const { username, password, email } = dto
    const user = await this.userRepository.findOneBy({ username })
    if (user)
      throw new BizException(BizError.USER_EXISTS)

    await this.entityManager.transaction(async (manager) => {
      const pwd = await encryptPassword(password)
      const newUser = manager.create(UserEntity, {
        username,
        password: pwd,
        email,
        status: 1,
      })
      await manager.save(newUser)
    })
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOneBy({
      username,
      status: CommonStatus.ENABLE,
    })
  }

  async findByUsernameAndEmail(username: string, email: string) {
    return await this.userRepository.findOneBy({
      username,
      email,
      status: CommonStatus.ENABLE,
    })
  }

  async resetPassword(username: string, password: string) {
    const user = await this.userRepository.findOneBy({ username })
    user.password = await encryptPassword(password)
    await this.userRepository.save(user)
  }
}
