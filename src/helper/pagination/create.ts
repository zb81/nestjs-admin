import { PaginationWrapper, RepositoryPaginationOptions } from './types'

const DEFAULT_PAGE_NO = 1
const DEFAULT_PAGE_SIZE = 10

export async function createRepoPagination<T>(
  options: RepositoryPaginationOptions<T>,
): Promise<PaginationWrapper<T>> {
  const {
    repository,
    pageNo = DEFAULT_PAGE_NO,
    pageSize = DEFAULT_PAGE_SIZE,
    where,
    order,
  } = options

  const [total, list] = await Promise.all([
    // count
    repository.count({ where }),
    // query
    repository.find({
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
      where,
      order,
    }),
  ])

  return {
    list,
    pageNo,
    pageSize,
    total,
    totalPage: Math.ceil(total / pageSize),
  }
}

export async function createQbPagination() {}
