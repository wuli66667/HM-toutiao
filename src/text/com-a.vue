<template>
  <div class="container-a">
    <p>com-a---------{{str}}</p>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      str: ''
    }
  },
  // 绑定事件
  created () {
    //   如果想拿到的数据在a组件反应出来 要声明一个data数据在模板当中显示出来
    // 当我接收到b组件提交data数据时  this.str = data 反应到视图上
    eventBus.$on('b2a', data => {
      this.str = data
    })
  }
}
</script>

<style scoped lang='less'>
</style>
