import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

import getters from './getters'
import storage from 'store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user
  },
  state: {
    os_type: 0
  },
  mutations: {
    setOs_type (state, value) {
      state.os_type = value
      storage.set('os_type', value)
    }
  },
  actions: {

  },
  getters
})
