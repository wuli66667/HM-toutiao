import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'

import Home from '@/views/home'

import welcome from '@/views/welcome'

import NotFound from '@/views/404'

import local from '@/utils/local'

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

// 路由导航守卫(前置导航守卫)  后边也有守卫(路由钩子)
// 每一次跳转都会执行
router.beforeEach((to, from, next) => {
  // to 跳转目标路由对象
  // from 从哪里跳过来的路由对象
  // next() 放行  next('/login') 拦截到登录
  // next()
  // 如果你访问的不是登录页面，且又没有登录，跳转到登录页面。
  const user = local.getUser()
  if (to.path !== '/login' && !user) return next('/login')
  next()
})

export default router
