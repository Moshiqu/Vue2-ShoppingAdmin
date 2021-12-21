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
export const reqGoodInfo = (params) => requests({ url: `/item/${params}`, method: 'get' })