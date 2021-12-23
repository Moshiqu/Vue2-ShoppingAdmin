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