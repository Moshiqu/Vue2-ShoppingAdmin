// home模块的小仓库
import { reqBannerList, reqCategoryList, reqFllowList } from "@/api"
// state: 仓库储存数据的地方
const state = {
    categoryList: [],
    bannerList: [],
    floorList: [],
    searchKeyword: ''
}

// mutations: 修改state的唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    FLOORLIST(state, floorList) {
        state.floorList = floorList
    },
    KEYWORD(state, keyword) {
        state.searchKeyword = keyword
    },

}

// actions: 处理action, 可以书写自己的逻辑, 也可以处理异步
const actions = {
    // 修改home页面的input中的关键字
    changeKeyWord({ commit }, keyword) {
        commit('KEYWORD', keyword)
    },
    // 通过API里的接口函数调用, 向服务器发送请求, 获取服务器数据
    async getCategoryList({ commit }) {
        const result = await reqCategoryList()
        if (result.code == 200) {
            if (result.data.length > 16) {
                // 如果数组长度大于了16 只取前16个
                result.data = result.data.splice(0, 16)
            }
            commit('CATEGORYLIST', result.data)
        }
    },
    async getBannerList({ commit }) {
        const result = await reqBannerList()
        if (result.code == 200) {
            commit('BANNERLIST', result.data)
        }
    },
    async getFloorList({ commit }) {
        const result = await reqFllowList()
        if (result.code == 200) {
            result.data.forEach(element => {
                element.recommendListFirst = element.recommendList.slice(0, 2)
                element.recommendListSecond = element.recommendList.slice(2, 4)
            });
            commit('FLOORLIST', result.data)
        }
    }
}

// getters: 理解为计算属性, 用于简化仓库数据, 让组件获取仓库数据更加方便
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}