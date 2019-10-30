<template>
  <div class="container-article">
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <!-- 使用面包屑组件 -->
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 内容 -->
      <!-- 表单 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态">
          <!-- v-model出现应该在data里面出现对应的数据 表单里面的数据
            将来要提交给后台，后台对字段的名称是有规定的 v-model的字段名要和后端保持一致
          看接口文档=>请求参数=>jqary=>status字段名称-->
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <!-- v-model 绑定的值是[起始日期,结束日期] -->
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    //   返回一个对象
    return {
      // 提交给后台参数对象，参数对象猜包含data
      // reqParams请求参数是一个对象 reqParams由axios进行数据提交，字段的值null，axios是不会提交该字段
      // 不会出现在请求体里面
      reqParams: {
        status: null, // 默认值（怎么让声明的data不提交给后台 如果是status:""是空字符串也会提交给后台）
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 选项数据，不需要传给后台 (频道选项)
      channelOptions: [
        { value: 1, label: 'java' },
        { value: 2, label: '前端' }
      ],
      // 日期
      dateArr: []
    }
  }
}
</script>

<style scoped lang='less'>
</style>
