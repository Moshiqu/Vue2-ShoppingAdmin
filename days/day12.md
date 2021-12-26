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
