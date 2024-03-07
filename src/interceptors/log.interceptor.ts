import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Request } from 'express'
import { Observable, tap } from 'rxjs'

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LogInterceptor.name)

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>()
    const isSse = request.headers.accept === 'text/event-stream'
    if (isSse)
      return next.handle()

    const content = `${request.method} ${request.url}`
    this.logger.debug(`Request -----> ${content}`)
    const now = Date.now()
    return next.handle().pipe(tap(() => {
      this.logger.debug(`Response <----- ${content}, took ${Date.now() - now}ms`)
    }))
  }
}
