import { reqCartList } from "@/api";

const state = {
    cartList: []
}
const mutations = {
    CARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    async getCartList({ commit }) {
        const result = await reqCartList()
        if (result.code == 200) {
            commit('CARTLIST', result.data)
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}