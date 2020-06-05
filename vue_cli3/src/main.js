import Vue from 'vue'
import store from './store'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import Toasted from 'vue-toasted'

Vue.config.productionTip = false

Vue.use(Toasted)

// Lets Register a Global Toasts.
Vue.toasted.register(
	'appError',
	(payload) => {
		if (!payload.message) {
			return 'Message not definded.'
		}
		return payload.message
	},
	{
		type: 'error',
	}
)

Vue.toasted.register(
	'appSuccess',
	(payload) => {
		if (!payload.message) {
			return 'Message not definded.'
		}
		return payload.message
	},
	{
		type: 'success',
	}
)

Vue.toasted.register(
	'appInfo',
	(payload) => {
		if (!payload.message) {
			return 'Message not definded.'
		}
		return payload.message
	},
	{
		type: 'info',
	}
)

// Now setup our socket and vuex configuration
Vue.use(
	new VueSocketIO({
		debug: true,
		connection: 'http://localhost:3005',
		vuex: {
			store,
			actionPrefix: 'SOCKET_',
		},
		options: {}, //Optional options
	})
)

new Vue({
  store,
	render: (h) => h(App),
}).$mount('#app')
