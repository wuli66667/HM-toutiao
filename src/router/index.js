import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'

import Home from '@/views/home'

import welcome from '@/views/welcome'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    // 登陆
    path: '/login',
    component: Login
  },
  {
    // 首页
    path: '/home',
    component: Home,
    children: [{
      path: '/',
      component: welcome
    }]
  }
  ]
})

export default router
