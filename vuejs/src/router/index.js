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
import Register from '@/components/Register'
import Dashboard from '@/components/Dashboard'
import Coins from '@/components/Coin'

// ký tự @ ở đây có thể hieur là 1 alias cho thư mục /src

import store from '@/store/store'
import {
  i18n
} from '@/plugins/i18n'

import VueAxios from 'vue-axios'
import axios from 'axios'
Vue.use(VueAxios, axios)

Vue.use(VueRouter)

const Router = new VueRouter({
  mode: 'history',
  routes: [{
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
      component: Customer,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'userboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    // {
    //   path: '/admin',
    //   name: 'admin',
    //   component: Admin,
    //   meta: {
    //     requiresAuth: true,
    //     is_admin: true
    //   }
    // },
    {
      path: '/coins/:id', // dynamic route, pass parameter
      name: 'Coins',
      component: Coins
    },

    // otherwise redirect to home
    {
      path: '*',
      redirect: '/'
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
  // debugger

  // Cach 1
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({
        path: '/login',
        params: {
          nextUrl: to.fullPath
        }
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin == 1) {
          next()
        } else {
          next({
            name: 'userboard'
          })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('token') == null) {
      next()
    } else {
      next({
        name: 'userboard'
      })
    }
  } else {
    next()
  }


  // Cach 2
  // redirect to login page if not logged in and trying to access a restricted page
  // const publicPages = ['/login'];
  // const authRequired = !publicPages.includes(to.path);
  // const token = localStorage.getItem('token');

  // if (authRequired && !token) {
  //   return next('/login');
  // }

  // next();


  // Cach 3
  // // if (localStorage.token && new Date().getTime() < localStorage.tokenExpired) {
  // if (to.path === '/login' || localStorage.token === 'OK') {
  //   next()
  // } else {
  //   next('/login')
  // }
})

export default Router
