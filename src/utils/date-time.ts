import dayjs from 'dayjs'

/** 获取当前时间距当天结束还剩多少秒 */
export function getRemainSeconds() {
  const now = dayjs()
  return now.endOf('day').diff(now, 'second')
}
