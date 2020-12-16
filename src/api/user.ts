import request from '@/api/request'
import Dao from '@/api/dao'
import * as Util from '@/utils/util'

const userApi = {
  Login: '/SYSTEM/SYSUSER/login',
  Logout: '/SYSTEM/SYSUSER/logout',
  ForgePassword: '/SYSTEM/SYSUSER/forge-password',
  Register: '/SYSTEM/SYSUSER/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/SYSTEM/SYSUSER/getUserinfo',
  UserMenu: '/SYSTEM/SYSMENU/getMenuByToken'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter: any) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: {
      USERID: Util.base64Encode(parameter.userid),
      PASSWORD: Util.base64Encode(parameter.password)
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getSmsCaptcha (parameter: any) {
  return request({
    url: userApi.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return request({
    url: userApi.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getCurrentUserNav (param: any) {
  return Dao.get(userApi.UserMenu, param)
}

export function logout () {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter: any) {
  return request({
    url: userApi.twoStepCode,
    method: 'post',
    data: parameter
  })
}
