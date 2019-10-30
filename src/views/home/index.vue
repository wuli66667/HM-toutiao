<template>
  <div class="container">
    <el-container class="home-container">
      <!-- 菜单栏 -->
      <el-aside :width="isOpen?'200px':'64px'">
        <!-- logo -->
        <div class="logo" :class="{smallLogo:!isOpen}"></div>
        <!-- 导航菜单 -->
        <el-menu
          default-active="/"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="border-right:none"
          :collapse="!isOpen"
          :collapse-transition="false"
          router
        >
          <!-- el-submenu  拥有子级菜单使用submenu -->
          <!-- el-menu-item  不拥有子级菜单使用menu-item -->
          <!-- index="2" 当前菜单项的唯一标识 -->
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>

          <el-menu-item index="/image">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>

          <el-menu-item index="/publish">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>

          <el-menu-item index="/comment">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>

          <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>

          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 顶部 -->
        <el-header>
          <!-- 图标 -->
          <span class="el-icon-s-fold icon" @click="toggleMenu"></span>
          <!-- 文章 -->
          <span class="text">江苏传智播客科技教育有限公司</span>
          <!-- 下拉菜单组件 -->
          <el-dropdown class="dropdown" @command="handleClick">
            <span class="el-dropdown-link">
              <!-- 进行赋值 -->
              <img class="headIcon" :src="photo" alt />
              <!-- <img class="headIcon" src="../../assets/avatar.jpg" alt /> -->
              <!-- 插值表达式 -->
              <span class="userName">{{name}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <!-- <el-dropdown-menu slot="dropdown"> -->
            <!-- 在methods添加方法 -->
            <!-- <el-dropdown-item icon="el-icon-setting" @click.native="setting">个人设置</el-dropdown-item> -->
            <!-- <el-dropdown-item icon="el-icon-unlock" @click.native="logout">退出登陆</el-dropdown-item> -->
            <!-- </el-dropdown-menu> -->
            <el-dropdown-menu slot="dropdown">
              <!-- 在methods添加方法 -->
              <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-unlock" command="logout">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <!-- 欢迎页面 -->
          <!-- 二级路由容器 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      // 是不是展开的
      isOpen: true,
      // 头像
      photo: '',
      // 名称
      name: ''
    }
  },
  // 钩子函数
  created () {
    // 获取用户信息 导入模块
    const user = local.getUser() || {}
    this.photo = user.photo
    this.name = user.name
  },
  methods: {
    toggleMenu () {
      // 切换侧边栏  展开与收起
      this.isOpen = !this.isOpen
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      this.$router.push('/login')
    },
    handleClick (command) {
      this[command]()
    }
  }
}
</script>

<style scoped lang='less'>
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  .el-aside {
    background: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url('../../assets/logo_admin.png') no-repeat center /
        140px auto;
    }
    //覆盖之前的大图 成小图
    .smallLogo {
      background-image: url(../../assets/logo_admin_01.png);
      background-size: 36px auto;
    }
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 30px;
      vertical-align: middle; //中心线对齐
    }
    .text {
      font-size: 15px;
      vertical-align: middle;
    }
    .dropdown {
      float: right;
      .headIcon {
        width: 30px;
        height: 30px;
        vertical-align: middle;
        margin-right: 10px;
      }
      .userName {
        font-weight: bold;
        vertical-align: middle;
      }
    }
  }
}
</style>
