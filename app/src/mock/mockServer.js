// 引入mock
import Mock from 'mockjs'

// 引入json数据格式
// webpack 默认对外暴露图片, JSON数据格式
import banner from '@/mock/banner.json'
import floor from '@/mock/floor.json'

// mock数据: 第一个参数, 请求地址; 第二个参数: 请求数据
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})