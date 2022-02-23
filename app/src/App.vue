<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件出口 -->
    <keep-alive include="Test">
      <router-view></router-view>
    </keep-alive>

    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'

export default {
  name: 'App',
  mounted() {
    // 通知vuex发送请求, 存储到仓库中
    this.$store.dispatch('getCategoryList')
    // 判断是否有token
    this.checkToken()
  },
  components: {
    Header,
    Footer
  },
  methods: {
    checkToken() {
      // 未登录
      const token = localStorage.getItem("USER_TOKEN") || sessionStorage.getItem('USER_TOKEN')
      if (token) {
        this.$store.dispatch('getUserInfo')
      }
    }
  },
}
</script>

<style>
</style>
