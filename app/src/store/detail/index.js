import { reqGoodInfo, reqAddOrUpdateShopCart } from "@/api";

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
    },
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        const result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('添加商品出错'))
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