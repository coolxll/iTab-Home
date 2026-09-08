import { Solar } from 'lunar-javascript'

export function getLunarDateString(date: Date = new Date()): string {
  try {
    const solar = Solar.fromDate(date)
    const lunar = solar.getLunar()
    return `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`
  } catch {
    return '七月廿六'
  }
}

export function getDayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

export function getWeekOfYear(date: Date = new Date()): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}

export function getDaysAlive(birthDateStr: string, currentDate: Date = new Date()): number {
  try {
    const birth = new Date(birthDateStr)
    const diff = currentDate.getTime() - birth.getTime()
    return Math.floor(diff / (1000 * 60 * 60 * 24))
  } catch {
    return 14066
  }
}

export function getWeekdayName(date: Date = new Date(), short = false): string {
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const shortWeekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return short ? shortWeekdays[date.getDay()] : weekdays[date.getDay()]
}
