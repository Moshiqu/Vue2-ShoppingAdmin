## 12.13
### POSTMAN接口测试
--如果服务器返回的数据code是200, 则代表服务器返回数据成功
--整个项目,接口前缀都有/api


### axios二次封装
XMLHttpRequest, fetch, JQ, axios
#### 为什么需要二次封装axios?
请求拦截器:
    可以在发送请求之前处理一些业务
响应拦截器:
    当服务器数据返回后, 可以处理一些事情

#### 在项目当中api文件夹一般都是放【axios】

## 12.14
### 接口统一管理
项目很小： 完全可以在组件的生命周期函数中发请求
项目大： axios.get('')

### 跨域问题
什么是跨域: 协议, 端口号, 域名不同的请求, 称之为跨域
http://localhost:8080/#/home  ----前端项目本地服务器
http://39.98.123.211          ----后台后台服务器

#### webpack.config.js | vue.config.js 中使用proxy
    // 代理跨域
    devServer: {
        proxy: {
            '/api': {
                target: 'http://39.98.123.211',
                // pathRewrite: {'^/api': ''}
            }
        }
    },

### nprogress的使用
npm install --save nprogress

需要引入nprogress样式 import 'nprogress/nprogress.css'
nprogress.start() 进度条开始动
nprogress.done() 进度条结束

### vuex状态管理库
#### vuex是什么?
vuex是官方的一个插件, 状态管理库, 集中式管理项目中组件共用的数据