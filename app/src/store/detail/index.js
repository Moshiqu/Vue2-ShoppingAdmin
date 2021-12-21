import { reqGoodInfo } from "@/api";

const state = {
    goodInfo: {}
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const actions = {
    async getGoodInfo({ commit }, skuid) {
        const result = await reqGoodInfo(skuid)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    }
}
const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        console.log(state.goodInfo.spuSaleAttrList);
        if (state.goodInfo.spuSaleAttrList) {
            state.goodInfo.spuSaleAttrList.forEach(item => {
                item.spuSaleAttrValueList.forEach(element => {
                    element.isChecked = 0
                })
            })
        }
        return state.goodInfo.spuSaleAttrList || []
    },
}

export default {
    state,
    actions,
    mutations,
    getters
}