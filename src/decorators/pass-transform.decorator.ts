import { SetMetadata } from '@nestjs/common'

export const PASS_TRANSFORM_KEY = 'PASS_TRANSFORM_KEY'

export function PassTransform() {
  return SetMetadata(PASS_TRANSFORM_KEY, true)
}
