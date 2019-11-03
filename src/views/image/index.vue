<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮区域 -->
      <div class="btn">
        <el-radio-group @change="togglelist" v-model="reqParams.collect" size="small">
          <el-radio-button label="false">全部</el-radio-button>
          <el-radio-button label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="dialogVisible=true" style="float:right" type="success" size="small">添加素材</el-button>
      </div>
      <!-- 素材 -->
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <!-- <div class="footer" v-show="!reqParams.collect"> -->
          <div class="footer">
            <!-- item 包含两项 id和状态 -->
            <span
              @click="toggleStatus(item)"
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
            ></span>
            <span @click="deleteImages(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        :show-file-list="false"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      //   列表渲染
      images: [],
      //   总条数
      total: 0,
      // 添加素材相关数据
      dialogVisible: false,
      imageUrl: null
    }
  },
  //   组件初始化 拿列表渲染的数据
  created () {
    this.getImages()
  },
  methods: {
    async getImages () {
      // 获取数据
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      // 赋值给images
      this.images = data.results
      //   赋值给total
      this.total = data.total_count
    },
    pager (newPage) {
      // 发请求
      this.reqParams.page = newPage
      this.getImages()
    },
    // 切换 全部与收藏列表
    togglelist () {
      // 页面改成一
      this.reqParams.page = 1
      // 赋值
      this.getImages()
    },
    // 收藏和取消
    async toggleStatus (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        // 根据此时图片的状态取反 提交给后台进行状态的修改
        collect: !item.is_collected
      })
      // 成功 is_collected当前状态
      item.is_collected = data.collect
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
    },
    // 删除
    deleteImages (id) {
      // 显示确认框
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 点击了确认
          // 1. 发请求
          await this.$http.delete(`user/images/${id}`)
          // 2. 提示
          this.$message.success('删除成功')
          // 3. 更新列表
          this.getImages()
        })
        .catch(() => {
          // 点击了取消
        })
    }
    // 添加素材
    // 上传成功
    // handleSuccess (res) {
    //   // - 预览 2s 钟 ，提示上传成功
    //   this.imageUrl = res.data.url
    //   this.$message.success('上传成功')
    //   window.setTimeout(() => {
    //     // - 自动关闭对话框，更新列表数据。
    //     this.dialogVisible = false
    //     this.getImages()
    //     // 再次打开对话框的时候，预览的是上传按钮 而不是 之前的图片
    //     this.imageUrl = null
    //   }, 2000)
    // }
  }
}
</script>

<style scoped lang='less'>
.img_list {
  margin-top: 20px;
  .img_item {
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    .footer {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
