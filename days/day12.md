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
