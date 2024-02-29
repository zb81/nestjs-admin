import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { IAppConfig } from '~/config/app.config'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)
  const { port, globalPrefix } = configService.get<IAppConfig>('app')

  app.setGlobalPrefix(globalPrefix)

  await app.listen(port)
}

bootstrap()
