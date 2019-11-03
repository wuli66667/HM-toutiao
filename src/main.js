import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局样式
import '@/styles/index.less'

// 导入某一个目录，默认会去找索引文件(index.js index.vue index.json)
// @是别名 指定的是/src路径 一个绝对路径
import router from '@/router'

// 引入
import axios from '@/api'

// import MyBread from '@/components/my-bread'
// // 全局注册
// Vue.component('my-bread', MyBread) // (组件名，组件对象)
// 导入全局面包屑插件
import plugin from '@/components'
Vue.use(plugin)

// 挂载
Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

// 根实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// main.js的作用是入口文件
// 职责：创建一个根实例
// 复杂全局范围的
