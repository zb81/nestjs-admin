import { RESPONSE_SUCCESS_CODE, RESPONSE_SUCCESS_MSG } from '~/constants/response'

export class BaseRes<T = any> {
  data?: T
  code: number
  message: string

  constructor(code: number, data: T, message = RESPONSE_SUCCESS_MSG) {
    this.code = code
    this.data = data
    this.message = message
  }

  static success<T>(data?: T, message?: string) {
    return new BaseRes(RESPONSE_SUCCESS_CODE, data, message)
  }

  static error(code: number, message: string) {
    return new BaseRes(code, null, message)
  }
}

export class BaseTreeRes<T = any> {
  id: number
  parentId: number
  children?: BaseTreeRes<T>[]
}
