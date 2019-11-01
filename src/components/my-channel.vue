<template>
  <el-select :value="value" @change="fn" placeholder="请选择" clearable>
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      //   value: null,
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    // 获取频道数据
    async getChannelOptions () {
      {
        // 获取数据
        const {
          data: { data }
        } = await this.$http.get('channels')
        // 赋值
        this.channelOptions = data.channels
      }
    },
    // 频道改变函数 频道改变发生事件
    fn (channelId) {
      // channelId 清空值'',channelId改为null
      if (channelId === '') channelId = null
      //   把id提交给父组件
      this.$emit('input', channelId)
    }
  }
}
</script>

<style>
</style>
