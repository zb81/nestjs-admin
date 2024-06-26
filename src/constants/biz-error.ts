export enum BizError {
  WRONG_CODE = '10001:验证码错误',
  EMAIL_FORBIDDEN = '10002:请求过于频繁，请稍后再试',
  EMAIL_LIMIT = '10003:已达到发送次数限制',

  USER_EXISTS = '20001:用户名已存在',
  EMAIL_EXISTS = '20002:邮箱已存在',
  INVALID_USERNAME_PASSWORD = '20003:用户名或密码错误',
  INVALID_LOGIN = '20004:登录已过期，请重新登录',
  LOGIN_ELSEWHERE = '20005:账号在别处登录',
  USER_NOT_EXIST = '20006:未查询到用户',
  NOT_ALLOWED = '20007:没有权限',

  ROLE_HAS_USER = '30001:存在关联用户，无法删除',
}
