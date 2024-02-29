import { ConfigType, registerAs } from '@nestjs/config'

import { envNumber, envString } from './util'

export const LoggerConfig = registerAs('logger', () => ({
  level: envString('LOGGER_LEVEL'),
  maxFiles: envNumber('LOGGER_MAX_FILES'),
}))

export type ILoggerConfig = ConfigType<typeof LoggerConfig>
