import { Base64 } from 'js-base64'
export function timeFix () {
  const hour = new Date().getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  // event.type = 'message'
  window.dispatchEvent(event)
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s: string) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

export function base64Decode (str: string) {
  return Base64.decode(str)
}

export function base64Encode (str: string) {
  return Base64.encode(str)
}

export function doPromise (api: any, success: (p: any)=> {}, fail: (p: any)=> {}) {
  return new Promise((resolve, reject) => {
    api.then((res: any) => {
      if (res.CODE === '0') {
        success(res)
        resolve()
      } else {
        fail(res)
        reject(res)
      }
    })
  })
}
