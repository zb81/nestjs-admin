import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable, map } from 'rxjs'

import { BaseRes } from '~/common/response.model'
import { PASS_TRANSFORM_KEY } from '~/decorators/pass-transform.decorator'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const pass = this.reflector.get(PASS_TRANSFORM_KEY, context.getHandler())
    if (pass)
      return next.handle()

    return next.handle().pipe(map(data => new BaseRes(HttpStatus.OK, data)))
  }
}
