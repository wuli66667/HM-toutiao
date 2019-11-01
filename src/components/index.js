// 引入
import MyBread from '@/components/my-bread'

// 引入插件
import MyChannel from '@/components/my-channel'

// 封装一个插件 封装全局组件
// 导出一个对象
export default {
  // 对象中必须有一个属性：install 是一个函数 有一个默认传参
  install (Vue) {
    // 基于Vue做任何事情（注册全局组件，指令，过滤器，挂载原型函数）
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
  }
}
