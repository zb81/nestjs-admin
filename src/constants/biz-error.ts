export enum BizError {
  WRONG_CODE = '10001:验证码错误',
  EMAIL_FORBIDDEN = '10002:请求过于频繁，请稍后再试',
  EMAIL_LIMIT = '10003:已达到发送次数限制',

  USER_EXISTS = '20001:用户已存在',
  USER_NOT_EXISTS = '20002:用户不存在',
  USER_NOT_LOGIN = '20004:用户未登录',
  USER_PASSWORD_ERROR = '20005:用户名或密码错误',
  USER_NOT_ALLOW = '20006:用户已被封禁',
}
