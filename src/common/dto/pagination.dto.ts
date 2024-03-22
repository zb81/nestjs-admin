import { IsInt, IsOptional } from 'class-validator'

import { SortDto } from './sort.dto'

export class PaginationDto extends SortDto {
  @IsInt()
  @IsOptional()
  pageNo?: number

  @IsInt()
  @IsOptional()
  pageSize?: number
}
