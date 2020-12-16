import { createStore, createLogger } from 'vuex'
import system from './modules/system'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    system
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
