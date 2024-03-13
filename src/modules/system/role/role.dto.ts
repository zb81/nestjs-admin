import { IsArray, IsIn, IsOptional, IsString, Matches, MinLength } from 'class-validator'

export class CreateRoleDto {
  @IsString()
  @MinLength(2, { message: '角色名称不能少于 2 个字符' })
  name: string

  @IsString()
  @Matches(/^[a-z0-9A-Z]+$/, { message: '角色标识只能包含字母和数字' })
  @MinLength(2, { message: '角色标识不能少于 2 个字符' })
  value: string

  @IsString()
  @IsOptional()
  remark?: string

  @IsIn([0, 1])
  status: number

  @IsOptional()
  @IsArray()
  menuIds?: number[]
}
