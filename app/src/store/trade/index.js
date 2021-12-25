import { reqGetTrade } from "@/api";

const state = {
    tradeInfo: {}
}
const mutations = {
    TRADEINFO(state, tradeInfo) {
        state.tradeInfo = tradeInfo
    }
}
const actions = {
    //  获取订单交易页信息
    async getTrade({ commit }) {
        const result = await reqGetTrade()
        if (result.code == 200) {
            // 假数据
            if (!result.data.userAddressList) {
                result.data.userAddressList = [
                    {
                        id: 1361,
                        userAddress: '北京市朝阳区远洋天地5号楼15',
                        userId: 2,
                        provinceId: 1,
                        consignee: '张龙',
                        isDefault: '0',
                        phoneNum: '15852016643'
                    },
                    {
                        id: 1363,
                        userAddress: '北京市北气家镇',
                        userId: 2,
                        provinceId: 1,
                        consignee: '张三',
                        isDefault: '1',
                        phoneNum: '15822222222'
                    },
                    {
                        id: 1364,
                        userAddress: '武汉市江夏区东湖网谷',
                        userId: 2,
                        provinceId: 24,
                        consignee: '李四',
                        isDefault: '0',
                        phoneNum: '1583333333'
                    },
                    {
                        id: 1365,
                        userAddress: '深圳市宝安区',
                        userId: 2,
                        provinceId: 26,
                        consignee: '王五',
                        isDefault: '0',
                        phoneNum: '15844444444'
                    },
                ]
            }
            commit('TRADEINFO', result.data)
        }
    }
}
const getters = {
    userAddressList(state) {
        return state.tradeInfo.userAddressList || []
    },
    detailArrayList(state) {
        return state.tradeInfo.detailArrayList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}