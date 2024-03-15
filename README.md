## 基础

- [x] ESLint、Git Hook

## 配置及服务

- [x] ConfigService 读取不同环境变量
- [x] 日志文件 (winston)
- [x] 数据库 MySQL (TypeORM)
- [x] 缓存 Redis (ioredis)
- [x] 邮件，支持模板 (nodemailer + @nestjs-modules/mailer)
- [x] 验证码 (邮件 + 图片)

## 请求和响应

- [x] 请求参数校验 (class-validator + class-transformer + ValidationPipe)
- [x] 请求、响应打印接口耗时 (log 拦截器)
- [x] 响应数据包裹 (transform 拦截器，通过 `@PassTransform()` 跳过)
- [x] 错误处理 (Exception filters)

## 鉴权

- [x] 注册
- [x] 登录 (JWT / accessToken + refreshToken)
- [ ] 权限守卫 (permission)
