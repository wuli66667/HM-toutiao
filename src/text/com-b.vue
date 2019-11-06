<template>
  <div class="container-b">
    <p>
      com-b
      <button @click="fn">b数据提交给a数据</button>
    </p>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      msg: 'b组件的数据'
    }
  },
  methods: {
    fn () {
      // 触发事件
      eventBus.$emit('b2a', this.msg)
    }
  }
}
</script>

<style scoped lang='less'>
</style>
