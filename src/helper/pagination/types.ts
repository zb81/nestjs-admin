import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm'

export interface RepositoryPaginationOptions<T> {
  repository: Repository<T>
  pageNo?: number
  pageSize?: number
  where?: FindOptionsWhere<T>
  order?: FindOptionsOrder<T>
}

export interface PaginationWrapper<T> {
  total: number
  list: T[]
  totalPage: number
  pageNo: number
  pageSize: number
}
