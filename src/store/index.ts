import { createStore, createLogger } from 'vuex'
import system from './modules/system'
import model from './modules/model'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    system,
    model
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
