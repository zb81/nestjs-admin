import { ConfigType, registerAs } from '@nestjs/config'

import { envBoolean, envString } from './util'

export const SwaggerConfig = registerAs('swagger', () => ({
  path: envString('SWAGGER_PATH'),
  enable: envBoolean('SWAGGER_ENABLE'),
}))

export type ISwaggerConfig = ConfigType<typeof SwaggerConfig>
