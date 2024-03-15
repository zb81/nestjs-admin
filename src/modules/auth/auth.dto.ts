import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class RegisterEmailCodeDto {
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string
}

export class ResetPasswordEmailCodeDto {
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string

  @IsString()
  username: string
}

export class LoginDto {
  @IsString()
  username: string

  @IsString()
  password: string

  @IsString()
  key: string

  @IsString()
  @MinLength(4)
  @MaxLength(4)
  code: string
}

export class ResetPasswordDto {
  @IsString()
  username: string

  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string

  @IsString()
  @MinLength(6, { message: '密码不能少于 6 位' })
  @MaxLength(18, { message: '密码不能超过 18 位' })
  @Matches(/^\S*(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@\.#$%^&*?])\S*$/, {
    message: '密码必须同时包含字母、数字、特殊字符',
  })
  password: string

  @IsString()
  @Matches(/^\d{6}$/, { message: '验证码错误' })
  code: string
}

export class RegisterDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9_]{4,12}$/, { message: '用户名必须是 4-12 位字母、数字或下划线' })
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

export class RefreshDto {
  @IsString()
  refreshToken: string
}

export class CheckUsernameDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9_]{4,12}$/, { message: '用户名必须是 4-12 位字母、数字或下划线' })
  username: string
}
