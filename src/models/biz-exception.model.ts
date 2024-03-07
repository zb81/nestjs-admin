import { HttpException, HttpStatus } from '@nestjs/common'

import { BizError } from '~/constants/biz-error'
import { RESPONSE_SUCCESS_CODE } from '~/constants/response'

export class BizException extends HttpException {
  private errorCode: number

  constructor(error: BizError | string) {
    const isBizError = error.includes(':')
    if (isBizError) {
      const [code, message] = error.split(':')
      super(HttpException.createBody({ code, message }), HttpStatus.OK)
      this.errorCode = +code
      return
    }

    super(
      HttpException.createBody({
        code: RESPONSE_SUCCESS_CODE,
        message: error,
      }),
      HttpStatus.OK,
    )
    this.errorCode = RESPONSE_SUCCESS_CODE
  }

  getErrorCode() {
    return this.errorCode
  }
}
