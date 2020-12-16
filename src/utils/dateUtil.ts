const yyyyMMDDHHMMss = 'yyyy-MM-dd HH:mm:ss'
const yyyyMmDd2 = 'yyyy-MM-dd'
const yyyyMmDd1 = 'yyyy/MM/dd'
const yyyyMMdd = 'yyyyMMdd'
const HHmmss = 'HH:mm:ss'

/**
 * 判断数据是否为空
 * @param data
 * @returns {boolean}
 */
function isNull (data: any) {
  if (data === null || data === undefined || data === '') {
    return true
  } else {
    return false
  }
}
/**
 * Date日期格式化
 * @param date
 * @param pattern 可为空，默认yyyy-MM-dd HH:mm:ss
 * @returns {string}
 */
function format (date: Date, pattern: string) {
  const yy = date.getFullYear()
  const mm = date.getMonth() + 1
  const dd = date.getDate()
  const hh = date.getHours()
  const ii = date.getMinutes()
  const ss = date.getSeconds()

  let clock = yy + '-'
  if (mm < 10) {
    clock += '0'
  }
  clock += mm + '-'
  if (dd < 10) {
    clock += '0'
  }
  clock += dd + ' '
  if (hh < 10) {
    clock += '0'
  }
  clock += hh + ':'
  if (ii < 10) {
    clock += '0'
  }
  clock += ii + ':'
  if (ss < 10) {
    clock += '0'
  }
  clock += ss
  if (isNull(pattern) || pattern === yyyyMMDDHHMMss) {
    return clock
  } else if (pattern === yyyyMmDd2) {
    return clock.substring(0, 10)
  } else if (pattern === HHmmss) {
    return clock.substring(11)
  } else if (pattern === yyyyMmDd1) {
    return clock.substring(0, 10).replace(/-/g, '/')
  } else if (pattern === yyyyMMdd) {
    return clock.substring(0, 10).replace(/-/g, '')
  } else {
    return clock
  }
}
/**
 * 判断是否为日期
 * @param date 不支持yyyyMMdd格式
 * @returns {boolean}
 */
function isDate (date: any) {
  if (isNaN(date) && !isNaN(Date.parse(date))) {
    return true
  } else {
    return false
  }
}
/**
 * 获取当前日期
 * @returns {Date}
 */
function getNowDate () {
  return new Date()
}
/**
 * 获取当前时间戳
 * @returns {number}
 */
function getNowTimeStamp () {
  return Math.ceil(new Date().getTime())
}
/**
 * 日期字符串转时间戳
 * @param date  不支持yyyyMMdd格式
 * @returns {number}
 */
function strDate2TimeStamp (date: string) {
  date = date.replace(/-/g, '/')
  return new Date(date).getTime()
}
/**
 * 时间戳转日期字符串(yyyy-MM-dd HH:mm:ss)
 * @param timeStamp
 * @returns {string}
 */
function timeStamp2strDate (timeStamp: any) {
  // 根据时间戳生成的时间对象
  const d = new Date(timeStamp)
  const date = (d.getFullYear()) + '-' + (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-' + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + ' ' + (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ':' + (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds())
  return date
}
/**
 * 获取几天前日期(1代表明天，-1 代表前一天，-2前两天...)
 * @param date 指定日期
 * @param num
 * @param separator 连接符 如果为-,则结果为:yyyy-MM-dd
 */
function getDay (date: string, num: number, separator: string) {
  const today = new Date(date)
  const nowTime = today.getTime()
  const ms = 24 * 3600 * 1000 * num
  today.setTime(nowTime + ms)
  const oYear = today.getFullYear()
  let oMoth = (today.getMonth() + 1).toString()
  if (oMoth.length <= 1) {
    oMoth = '0' + oMoth
  }
  let oDay = today.getDate().toString()
  if (oDay.length <= 1) {
    oDay = '0' + oDay
  }
  return oYear + separator + oMoth + separator + oDay
}
/**
 * 获取前几月(1代表下月，-1 代表上月，-2上两月...)
 * @param date 指定日期
 * @param num
 * @param separator 连接符 如果为-,则结果为:yyyy-MM
 */
function getMonth (date: string, num: number, separator: string) {
  const today = new Date(date)
  today.setMonth(today.getMonth() + num)
  const oYear = today.getFullYear()
  let oMoth = (today.getMonth() + 1).toString()
  if (oMoth.length <= 1) {
    oMoth = '0' + oMoth
  }
  return oYear + separator + oMoth
}
/**
 * 判断某一年是否是闰年
 * @param year
 * @returns {boolean}
 */
function isLeapYear (year: number) {
  return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
}
/**
 * 获取某年某个月的天数(西方月份)
 * @param year
 * @param month 从0开始
 */
function getDaysOfMonthEN (year: number, month: number) {
  return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
}
/**
 * 获取某年某个月的天数(中国月份)
 * @param year
 * @param month 从1开始
 */
function getDaysOfMonthCN (year: number, month: number) {
  return ['中国没有0月', 31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
}
/**
 * 计算一个日期是当年的第几天
 * @param date 字符串日期
 * @returns {number}
 */
function dayOfTheYear (date: number) {
  const obj = new Date(date)
  const year = obj.getFullYear()
  // 从0开始
  const month = obj.getMonth()
  let days = obj.getDate()
  const daysArr = [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  for (let i = 0; i < month; i++) {
    days += daysArr[i]
  }
  return days
}
/**
 * 比较两个时间大小(不支持yyyyMMdd格式)
 *  date1>date2 return 1
 *  date1<date2 return -1
 *  date1==date2 return 0
 * @returns {number}
 */
function compareTime (date1: string, date2: string) {
  if (Date.parse(date1.replace(/-/g, '/')) > Date.parse(date2.replace(/-/g, '/'))) {
    return 1
  } else if (Date.parse(date1.replace(/-/g, '/')) < Date.parse(date2.replace(/-/g, '/'))) {
    return -1
  } else if (Date.parse(date1.replace(/-/g, '/')) === Date.parse(date2.replace(/-/g, '//'))) {
    return 0
  }
}
/**
 * 获取本周开始日期
 * @returns {*|string}
 */
function getWeekStartDay () {
  const now = new Date()
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1)
  return format(date, yyyyMmDd2)
}
/**
 * 获取本周结束日期
 * @returns {*|string}
 */
function getWeekEndDay () {
  const now = new Date()
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (7 - now.getDay()))
  return format(date, yyyyMmDd2)
}
/**
 * 获取上周开始日期
 * @returns {*|string}
 */
function getUpWeekStartDay () {
  const now = new Date()
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() - 6)
  return format(date, yyyyMmDd2)
}
/**
 * 获取上周结束日期
 * @returns {*|string}
 */
function getUpWeekEndDay () {
  const now = new Date()
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay())
  return format(date, yyyyMmDd2)
}

export default {
  isNull,
  isDate,
  getNowDate,
  strDate2TimeStamp,
  timeStamp2strDate,
  getNowTimeStamp,
  getDay,
  getMonth,
  isLeapYear,
  getDaysOfMonthEN,
  getDaysOfMonthCN,
  dayOfTheYear,
  compareTime,
  getWeekStartDay,
  getWeekEndDay,
  getUpWeekStartDay,
  getUpWeekEndDay
}
