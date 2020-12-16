import axios from 'axios'
import store from '@/store'
import { VueAxios } from '../utils/axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error: any) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const state: any = store.state
    const token = state.system.token
    if (error.response.status === 403) {
      // notification.error({
      //   message: 'Forbidden',
      //   description: data.message
      // })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      // notification.error({
      //   message: 'Unauthorized',
      //   description: 'Authorization verification failed'
      // })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const state: any = store.state
  const token = state.system.token
  if (config.method === 'post') {
    config.data = {
      DATA: config.data instanceof Object ? [config.data] : config.data
    }
  }
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers[ACCESS_TOKEN] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  if (response.data.code === 0 || response.data.CODE === '0') {
    return response.data
  } else {
    const data = response.data
    if (data.CODE === '41001' || data.CODE === '') {
      store.dispatch('Logout').then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      })
    }
    console.error(data)
  }
}, errorHandler)

const installer = {
  vm: {},
  install (Vue: any) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
