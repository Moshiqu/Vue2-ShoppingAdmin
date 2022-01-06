// spu模块接口
import request from '@/utils/request'

//获取spu列表 GET /admin/product/{page}/{limit}
export const reqGetSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } })

// 获取品牌列表 GET /admin/product/baseTrademark/getTrademarkList
export const reqGetTradeMarkList = () => request({ url: '/admin/product/baseTrademark/getTrademarkList', method: 'get' })

// 获取所有的销售属性 GET /admin/product/baseSaleAttrList
export const reqGetAttrList = () => request({ url: '/admin/product/baseSaleAttrList', method: 'get' })

// 获取指定spu的数据 GET /admin/product/getSpuById/{spuId}
export const reqGetSpuById = spuId => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })

// 获取指定spu的图片列表 GET /admin/product/spuImageList/{spuId}
export const reqGetSpuImageList = spuId => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })

// 新增 | 更新spu POST /admin/product/saveSpuInfo | POST /admin/product/updateSpuInfo
export const reqSaveOrUpdateSpu = data => {
    if (data.id) {
        return request({ url: `/admin/product/updateSpuInfo`, method: 'post', data })
    } else {
        return request({ url: `/admin/product/saveSpuInfo`, method: 'post', data })
    }
}

// 删除spu DELETE /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = spuId => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })

// 获取spu的销售属性列表 GET /admin/product/spuSaleAttrList/{spuId}
export const reqGetSpuSaleAttrList = spuId => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })

// 获取属性信息列表 GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqGetAttrInfoList = ({ category1Id, category2Id, category3Id }) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })

// 保存sku信息 POST /admin/product/saveSkuInfo
export const reqSaveSkuInfo = data => request({ url: "/admin/product/saveSkuInfo", method: "post", data })

// 根据spuId 获取所有SKU信息 GET /admin/product/findBySpuId/{spuId}
export const reqGetSkuBySpuId = spuId => request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get' })