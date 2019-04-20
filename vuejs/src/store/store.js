import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import language from './modules/language'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    totalTvCount: 10 // The TV inventory
  },
  getters: {
    // Here we will create a getter
  },
  mutations: {
    // Here we will create Jenny
    removeTv (state) {
      // For now we allow Jenny just to remove
      // one TV at a time.
      state.totalTvCount--
    }
  },
  actions: {
    // Here we will create Larry
    removeTv (context) {
      // For now we only remove a tv,
      // but this action can contain logic
      // so we could expand it in the future.
    //   if (context.state.totalTvCount >= amount) {
    //     // If we enough TVs, ask Jenny to remove it
    //     context.commit('removeTv', amount)
    //   }
    }
  },
  modules: {
    language
  }
})
