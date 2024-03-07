import { ArgumentsHost, Catch, HttpException, HttpStatus, ExceptionFilter as NestExceptionFilter } from '@nestjs/common'
import { Response } from 'express'

import { BizException } from '~/models/biz-exception.model'
import { BaseRes } from '~/models/response.model'

@Catch()
export class ExceptionsFilter implements NestExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>()

    // 如果是业务异常，直接返回业务异常信息
    if (exception instanceof BizException) {
      res
        .status(exception.getErrorCode())
        .send(new BaseRes(exception.getErrorCode(), null, exception.message))
    }
    else {
      const status = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
      res.status(status).send(new BaseRes(status, null, exception.message || exception))
    }
  }
}
