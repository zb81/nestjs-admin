import { SetMetadata } from '@nestjs/common'

export const ALLOW_NON_PERMISSION_KEY = 'ALLOW_NON_PERMISSION'

export const AllowNonPermission = () => SetMetadata(ALLOW_NON_PERMISSION_KEY, true)
