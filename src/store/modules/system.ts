import * as UserService from '../../api/user'
import Model from '@/api/model'
// initial state
const state = () => {
  let state = localStorage.getItem('state')
  if (state === undefined || state === null) {
    state = JSON.stringify({
      sysproducts: [],
      tabs: [{
        title: '首页',
        name: 'home',
        content: 'home'
      }],
      activetab: '1',
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
  },
  tabspush ({ commit }: any, tab: any) {
    commit('tabspush', tab)
  },
  activetab ({ commit }: any, activetab: string) {
    commit('activetab', activetab)
  },
  removetab ({ commit }: any, activetab: string) {
    commit('removetab', activetab)
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
  },
  tabspush (state: any, tab: any) {
    if (state.tabs) {
      let existTab = false
      state.tabs.forEach((t: any) => {
        if (tab.name === t.name) {
          existTab = true
        }
      })
      if (existTab === false) {
        state.tabs.push(tab)
      }
      state.activetab = tab.name
      localStorage.setItem('state', JSON.stringify(state))
    }
  },
  activetab (state: any, activetab: string) {
    state.activetab = activetab
    localStorage.setItem('state', JSON.stringify(state))
  },
  removetab (state: any, tabName: string) {
    const tabs: any[] = []
    let proTabName = ''
    let needChangeValue = false
    state.tabs.forEach((t: any) => {
      if (tabName === t.name) {
        needChangeValue = true
      } else {
        if (needChangeValue === false) {
          proTabName = t.name
        }
        tabs.push(t)
      }
    })
    state.activetab = proTabName
    state.tabs = tabs
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
