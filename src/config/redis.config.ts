import { ConfigType, registerAs } from '@nestjs/config'

import { envNumber, envString } from './util'

export const RedisConfig = registerAs('redis', () => ({
  host: envString('REDIS_HOST'),
  port: envNumber('REDIS_PORT'),
  db: envNumber('REDIS_DB'),
  password: envString('REDIS_PASSWORD'),
}))

export type IRedisConfig = ConfigType<typeof RedisConfig>
