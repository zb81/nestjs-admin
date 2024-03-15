export const genCaptchaImgKey = (id: string) => `captcha:img:${id}` as const

export const genEmailCodeKey = (to: string) => `email:code:${to}` as const
export const genEmailIpForbiddenKey = (ip: string) => `email:ip:forbidden:${ip}` as const
export const genEmailToForbiddenKey = (to: string) => `email:to:forbidden:${to}` as const
export const genEmailIpCountKey = (ip: string) => `email:ip:count:${ip}` as const
export const genEmailToCountKey = (to: string) => `email:to:count:${to}` as const

export const genAuthAccessTokenKey = (val: string | number) => `auth:accessToken:${String(val)}` as const
export const genAuthRefreshTokenKey = (val: string | number) => `auth:refreshToken:${String(val)}` as const
export const genAuthPermKey = (val: number | string) => `auth:perm:${String(val)}` as const
export const genAuthPVKey = (val: string | number) => `auth:pv:${String(val)}` as const
export const genAuthInvalidTokenKey = (val: string) => `auth:invalidToken:${val}` as const
