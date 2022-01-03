// 平台属性模块请求文件
import request from "@/utils/request";

// 获取一级分类 GET /admin/product/getCategory1
export const reqGetCate1List = () => request({ url: `/admin/product/getCategory1`, method: "get" });

// 获取二级分类 GET /admin/product/getCategory2/{category1Id}
export const reqGetCate2List = (category1Id) => request({ url: `/admin/product/getCategory2/${category1Id}`, method: "get" });

// 获取三级分类 GET /admin/product/getCategory3/{category2Id}
export const reqGetCate3List = (category2Id) => request({ url: `/admin/product/getCategory3/${category2Id}`, method: "get" });

// 获取产品信息 GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqGetAttrsList = ({ cate1Id, cate2Id, cate3Id }) => request({ url: `/admin/product/attrInfoList/${cate1Id}/${cate2Id}/${cate3Id}`, method: "GET", });

// 添加属性与属性值 POST /admin/product/saveAttrInfo
export const reqSaveOrUpdateAttrInfo = data => request({ url: '/admin/product/saveAttrInfo', method: 'post', data })
