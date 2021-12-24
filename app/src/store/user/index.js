import { reqGetCode, reqRegister, reqLogin } from "@/api";

const state = {}
const mutations = {}
const actions = {
    async getCode({ commit }, phoneNum) {
        const result = await reqGetCode(phoneNum)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('验证码发送失败'))
        }
    },
    // 用户注册
    async register({ commit }, params) {
        const result = await reqRegister(params)
        if (result.code == 200) {
            console.log(result.data);
            return 'ok'
        } else {
            return Promise.reject(result)
        }
    },
    // 用户登录
    async reqLogin({ commit }, params) {
        const result = await reqLogin(params)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('登录失败'))
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