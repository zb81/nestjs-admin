import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { IAppConfig } from '~/config/app.config'
import { LoggerService } from '~/modules/shared/logger/logger.service'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)
  const { port, globalPrefix } = configService.get<IAppConfig>('app')

  app.setGlobalPrefix(globalPrefix)

  await app.listen(port, () => {
    app.useLogger(app.get(LoggerService))

    const logger = new Logger('NestJS Admin')
    logger.log(`🚀 Listening at http://localhost:${port}${globalPrefix}`)
  })
}

bootstrap()
