import { AppConfig } from './app.config'
import type { IAppConfig } from './app.config'

import { DatabaseConfig } from './database.config'
import type { IDatabaseConfig } from './database.config'

import { JwtConfig } from './jwt.config'
import type { IJwtConfig } from './jwt.config'

import { LoggerConfig } from './logger.config'
import type { ILoggerConfig } from './logger.config'

import { MailerConfig } from './mailer.config'
import type { IMailerConfig } from './mailer.config'

import { RedisConfig } from './redis.config'
import type { IRedisConfig } from './redis.config'

import { SwaggerConfig } from './swagger.config'
import type { ISwaggerConfig } from './swagger.config'

interface Namespaces {
  app: IAppConfig
  database: IDatabaseConfig
  redis: IRedisConfig
  mailer: IMailerConfig
  logger: ILoggerConfig
  jwt: IJwtConfig
  swagger: ISwaggerConfig
}

export const NestJSAdminConfigs = [
  AppConfig,
  DatabaseConfig,
  RedisConfig,
  MailerConfig,
  JwtConfig,
  LoggerConfig,
  SwaggerConfig,
]

export type ConfigInPath<N extends keyof Namespaces> = {
  [K in keyof Namespaces[N]as K extends string ? `${N}.${K}` : never]: Namespaces[N][K]
}
