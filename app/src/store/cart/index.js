import { reqCartList, reqDeleteGood } from "@/api";
import { getUUID } from "@/utils/uuid_token";

const state = {
    cartList: [],
    uuid_token: getUUID()
}
const mutations = {
    CARTLIST(state, cartList) {
        state.cartList = cartList || []
    }
}
const actions = {
    async getCartList({ commit }) {
        const result = await reqCartList()
        if (result.code == 200) {
            commit('CARTLIST', result.data)
        }
    },
    // 删除购物车商品
    async deleteCart({ commit }, skuId) {
        const result = await reqDeleteGood(skuId)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('删除商品失败'))
        }
    },
    // 删除选中的商品
    async deleteSelectedCart({ getters, dispatch }) {
        let promiseArr = []
        getters.cartInfoList.forEach(item => {
            const result = item.isChecked == 1 ? dispatch('deleteCart', item.skuId) : ''
            promiseArr.push(result)
        })
        let result = await Promise.all(promiseArr)
        return result
    }
}
const getters = {
    cartInfoList(state) {
        if (state.cartList[state.cartList.length - 1]) {
            state.cartList[state.cartList.length - 1].cartInfoList.forEach(element => {
                element.isChecked = 0
            });
            return state.cartList[state.cartList.length - 1].cartInfoList || []
        } else {
            return []
        }
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}