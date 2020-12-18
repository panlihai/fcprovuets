import * as UserService from '../../api/user'
import Model from '@/api/model'
// initial state
const state = () => {
  let state = localStorage.getItem('state')
  if (state === undefined || state === null) {
    state = JSON.stringify({
      sysproducts: [],
      sysmenus: [],
      isLogin: false,
      sysuser: {},
      token: '',
      pid: 'BACKING'
    })
    localStorage.setItem('state', JSON.stringify(state))
  }
  return JSON.parse(state)
}

// getters
const getters = {
  system: (state: any) => state
}

// actions
const actions = {
  system: ({ commit }: any, param: any) => {
    commit('state', param)
  },
  login: ({ commit }: any, param: any) => {
    return new Promise((resolve, reject) => {
      UserService.login(param).then((result: any) => {
        if (result.CODE === '0') {
          commit('sysuser', result.DATA)
          commit('token', result.TOKEN)
          resolve(true)
        } else {
          reject(result.MSG)
        }
      })
    })
  },
  getMenus ({ commit, state }: any, pid: string) {
    commit('pid', pid)
    UserService.getCurrentUserNav({
      P_PID: pid,
      P_MENUID: '',
      SCOMPANY_CODE: state.sysuser.SYSCOMPANY.SCOMPANY_CODE
    }).then((res: any) => {
      if (res.CODE === '0') {
        const result = res.DATA
        commit('sysmenus', result)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  getProducts ({ commit }: any) {
    return new Promise((resolve: any, reject: any) => {
      Model.Listinfo('SYSPRODUCT', {}).then((res: any) => {
        if (res.CODE === '0') {
          const result = res.DATA
          commit('sysproducts', result)
          resolve(result)
        } else {
          reject(res.MSG)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}

// mutations
const mutations = {
  sysproducts (state: any, p: any) {
    state.sysproducts = p
    localStorage.setItem('state', JSON.stringify(state))
    console.log(state)
  },
  sysmenus (state: any, menus: any[]) {
    state.sysmenus = menus
    localStorage.setItem('state', JSON.stringify(state))
    console.log(state)
  },
  sysuser (state: any, sysuser: any) {
    state.isLogin = true
    state.sysuser = sysuser
    localStorage.setItem('state', JSON.stringify(state))
    console.log(state)
  },
  token (state: any, token: string) {
    state.token = token
    localStorage.setItem('state', JSON.stringify(state))
    console.log(state)
  },
  pid (state: any, pid: string) {
    state.pid = pid
    localStorage.setItem('state', JSON.stringify(state))
    console.log(state)
  },
  system (state: any, s: any) {
    state = s
    localStorage.setItem('state', JSON.stringify(state))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
