// 对axios做二次封装
import axios from 'axios'
import nprogress from 'nprogress'
import "nprogress/nprogress.css"
// 导入vuex中的uuid
import store from "@/store"

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
requests.interceptors.request.use((config) => {
    // config: 配置对象, 对象里面有一个属性很重呀, headers请求头
    // 添加请求头, 用户临时id uuid
    if (store.state.cart.uuid_token) {
        config.headers.userTempId = store.state.cart.uuid_token
    }
    if (localStorage.getItem('USER_TOKEN')) {
        config.headers.token = localStorage.getItem('USER_TOKEN')
    }
    if (sessionStorage.getItem('USER_TOKEN')) {
        config.headers.token = sessionStorage.getItem('USER_TOKEN')
    }
    // 进度条开始动
    nprogress.start()
    return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    // 进度条结束
    nprogress.done()
    // 响应成功的回调函数
    return res.data
}, (err) => {
    // 进度条结束
    nprogress.done()
    // 相应失败的回调函数
    return Promise.reject(new Error('fail'))
})

// 对外暴露axios
export default requests;