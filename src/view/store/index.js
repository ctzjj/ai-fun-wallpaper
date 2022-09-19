import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    platform: 'bing',
    cid: ''
  },
  mutations: {
    platformChange(state, code) {
      state.platform = code
    },
    cidChange(state, code) {
      state.cid = code
    }
  },
  actions: {
  },
  modules: {
  }
})
