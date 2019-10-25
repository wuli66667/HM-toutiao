import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

// 根实例
new Vue({
  render: h => h(App)
}).$mount('#app')

// main.js的作用是入口文件
// 职责：创建一个根实例
// 复杂全局范围的
