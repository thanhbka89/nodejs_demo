import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Contact from '@/components/Contact'
import News from '@/components/News'
import Form from '@/components/Form'
import FormUser from '@/components/FormUser'
import User from '@/components/User'
import ListUsers from '@/components/ListUsers'
import APINode from '@/components/APINode'
import Customer from '@/components/Customer'
import Login from '@/components/Login'
// ký tự @ ở đây có thể hieur là 1 alias cho thư mục /src

import store from '@/store/store'
import { i18n } from '@/plugins/i18n'

import VueAxios from 'vue-axios'
import axios from 'axios'
Vue.use(VueAxios, axios)

Vue.use(VueRouter)

const Router = new VueRouter({ mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/form',
      name: 'Form',
      component: Form
    },
    {
      path: '/form_user',
      name: 'FormUser',
      component: FormUser
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/listuser',
      name: 'ListUsers',
      component: ListUsers
    },
    {
      path: '/getapi',
      name: 'API_NODE',
      component: APINode
    },
    {
      path: '/vuex',
      name: 'VueXDemo',
      component: Customer
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        guest: true
      }
    }
  ]
})

Router.beforeEach((to, from, next) => {
  // if (store.state.language.language && store.state.language.language !== i18n.locale) {
  //   i18n.locale = store.state.language.language
  //   next()
  // } else if (!store.state.language.language) {
  //   store.dispatch('language/setLanguage', navigator.languages)
  //     .then(() => {
  //       i18n.locale = store.state.language.language
  //       next()
  //     })
  // } else {
  //   next()
  // }

  if (to.path === '/login') {
    next()
  }

  // if (localStorage.token && new Date().getTime() < localStorage.tokenExpired) {
  if (localStorage.token === 'OK') {
    next()
  } else {
    next('/login')
  }
})

export default Router
