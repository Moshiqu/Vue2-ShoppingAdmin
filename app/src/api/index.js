// 当前这个模块: API统一管理
import requests from "./request";
// mock
import mockRequests from './mockRequest'

// 三级联动接口
// /api/product/getBaseCategoryList GET请求 无参数
// 发请求: axios发请求, 返回结果Promise对象

export const reqCategoryList = () => requests({ url: "/product/getBaseCategoryList", method: 'get' })

// 获取banner数据
export const reqBannerList = () => mockRequests({ url: '/banner', method: 'get' })

// 获取floor数据
export const reqFllowList = () => mockRequests({ url: '/floor', method: 'get' })

// 获取搜索页数据
export const reqGetSearchInfo = (params) => requests({ url: "/list", method: 'post', data: params })

// 获取商品详情
export const reqGoodInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

// 添加产品到购物车(或更新购物车中产品的数量)
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 获取购物车列表
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })

// 删除购物车商品
export const reqDeleteGood = skuId => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

// 发送验证码
export const reqGetCode = phoneNum => requests({ url: `/user/passport/sendCode/${phoneNum}`, method: 'get' })

// 用户注册
export const reqRegister = params => requests({ url: '/user/passport/register', method: "post", data: params })

// 用户登录
export const reqLogin = (params) => requests({ url: '/user/passport/login', method: 'post', data: params })

// 获取用户信息
export const reqGetUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: "get" })

// 退出登录
export const reqLoginout = () => requests({ url: '/user/passport/logout', method: 'get' })

// 获取订单交易页信息
export const reqGetTrade = () => requests({ url: "/order/auth/trade", method: 'get' })