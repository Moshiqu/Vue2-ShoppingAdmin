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