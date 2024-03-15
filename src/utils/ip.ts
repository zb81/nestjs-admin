import { isIP, isIPv4, isIPv6 } from 'node:net'
import * as os from 'node:os'

/* 判断内网 ip */
export function isLAN(ip: string) {
  ip.toLowerCase()
  if (ip === 'localhost')
    return true
  let a_ip = 0
  if (ip === '')
    return false
  const aNum = ip.split('.')
  if (aNum.length !== 4)
    return false
  a_ip += Number.parseInt(aNum[0]) << 24
  a_ip += Number.parseInt(aNum[1]) << 16
  a_ip += Number.parseInt(aNum[2]) << 8
  a_ip += Number.parseInt(aNum[3]) << 0
  a_ip = (a_ip >> 16) & 0xFFFF
  return (
    a_ip >> 8 === 0x7F
    || a_ip >> 8 === 0xA
    || a_ip === 0xC0A8
    || (a_ip >= 0xAC10 && a_ip <= 0xAC1F)
  )
}

/** 判断本机 ip */
export function isLocal(ip: string) {
  if (isIPv4(ip))
    return ip === '127.0.0.1' || ip === os.networkInterfaces().lo0[0].address

  if (isIPv6(ip))
    return ip === '::1' || ip === os.networkInterfaces().lo0[1].address

  return false
}

export async function getIpAddress(ip: string) {
  if (!isIP(ip))
    return '未知地址'

  if (isLocal(ip))
    return '本机地址'

  if (isLAN(ip))
    return '内网地址'

  try {
    const res = await fetch(`https://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`)
    const data = JSON.parse(new TextDecoder('gbk').decode(await res.arrayBuffer()))
    return data.addr.trim().split(' ').at(0)
  }
  catch (error) {
    return '接口请求失败'
  }
}
