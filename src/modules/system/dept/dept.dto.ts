import { IsInt, IsOptional, IsString, MinLength } from 'class-validator'

export class CreateDeptDto {
  @IsString()
  @MinLength(1)
  name: string

  @IsInt()
  @IsOptional()
  orderNo: number

  @IsInt()
  @IsOptional()
  parentId: number
}
