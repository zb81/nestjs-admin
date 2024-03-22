import { Transform } from 'class-transformer'
import { IsEnum, IsOptional, IsString } from 'class-validator'

enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class SortDto {
  @IsString()
  @IsOptional()
  sortField?: string

  @IsEnum(Order)
  @Transform(({ value }) => value.toUpperCase())
  @IsOptional()
  sortOrder?: Order
}
