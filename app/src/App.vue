<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
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
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style>
</style>
