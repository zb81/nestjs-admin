import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class SendEmailCodeDto {
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string
}

export class RegisterDto {
  @IsString()
  username: string

  @IsEmail()
  email: string

  @IsString()
  @Matches(/^\d{6}$/, { message: '验证码错误' })
  code: string

  @IsString()
  @MinLength(6, { message: '密码不能少于 6 位' })
  @MaxLength(18, { message: '密码不能超过 18 位' })
  @Matches(/^\S*(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@\.#$%^&*?])\S*$/, {
    message: '密码必须同时包含字母、数字、特殊字符',
  })
  password: string
}
