import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)

/**
 * in component using:
 * this.$router:  which is the router object.
 * this.$route:  which is the current route object.
 */

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/hello',
      name: 'hello',
      component: () => import('@/components/HelloWorld')
    },
    {
      path: '/coin/:id',
      name: 'coin',
      component: () => import('@/components/Coin')
    }
  ]
})