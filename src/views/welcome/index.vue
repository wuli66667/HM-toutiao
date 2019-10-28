<template>
  <div class="'container'">
    <img src="../../assets/welcome.jpg" alt />
  </div>
</template>

<script>
// import { log } from 'util'
export default {
  // 测试
  created () {
    this.$http
      .get('articles')
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log('error')
        console.log(err)
      })
  }
}
</script>

<style scoped lang='less'>
img {
  display: block;
  margin: 0 auto;
}
</style>
