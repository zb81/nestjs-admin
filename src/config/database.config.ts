import { ConfigType, registerAs } from '@nestjs/config'

import { envBoolean, envNumber, envString } from './util'

export const DatabaseConfig = registerAs('database', () => ({
  host: envString('DB_HOST'),
  port: envNumber('DB_PORT'),
  username: envString('DB_USERNAME'),
  password: envString('DB_PASSWORD'),
  database: envString('DB_DATABASE'),
  synchronize: envBoolean('DB_SYNCHRONIZE'),
}))

export type IDatabaseConfig = ConfigType<typeof DatabaseConfig>
