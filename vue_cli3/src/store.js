import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {},
	actions: {
		SOCKET_oops(state, server) {
			Vue.toasted.global
				.appError({
					message: server.message,
				})
				.goAway(1200)
		},
		SOCKET_success(state, server) {
			Vue.toasted.global
				.appSuccess({
					message: server.message,
				})
				.goAway(1200)
		},
		SOCKET_info(state, server) {
			Vue.toasted.global
				.appInfo({
					message: server.message,
				})
				.goAway(1200)
		},
	},
})
