export const genCaptchaImgKey = (id: string) => `captcha:img:${id}`

export const genEmailCodeKey = (to: string) => `email:code:${to}`
export const genEmailIpForbiddenKey = (ip: string) => `email:ip:forbidden:${ip}`
export const genEmailToForbiddenKey = (to: string) => `email:to:forbidden:${to}`
export const genEmailIpCountKey = (ip: string) => `email:ip:count:${ip}`
export const genEmailToCountKey = (to: string) => `email:to:count:${to}`

export const genAuthPermKey = (uid: number | string) => `auth:perm:${uid}`

export const genRefreshTokenIdKey = (uid: number | string, id: string) => `refresh:${uid}:${id}`
