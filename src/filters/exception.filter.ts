import { ArgumentsHost, Catch, HttpException, HttpStatus, ExceptionFilter as NestExceptionFilter } from '@nestjs/common'
import { Response } from 'express'

import { BizException } from '~/common/biz.exception'
import { BaseRes } from '~/common/response.model'

@Catch()
export class ExceptionsFilter implements NestExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>()

    // 如果是业务异常，直接返回业务异常信息
    if (exception instanceof BizException) {
      res
        .status(HttpStatus.OK)
        .send(new BaseRes(exception.getErrorCode(), null, exception.message))
    }
    else {
      const status = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
      res.status(HttpStatus.OK).send(new BaseRes(status, null, exception.message || exception))
    }
  }
}
