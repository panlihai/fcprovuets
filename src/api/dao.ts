import request from '@/api/request'
import DateUtil from '@/utils/dateUtil'

function getUrl (p: any) {
    let u = '?t=' + DateUtil.getNowTimeStamp()
    Object.keys(p).forEach(k => {
        u += '&' + k + '=' + p[k]
    })
    return u
}

function get (u: string, p = {}, h = {}) {
    return request({
        url: u + getUrl(p),
        method: 'get',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            ...h
        }
    })
}

function post (u: string, p = {}, b = {}, h = {}) {
    return request({
        url: u + getUrl(p),
        method: 'post',
        data: b,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            ...h
        }
    })
}

function formPost (u: string, p = {}, b = {}) {
  return post(u, p, b, { 'Content-Type': 'x-www-form-urlencoded;charset=UTF-8' })
}

export default {
    post,
    formPost,
    get
}
