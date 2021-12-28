## 12.26

### 不使用 vuex 进行接口的派发方式

直接在 vue 的原型上绑定所有的接口, 组件可以直接调用
所有的 vue 组件可以在 Vue 原型上找到

```JavaScript
    // main.js
    import * as API from "@/api"
    new Vue({
        render: h => h(App),
        beforeCreate() {
            // 全局事件总线 $bus
            Vue.prototype.$bus = this
            // 统一引入所有接口
            Vue.prototype.$API = API
        },
        // 注册路由
        // 注册路由信息: 当这里书写router的时候, 组件身上都拥有$route属性
        router,
        // 注册仓库: 组件实例的身上会有一个$store
        store
    }).$mount('#app')
```

```JavaScript
    // api/index.js
    //获取订单支付信息 /payment/weixin/createNative/{orderId}
    export const reqGetPay = async orderId => {
        const result = await requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get" })
        if (result.code) {
            return result.data
        } else {
            return result.message
        }
    }
```

```JavaScript
    // 组件中使用
    this.$API.reqGetPay(this.orderId).then((result) => {
        this.payInfo = result
      }).catch((err) => {
        alert(err)
      });
```

### 组件库

react: antd(PC 端) antd-mobile(移动端)
vue: ElementUI(PC 端) vant(移动端)

### ElementUI

npm install --save element-ui

按需引入
npm install babel-plugin-component -D

```json
//.babelrc
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

```JavaScript
    // main.js
    import { Button, Select } from 'element-ui';

    Vue.component(Button.name, Button);
    Vue.component(Select.name, Select);
```

### qrcode

npm install --save qrcode

```JavaScript
import QRCode from 'qrcode'

// With promises
QRCode.toDataURL('I am a pony!')
  .then(url => {
    console.log(url)
  })
  .catch(err => {
    console.error(err)
  })

// With async/await
const generateQR = async text => {
  try {
    console.log(await QRCode.toDataURL(text))
  } catch (err) {
    console.error(err)
  }
}
```

### 二级路由

```JavaScript
// 引入二级路由组件
import MyOrder from "@/pages/Center/myOrder"
import GroupOrder from "@/pages/Center/groupOrder"

// center 为一级路由
// 一级路由下可配置二级路由
const router = [
  {
     path: '/center',
     name: 'center',
     component: Center,
     // 二级路由
     children: [
        // 如果地址为'/center' 一级路由, 则重定向到/center/myorder 二级路由
         {
          path: '/center',
          redirect: '/center/myorder'
         },
         {
          path: 'myorder',
          component: MyOrder
         },
          {
           path: 'grouporder',
           component: GroupOrder
         }
     ]
   }
]

```

### 路由独享守卫

只针对当前的路由 next(false), 哪里来 回哪儿去

```JavaScript
const router = [
  {
    path: '/trade',
    name: 'trade',
    component: Trade,
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
        if (to.path == '/shopcart') {
            next()
        } else {
            next(false)
        }
    }
  }
]

```

## 12.28

### 图片懒加载

npm i --save vue-lazyload

```JavaScript
  // 引入图片懒加载
  import vueLazyLoad from 'vue-lazyload'
  // 引入懒加载图片
  import lazyImg from "@/assets/images/lazyGif.gif"

  Vue.use(vueLazyLoad, {
    preLoad: 1.3,
    error: 'dist/error.png',
    loading: lazyImg,
    attempt: 1
  })
```

### 表单验证插件

npm install --save vee-validate@2 安装 2 版本的

```JavaScript
  // vee-validate 表单验证
  // mian.js 入口文件
  import Vue from 'vue'
  import VeeValidate from 'vee-validate'
  import zh_CN from 'vee-validate/dist/locale/zh_CN'

  Vue.use(VeeValidate)

  VeeValidate.Validator.localize('zh_CN', {
      messages: {
          ...zh_CN.messages,
      },
      attributes: {
          phone: '手机号',
          password: '密码'
      }
  })
