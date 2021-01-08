import Model from '@/api/model'
// initial state
const state = () => {
  return {}
}

// getters
const getters = {
  model: (state: any) => state
}

// actions
const actions = {
  model: ({ commit }: any, param: any) => {
    commit('model', param)
  },
  setApp: ({ commit }: any, param: any) => {
    return new Promise((resolve) => {
      commit('appInit', param)
      resolve()
    })
  },
  initapp: ({ commit }: any, param: any) => {
    return new Promise((resolve, reject) => {
      Model.Appdetail(param.AID, param.PID).then((result: any) => {
        if (result.CODE === '0') {
          Object.keys(result.DATA).forEach((key: string) => {
            const app = result.DATA[key]
            const linkApps: any[] = []
            app.SYSAPPLINKS.forEach((a: any) => {
              linkApps.push(a.ITEMAPP)
            })
            if (linkApps.length !== 0) {
              Model.Appdetail(linkApps.join(','), param.PID).then((res: any) => {
                if (res.CODE === '0') {
                  Object.keys(res.DATA).forEach((ckey: string) => {
                    commit('appInit', res.DATA[ckey])
                  })
                  commit('appInit', app)
                }
                resolve(result)
              })
            } else {
              commit('appInit', app)
              resolve(result)
            }
          })
        } else {
          reject(result.MSG)
        }
      })
    })
  },
  setAppAttr: ({ commit }: any, param: any) => {
    commit('setAppAttr', param)
  },
  setAppFormClose: ({ commit }: any, param: any) => {
    commit('setAppFormClose', param)
  },
  query: ({ commit }: any, param: any) => {
    return new Promise((resolve, reject) => {
      Model.Listinfo(param.AID, param).then((result: any) => {
        if (result.CODE === '0') {
          commit('appInit', result.MODEL)
          resolve(result)
        } else {
          reject(result.MSG)
        }
      })
    })
  }
}

// mutations
const mutations = {
  model (state: any, apps: any) {
    state = apps
  },
  appInit (state: any, app: any) {
    const children: any[] = []
    app.SYSAPPLINKS.forEach((a: any) => {
      if (state[a.ITEMAPP]) {
        children.push(state[a.ITEMAPP].tableInfo)
      }
    })
    state[app.APPID] = Model.toLinkApp(app, children)
  },
  setAppAttr (state: any, param: any) {
    state[param.APPID][param.key] = { ...state[param.APPID][param.key], ...param.value }
  },
  setAppFormClose (state: any, param: any) {
    const parentGrp = state[param.APPID][param.key]
    if (parentGrp.fldGroupCode === param.fldGroup.fldGroupCode) {
      state[param.APPID][param.key].fldGroupOpen = !parentGrp.fldGroupOpen
    } else if (parentGrp.children) {
      parentGrp.children.forEach((grp: any) => {
        if (grp.fldGroupCode === param.fldGroup.fldGroupCode) {
          grp.fldGroupOpen = !grp.fldGroupOpen
        }
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
