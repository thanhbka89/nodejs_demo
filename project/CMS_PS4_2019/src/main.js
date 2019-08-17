// Import ES6 Promise
import 'es6-promise/auto'

// Import System requirements
import Vue from 'vue'
import VueRouter from 'vue-router'

import { sync } from 'vuex-router-sync'
import routes from './routes'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2'
import Paginate from 'vuejs-paginate'
import Vuelidate from 'vuelidate'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import Axios from 'axios'
import PrettyRadio from 'pretty-checkbox-vue/radio'
import PrettyCheck from 'pretty-checkbox-vue/check'

Vue.prototype.$http = Axios  // globally

Vue.config.productionTip = false

Vue.use(VueSweetalert2)
Vue.use(Vuelidate)
Vue.component('paginate', Paginate)
Vue.component('v-select', vSelect)
Vue.component('p-radio', PrettyRadio)
Vue.component('p-check', PrettyCheck)

// Import Helpers for filters
import { domain, count, prettyDate, pluralize, toVND, fDate, fDateTime } from './filters'

// Import Views - Top level
import AppView from './components/App.vue'

// Import Install and register helper items
Vue.filter('count', count)
Vue.filter('domain', domain)
Vue.filter('prettyDate', prettyDate)
Vue.filter('pluralize', pluralize)
Vue.filter('toVnd', toVND)
Vue.filter('fDate', fDate)
Vue.filter('fDateTime', fDateTime)

Vue.use(VueRouter)

// Routing logic
var router = new VueRouter({
  routes: routes,
  mode: 'history',
  linkExactActiveClass: 'active',
  scrollBehavior: function(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    (!router.app.$store.state.token || router.app.$store.state.token === 'null')
  ) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    window.console.log('Not authenticated')
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

// router.afterEach(() => {
//   NProgress.done()
// })

sync(store, router)

// Check local storage to handle refreshes
if (window.localStorage) {
  var localUserString = window.localStorage.getItem('user') || 'null'
  var localUser = JSON.parse(localUserString)

  if (localUser && store.state.user !== localUser) {
    store.commit('SET_USER', localUser)
    store.commit('SET_TOKEN', window.localStorage.getItem('token'))
  }
}

// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: '#root',
  router: router,
  store: store,
  render: h => h(AppView)
})

// change this. demo
// window.bugsnagClient = window.bugsnag('02fe1c2caaf5874c50b6ee19534f5932')
// window.bugsnagClient.use(window.bugsnag__vue(Vue))
