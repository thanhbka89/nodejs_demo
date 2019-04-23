import Vue from 'vue'
import Vuex from 'vuex'
import app from './main'

Vue.use(Vuex)

export default new Vuex.store({
  const mutations = {
    SET_LANG (state, payload) {
      app.$i18n.locale = payload
    }
  },
  
  const actions = {
    setLang({commit}, payload) {
      commit('SET_LANG', payload)
    }
  }
})