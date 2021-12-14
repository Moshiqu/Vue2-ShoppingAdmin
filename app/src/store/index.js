import Vue from "vue";
import Vuex from 'vuex';
import home from './home'
import search from './search'

// 需要插件使用一次
Vue.use(Vuex)

// 对外暴露Store的一个实例
export default new Vuex.Store({
    // 使用vuex仓库模块式开发存储数据
    modules: {
        home,
        search
    }
})