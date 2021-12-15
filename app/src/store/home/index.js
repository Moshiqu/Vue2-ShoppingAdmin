// home模块的小仓库
import { reqCategoryList } from "@/api"
// state: 仓库储存数据的地方
const state = {
    categoryList: []
}

// mutations: 修改state的唯一手段
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    }
}

// actions: 处理action, 可以书写自己的逻辑, 也可以处理异步
const actions = {
    // 通过API里的接口函数调用, 向服务器发送请求, 获取服务器数据
    async getCategoryList({commit}) {
        const result = await reqCategoryList()
        if (result.code == 200) {
            if(result.data.length > 16){
                // 如果数组长度大于了16 只取前16个
                result.data = result.data.splice(0,16)
            }
            commit('CATEGORYLIST',result.data)
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