// 导出一个本地操作用户信息的模块(设置用户、获取用户、清除用户)
const KEY = 'hm-pc'
const local = {
  //    三个方法
  setUser (user) {
    // 存储 setItem(key,value) key将来获取时候需要使用  value json字符串格式
    const jsonStr = JSON.stringify(user) // 转成字符串
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  getUser () {
    //   获取存储的值
    const jsonStr = window.sessionStorage.getItem(KEY)
    return JSON.parse(jsonStr)
  },
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}

export default local
