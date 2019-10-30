<template>
  <div class="container">
    <!-- 卡片容器  el-card是一个element组件，根元素上默认添加一个类和组件的名称一致 -->
    <el-card>
      <img src="../../assets/logo_index.png" alt />
      <!-- 表单 -->
      <el-form :model="LoginForm" status-icon :rules="LoginRules" ref="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="LoginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="LoginForm.code"
            placeholder="请输入验证码"
            style="width:240px;margin-right:8px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" style="width:100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      // 去判断value是否符合手机号格式
      // 格式：1开头  第二位 3-9 之间  9位数字结尾 $结尾
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不对'))
      }
    }
    return {
      LoginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      LoginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 对整个表单进行验证
      // this.$refs['loginForm'].validate(valid => {
      //   if (valid) {
      //     // 校验成功 进行登陆  发请求
      //     // console.log('ok')
      //     this.$http
      //       .post('authorizations', this.LoginForm)
      //       .then(res => {
      //         // 成功
      //         local.setUser(res.data.data)
      //         this.$router.push('/')
      //         // 保存用户信息
      //       })
      //       .catch(() => {
      //         // 失败
      //         this.$message.error('手机号或验证码错误')
      //       })
      //   }
      // })
      // 对整个表单进行验证
      this.$refs['loginForm'].validate(async valid => {
        if (valid) {
          // 一下代码可能出现异常(报错) 使用try{可能报错的代码}catch(e){处理程序}
          try {
            // 拿到用户信息 返回值是promise// local.setUser(res.data.data)
            const {
              data: { data }
            } = await this.$http.post('authorizations', this.LoginForm)
            // 保存用户信息
            local.setUser(data)
            // 跳转到首页
            this.$router.push('/')
          } catch (e) {
            // 错误
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  background: green;
  position: absolute;
  top: 0;
  left: 0;
  //  特殊写法：cover  等比例缩放铺满容器多余不显示  contain 等比例缩放完全显示在容器内
  background: url('../../assets/login_bg.jpg') no-repeat center / cover;
  .el-card {
    width: 400px;
    height: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto 20px;
    }
  }
}
</style>
