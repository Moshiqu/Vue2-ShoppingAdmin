import request from "@/utils/request"

// 获取所有sku列表 GET /admin/product/list/{page}/{limit}
export const reqGetSkuList = ({ pageIndex, pageSize }) => request({ url: `/admin/product/list/${pageIndex}/${pageSize}`, method: "get" })

// 上架 GET /admin/product/onSale/{skuId}
export const reqOnSale = skuId => request({ url: `/admin/product/onSale/${skuId}`, method: "get" })

// 下架 GET /admin/product/cancelSale/{skuId}
export const reqCancelSale = skuId => request({ url: `/admin/product/cancelSale/${skuId}`, method: "get" })

// 获取sku详情 GET /admin/product/getSkuById/{skuId}
export const reqGETSkuInfo = skuId => request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get' })