import { reqGetCode, reqRegister, reqLogin, reqGetUserInfo, reqLoginout } from "@/api";

const state = {
    user_token: '',
    userInfo: {}
}
const mutations = {
    GETUSERTOKEN(state, token) {
        state.user_token = token
    },
    USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    LOGOUT(state) {
        state.userInfo = {}
        state.user_token = ''
        localStorage.removeItem('USER_TOKEN')
        sessionStorage.removeItem('USER_TOKEN')
    },
}
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
    async loginByPassword({ commit }, params) {
        const { phone, password, isAuto } = params
        const result = await reqLogin({ phone, password })
        if (result.code == 200) {
            console.log(13);
            if (isAuto) {
                localStorage.setItem('USER_TOKEN', result.data.token)
            } else {
                sessionStorage.setItem('USER_TOKEN', result.data.token)
            }
            await commit('GETUSERTOKEN', result.data.token)
            return Promise.resolve(result)
        } else {
            return Promise.reject(result)
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        const result = await reqGetUserInfo()
        if (result.code == 200) {
            commit('USERINFO', result.data)
            const userToken = localStorage.getItem('USER_TOKEN') || sessionStorage.getItem('USER_TOKEN')
            if (userToken) {
                commit('GETUSERTOKEN', userToken)
            }
            return 'ok'
        } else {
            commit('LOGOUT')
            return 'fail'
        }
    },
    // 退出登录
    async logout({ commit }) {
        const result = await reqLoginout()
        if (result.code == 200) {
            commit('LOGOUT')
            return 'ok'
        } else {
            return Promise.reject(result.message)
        }
    },
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}