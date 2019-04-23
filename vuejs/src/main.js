// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { i18n } from './plugins/i18n'
// import i18n from './lang/i18n'
// import store from './store'
import store from './store/store'

// Chú ý để thằng này lên đầu trước khi khỏi tạo main vue \instance
export const eventBus = new Vue()

Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})

export default app

// window['vue'] = app
