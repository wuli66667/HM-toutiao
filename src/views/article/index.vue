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
          <!-- id是现在的值 name是现在的label -->
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
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

    <!-- 删选结果布局 -->
    <el-card style="margin-top:20px">
      <div slot="header">
        <span>根据筛选条件共查询到 {{total}} 条结果：</span>
      </div>
      <!-- 表格 -->
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <!-- 图片 -->
            <!-- <img :src="scope.row.cover.images[0]" style="width:150px;height:150px" /> -->
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:150px">
              <div slot="error">
                <img src="../../assets/error.gif" width="150" height="100" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template>
            <el-button type="primary" icon="el-icon-edit" circle plain></el-button>
            <el-button type="danger" icon="el-icon-delete" circle plain></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 page-size=""不能写死 要和后台保持的参数为准 -->
      <!-- 动态绑定属性和当前请求数据page统一 -->
      <!-- 绑定事件 切换页面 current-change="pager" 当页面发生改变触发 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
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
        end_pubdate: null,
        // 当前页码
        page: 1,
        // 每页多少条
        per_page: 10
      },
      // 选项数据，不需要传给后台 (频道选项)
      channelOptions: [
        { value: 1, label: 'java' },
        { value: 2, label: '前端' }
      ],
      // 日期范围
      dateArr: [],
      // 文章列表数据
      articles: [],
      // 总条数
      total: 0
    }
  },
  created () {
    // 拿频道数据 这是一个方法//此时没有方法
    this.getChannelOptions()
    this.getArticles()
  },
  methods: {
    // 拿后台数据要用异步的方法 获取频道选项
    async getChannelOptions () {
      // 获取数据 channels后台地址 data四响应主体 名称还有一个一data
      //  所以要解构附体
      const {
        data: { data }
      } = await this.$http.get('channels')
      // 赋值给 getChannelOptions
      this.channelOptions = data.channels
    },
    // 频道选项
    async getArticles () {
      // 获取数据
      const {
        data: { data }
      } = await this.$http.get('articles', {
        params: this.reqParams
      })
      // 赋值articles
      this.articles = data.results
      // 给articles赋值的同时 也可以总条数赋值 total_count后台接口
      this.total = data.total_count
    },
    // 分页方法函数
    pager (newPage) {
      // 修改当前的页码为新的页码 最终发给后台的是reqParams
      this.reqParams.page = newPage
      // 从新获取数据
      this.getArticles()
    }
    // // 分页函数
    // pager (newPage) {
    //   // 修改当前的页码为新的页码
    //   this.reqParams.page = newPage
    //   // 重新获取数据
    //   this.getArticles()
    // }
  }
}
</script>

<style scoped lang='less'>
</style>
