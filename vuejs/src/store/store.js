import Vue from 'vue'
import Vuex from 'vuex'
import MockService from '@/services/MockService'

// Modules
import language from './modules/language'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogged: false,
    totalTvCount: 10 // The TV inventory
  },
  getters: {
    // tra ve gia tri
    // Here we will create a getter
    getTotal: (state) => {
      return state.totalTvCount
    },
    isLoggedIn: (state, getters, rootState) => {
      return state.isLogged
    }

  },
  mutations: {
    // qua trinh cap nhat state
    // Here we will create Jenny
    removeTv (state) {
      // For now we allow Jenny just to remove
      // one TV at a time.
      state.totalTvCount--
    },
    SET_TV (state, payload) {
      // A payload is simply the data passed to our mutation
      // from the component committing the mutation
      state.totalTvCount = payload
    },
    LOGIN (state) {
      state.isLogged = true
    },
    LOGOUT (state) {
      state.isLogged = false
    },
    GET_API (state, payload) {
      console.log('ASYNC Action Axios', payload)
    }
  },
  actions: {
    // commit đến mutation hoặc để chúng ta gọi api xong rồi mới commit thay đổi và cập nhật state
    // Here we will create Larry
    removeTv (context) {
      // For now we only remove a tv,
      // but this action can contain logic
      // so we could expand it in the future.
    //   if (context.state.totalTvCount >= amount) {
    //     // If we enough TVs, ask Jenny to remove it
    //     context.commit('removeTv', amount)
    //   }
    },
    login ({state, commit, rootState}) {
      commit('LOGIN')
    },
    logout ({state, commit, rootState}) {
      commit('LOGOUT')
    },
    get_api: async ({commit}) => {
      try {
        let response = await MockService.mockFetchUsers()
        commit('GET_API', response.data)
      } catch (e) {
        console.log(e)
      }
    }
  },
  modules: {
    language
  }
})
