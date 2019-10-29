// 导出配置好的axios 提供给main.js挂载
import axios from 'axios'
import local from '@/utils/local'
import router from '@/router'

// 对axios进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 配置请求头getUser()是一个对象
// 请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 获取token 如果是空 传给一个空对象 有值给getUser 没有给空对象
    const user = local.getUser() || {}

    //   2头部设置token
    config.headers.Authorization = `Bearer ${user.token}`
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截器
axios.interceptors.response.use(res => res, err => {
  // 请求失败
  if (err.response.status === 401) {
    return router.push('/login')
  }
  return Promise.reject(err)
})

// 导出
export default axios
