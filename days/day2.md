## 12.13

### POSTMAN 接口测试

--如果服务器返回的数据 code 是 200, 则代表服务器返回数据成功
--整个项目,接口前缀都有/api

### axios 二次封装

XMLHttpRequest, fetch, JQ, axios

#### 为什么需要二次封装 axios?

请求拦截器:
可以在发送请求之前处理一些业务
响应拦截器:
当服务器数据返回后, 可以处理一些事情

#### 在项目当中 api 文件夹一般都是放【axios】

## 12.14

### 接口统一管理

项目很小： 完全可以在组件的生命周期函数中发请求
项目大： axios.get('')

### 跨域问题

什么是跨域: 协议, 端口号, 域名不同的请求, 称之为跨域
http://localhost:8080/#/home ----前端项目本地服务器
http://39.98.123.211 ----后台后台服务器

#### webpack.config.js | vue.config.js 中使用 proxy

    // 代理跨域
    devServer: {
        proxy: {
            '/api': {
                target: 'http://39.98.123.211',
                // pathRewrite: {'^/api': ''}
            }
        }
    },

### nprogress 的使用

npm install --save nprogress

需要引入 nprogress 样式 import 'nprogress/nprogress.css'
nprogress.start() 进度条开始动
nprogress.done() 进度条结束

### vuex 状态管理库

#### vuex 是什么?

vuex 是官方的一个插件, 状态管理库, 集中式管理项目中组件共用的数据
state: 仓库储存数据的地方
mutations: 修改 state 的唯一手段
actions: 处理 action, 可以书写自己的逻辑, 也可以处理异步
getters: 理解为计算属性, 用于简化仓库数据, 让组件获取仓库数据更加方便
modules

#### vuex 基本使用

#### vuex 实现模块式开发

如果项目过大, 组件过多, 接口也多, 数据也多, 可以让 vuex 实现模块式开发
模拟 state 存储数据:
// 使用 vuex 仓库模块式开发存储数据
modules: {
home,
search
}

#### state 的使用

    ...mapState({
            // 右侧需要的是一个函数, 当使用这个计算属性的时候, 右侧函数会立即执行一次
            // 注入一个参数state, 其实即为大仓库中的数据
            categoryList: state => state.home.categoryList
        })
