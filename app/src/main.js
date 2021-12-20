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

// 第一个参数, 全局组件的名字, 第二个参数, 哪一个组件--- 注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagenation.name, Pagenation)

new Vue({
  render: h => h(App),
  // 全局事件总线 $bus
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  // 注册路由
  // 注册路由信息: 当这里书写router的时候, 组件身上都拥有$route属性
  router,
  // 注册仓库: 组件实例的身上会有一个$store
  store
}).$mount('#app')