```

```JavaScript
<input
    type="text"
    placeholder="手机号"
    maxlength="11"
    v-model="phoneNum"
    name="phone"
    v-validate="{ required: true, regex: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/ }"
    v-bind:class="{ invalid: errors.has('phone') }"
  />
<i class="error-msg">{{ errors.first('phone') }}</i>
```

```JavaScript
  async login() {
      const isSuccess = await this.$validator.validateAll()
      if (isSuccess) {
        this.$store.dispatch('loginByPassword', { phone: this.phoneNum, password: this.password, isAuto: this.isAuto })
          .then((result) => {
            if (JSON.stringify(this.$route.query) !== "{}") {
              this.$router.push(this.$route.query.redirect)
            } else {
              this.$router.push('/home')
            }
          }).catch((err) => {
            alert(err.message)
          });
      }
    }
```

### 空数组和空对象的布尔值是 true

### 路由懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

```JavaScript
  {
      path: '/home',
      // 路由懒加载, 只有在使用该路由时, 才会引入该路由
      component: () => import('@/pages/Home'),
      meta: { show: true }
  }
```

### 代码打包

npm run build
项目打包后, 代码都是经过压缩加密的, 如果运行时报错, 输出的错误信息无法准确得知是哪里的代码报错
所以该文件项目不需要是可以去除掉

vue.config.js 配置
productionSourceMap:false

### 服务器

1、前端开发。完成网页的前端展示页面，也就是用户能看到的部分。相关的技术关键词是 HTML、CSS、JS。先掌握核心基础的部分（而且这部分也够用了），不要上来就搞什么 vue、angular、react，这些对新手来说，会把问题搞复杂，很容易挫败你。

2、后端开发。后端可选的语言比较多，容易上手对新手友好的，有 PHP、Python 等，其他像 node、java 之类的不太建议新手使用，起步的门槛稍微高点。所有后端语言学习的时候都会涉及到数据库的操作，顺便学习一些 sql 基础即可满足开发需求。

掌握以上两部分，你就可以开发出一个完整的可交互的网站了，如果觉得页面不够美观，可以学习下 UI 设计，或者使用一些成熟的 UI 框架。

处理服务器流程参考: https://www.bilibili.com/video/BV1Vf4y1T7bw?p=110

#### 购买服务器

1. 阿里云
2. 腾讯云: 星星海云服务器 首年 99

#### 设置安全组

#### 利用 xshell6 工具登录服务器 (命令行)

1. 需要会基础 Linux 指令

#### Xftp7 将本地的文件上传到云服务器 (可视化)

#### nginx 反向代理

1. 为什么访问 ip 地址, 就可以访问到项目?
   例如 ip 地址为: http://82.156.11.187/
   在服务器上 => /root/jch/www/shangpinhui/dist (前端代码), 用户访问http://82.156.11.187/, 如何让用户直接访问到 dist 中的 index 文件?

2. 项目数据来自http://39.98.123.211, 不是当前的服务器

##### nginx

1. xshell 进入根目录 /etc
2. 进入 etc 目录, 在该目录下有一个 nginx 目录, 进入 nginx 目录[如果没安装过 nginx, 只有 4-5 个文件]
3. 如果要安装 nginx, yum install nginx
4. 安装完 nginx, nginx 目录下会有一个 nginx.conf 文件, 要在 nginx.conf 文件中进行编辑, 配置 nginx
5. 进行编辑 nginx.config 文件: vim nginx.conf (指令), 主要添加如下两项

(不能直接粘贴复制)

```解决第一个问题 1. 为什么访问 ip 地址, 就可以访问到项目?
   location / {
    root /root/jch/www/shangpinhui/dist;
    index index.html;
    try_files $url $url/ index.html;
   }
```

```解决第二个问题 2. 项目数据来自http://39.98.123.211, 不是当前的服务器
  location /api{
    proxy_pass http://39.98.123.211;
  }
```

6. 启动 nginx 服务器
   service nginx start
