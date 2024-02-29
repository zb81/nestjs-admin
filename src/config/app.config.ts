import { ConfigType, registerAs } from '@nestjs/config'

import { envNumber, envString } from './util'

export const AppConfig = registerAs('app', () => ({
  name: envString('APP_NAME'),
  port: envNumber('APP_PORT'),
  globalPrefix: envString('APP_GLOBAL_PREFIX'),
}))

export type IAppConfig = ConfigType<typeof AppConfig>
