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
            commit('appInit', result.DATA[key])
          })
          resolve(result)
        } else {
          reject(result.MSG)
        }
      })
    })
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
    state[app.APPID] = Model.toLinkApp(app)
    console.log(state[app.APPID])
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
