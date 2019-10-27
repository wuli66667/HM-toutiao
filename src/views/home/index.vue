<template>
  <div class="container">
    <el-container class="home-container">
      <!-- 菜单栏 -->
      <el-aside width="200px">
        <!-- logo -->
        <div class="logo"></div>
        <!-- 导航菜单 -->
        <el-menu
          default-active="1"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="border-right:none"
        >
          <!-- el-submenu  拥有子级菜单使用submenu -->
          <!-- el-menu-item  不拥有子级菜单使用menu-item -->
          <!-- index="2" 当前菜单项的唯一标识 -->
          <el-menu-item index="1">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-menu-item index="2">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>

          <el-menu-item index="3">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>

          <el-menu-item index="4">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>

          <el-menu-item index="5">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>

          <el-menu-item index="6">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>

          <el-menu-item index="7">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 顶部 -->
        <el-header>
          <!-- 图标 -->
          <span class="el-icon-s-fold icon"></span>
          <!-- 文章 -->
          <span class="text">江苏传智播客科技教育有限公司</span>
          <!-- 下拉菜单组件 -->
          <el-dropdown class="dropdown">
            <span class="el-dropdown-link">
              <img class="headIcon" src="../../assets/avatar.jpg" alt />
              <span class="userName">昌昌</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-unlock">退出登陆</el-dropdown-item>
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
export default {}
</script>

<style scoped lang='less'>
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .logo {
    width: 200px;
    height: 60px;
    background: #002244 url("../../assets/logo_admin.png") no-repeat center /
      140px auto;
  }
  .el-aside {
    background: #002033;
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
