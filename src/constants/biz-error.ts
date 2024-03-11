export enum BizError {
  WRONG_CODE = '10001:验证码错误',
  EMAIL_FORBIDDEN = '10002:请求过于频繁，请稍后再试',
  EMAIL_LIMIT = '10003:已达到发送次数限制',

  USER_EXISTS = '20001:用户已存在',
  USER_PASSWORD_ERROR = '20002:用户名或密码错误',
  INVALID_REFRESH_TOKEN = '20003:无效的刷新令牌',
}
