import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入某一个目录，默认会去找索引文件(index.js index.vue index.json)
// @是别名 指定的是/src路径 一个绝对路径
import router from '@/router'

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
