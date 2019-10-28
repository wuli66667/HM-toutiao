import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'

import Home from '@/views/home'

import welcome from '@/views/welcome'

import NotFound from '@/views/404'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    // 登陆
    path: '/login',
    component: Login
  },
  {
    // 首页
    path: '/',
    component: Home,
    children: [{
      path: '/',
      component: welcome
    }]
  },
  // 404 *匹配没有匹配前面的路由规则
  {
    path: '*',
    component: NotFound
  }
  ]
})

export default router
