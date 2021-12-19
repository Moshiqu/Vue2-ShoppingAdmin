// search模块的小仓库
import { reqGetSearchInfo } from "@/api";

const state = {
    searchList: {}
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    // 获取search数据
    async getSearchList({ commit }, params = {}) {
        const result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
const getters = {
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}