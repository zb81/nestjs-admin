import { IsIn, IsInt, IsOptional, IsString, Min, MinLength, ValidateIf } from 'class-validator'

import { SortDto } from '~/common/dto'

export class MenuDto {
  @IsIn([0, 1, 2])
  type: number

  @IsOptional()
  parentId: number

  @IsString()
  @MinLength(2)
  name: string

  @IsInt()
  @Min(0)
  orderNo: number

  @ValidateIf(o => o.type !== 2)
  path: string

  @ValidateIf(o => o.type === 1)
  @IsIn([0, 1])
  external: number

  @ValidateIf(o => o.type !== 2)
  @IsIn([0, 1])
  show: number

  @ValidateIf(o => o.type === 1)
  @IsIn([0, 1])
  keepAlive: number

  @IsIn([0, 1])
  status: number

  @IsOptional()
  @ValidateIf(o => o.type !== 2)
  @IsString()
  icon: string

  @ValidateIf(o => o.type === 2)
  @IsString()
  @IsOptional()
  permission: string

  @ValidateIf(o => o.type !== 2)
  @IsString()
  @IsOptional()
  component: string
}

export class MenuQueryDto extends SortDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsInt()
  status?: number
}
