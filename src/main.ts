import { HttpStatus, Logger, UnprocessableEntityException, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { IAppConfig } from '~/config'
import { LoggerService } from '~/modules/shared/logger/logger.service'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    snapshot: true,
  })

  const configService = app.get(ConfigService)
  const { port, globalPrefix } = configService.get<IAppConfig>('app')

  app.setGlobalPrefix(globalPrefix)

  // 全局校验
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    transformOptions: { enableImplicitConversion: true },
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    stopAtFirstError: true,
    exceptionFactory: errors => new UnprocessableEntityException(
      errors.map((e) => {
        const rule = Object.keys(e.constraints!)[0]
        const msg = e.constraints![rule]
        return msg
      })[0],
    ),
  }))

  await app.listen(port, () => {
    app.useLogger(app.get(LoggerService))

    const logger = new Logger('NestJS Admin')
    logger.log(`🚀 Listening at http://localhost:${port}${globalPrefix}`)
  })
}

bootstrap()
