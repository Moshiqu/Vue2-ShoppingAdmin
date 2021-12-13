// 对axios做二次封装
import axios from 'axios'

// 1:利用axios对象的create方法, 去创建一个axios实例
// 2:request就是axios, 需要做一些配置
const requests = axios.create({
    //配置对象
    // 基础路径, 发请求的时候会携带上/api
    baseURL: '/api',
    // 设置超时时间5s
    timeout: 5000,
})

// 请求拦截器
requests.interceptors.request.use((config)=>{
    //config: 配置对象, 对象里面有一个属性很重呀, headers请求头
    return config
})

// 响应拦截器
requests.interceptors.response.use((config)=>{
    // 响应成功的回调函数
    return config
},(err)=>{
    // 相应失败的回调函数
    return Promise.reject(new Error('fail'))
})

// 对外暴露axios
export default axios;