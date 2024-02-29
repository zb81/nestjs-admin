import { ConfigType, registerAs } from '@nestjs/config'

import { envNumber, envString } from './util'

export const JwtConfig = registerAs('jwt', () => ({
  secret: envString('JWT_SECRET'),
  expiresIn: envNumber('JWT_EXPIRES_IN'),
  refreshSecret: envString('JWT_REFRESH_SECRET'),
  refreshExpiresIn: envNumber('JWT_REFRESH_EXPIRES_IN'),
}))

export type IJwtConfig = ConfigType<typeof JwtConfig>
