import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
// 引入路由
import router from "@/router";
// 三级联动组件--- 引入全局组件
import TypeNav from "@/components/TypeNav"
// 轮播图组件
import Carousel from '@/components/Carousel'
// 分页组件
import Pagenation from '@/components/Pagination'
// 引入mock
import '@/mock/mockServer'
// 引入swiper的样式
import 'swiper/css/swiper.css'

// 全局引入
import * as API from "@/api"

// 按需引入elementUI
import { Button, MessageBox } from 'element-ui';

// 第一个参数, 全局组件的名字, 第二个参数, 哪一个组件--- 注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagenation.name, Pagenation)

// ElementUI注册组件方式之一
Vue.component(Button.name, Button)

// ElementUI注册组件方式之一
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

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

// 引入vee-validate 插件
import "@/plugins/validate"

new Vue({
  render: h => h(App),
  // 全局事件总线 $bus
  beforeCreate() {
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


