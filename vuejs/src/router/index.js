import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Contact from '@/components/Contact'
import News from '@/components/News'
import Form from '@/components/Form'
import FormUser from '@/components/FormUser'
import User from '@/components/User'
import ListUsers from '@/components/ListUsers'
import APINode from '@/components/APINode'
// ký tự @ ở đây có thể hieur là 1 alias cho thư mục /src

import VueAxios from 'vue-axios'
import axios from 'axios'
Vue.use(VueAxios, axios)

Vue.use(Router)

export default new Router({ mode: 'history',
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
    }
  ]
})
