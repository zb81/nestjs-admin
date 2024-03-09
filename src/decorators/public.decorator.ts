import { SetMetadata } from '@nestjs/common'

export const PUBLIC_KEY = 'PUBLIC_KEY'

export function Public() {
  return SetMetadata(PUBLIC_KEY, true)
}
