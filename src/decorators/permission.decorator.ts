import { SetMetadata } from '@nestjs/common'

export const PERMISSION_KEY = 'PERMISSION'

export const Permission = (permission: string | string[]) => SetMetadata(PERMISSION_KEY, permission)

type PermissionGroup<P extends string, O extends object> = {
  [K in keyof O]: O[K] extends string ? `${P}:${O[K]}` : never
}

export function definePermissionGroup<
  P extends string,
  A extends object,
>(prefix: P, actions: A): PermissionGroup<P, A> {
  const ret = {} as PermissionGroup<P, A>
  Object.keys(actions).forEach((k) => {
    ret[k] = `${prefix}:${actions[k]}`
  })
  return ret
}
