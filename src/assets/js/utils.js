export const DAY_TIMESTAMP = 60 * 60 * 24 * 1000
export const HOUR_TIMESTAMP = 60 * 60 * 1000
export const MINUTE_TIMESTAMP = 60 * 1000

export function formatDate (date, fmt) {
  date = new Date(date)
  const o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export function getZeroDate (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return new Date(year + '/' + month + '/' + day + ' 00:00:00')
}

export function dateRange (start, end, format = 'YYYY-MM-DD') {
  let rs = []
  let startTime = new Date(start).getTime()
  let endTime = new Date(end).getTime()
  while (startTime <= endTime) {
    rs.push(formatDate(startTime, format))
    startTime += 24 * 60 * 60 * 1000
  }
  return rs
}

export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}
