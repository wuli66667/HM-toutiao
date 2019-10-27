// 导出配置好的axios 提供给main.js挂载
import axios from 'axios'

// 对axios进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 导出
export default axios
