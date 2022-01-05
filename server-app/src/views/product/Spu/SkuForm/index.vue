<template>
    <el-form :model="skuInfo" label-width="80px" :inline="false" size="normal">
        <el-form-item label="SPU名称">{{ spu.spuName }}</el-form-item>
        <el-form-item label="SKU名称">
            <el-input v-model="skuInfo.skuName" placeholder="SKU名称"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
            <!-- @change="handleChange" -->
            <el-input-number
                v-model="skuInfo.price"
                placeholder="价格(元)"
                controls-position="right"
                :min="1"
            ></el-input-number>
        </el-form-item>
        <el-form-item label="重量(千克)">
            <el-input v-model="skuInfo.weight" placeholder="重量(千克)"></el-input>
        </el-form-item>
        <el-form-item label="规格描述">
            <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6 }"
                placeholder="规格描述"
                v-model="skuInfo.skuDesc"
            ></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form label-width="80px" :inline="true" size="normal" class="ml20">
                <el-form-item :label="attr.attrName" v-for="attr in attrInfoList" :key="attr.id">
                    <el-select placeholder="请选择" filterable v-model="attr.attrIdAndValueId">
                        <el-option
                            v-for="item in attr.attrValueList"
                            :key="item.id"
                            :label="item.valueName"
                            :value="`${attr.id}:${item.id}`"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form label-width="80px" :inline="true" size="normal" class="ml20">
                <el-form-item
                    :label="saleAttr.saleAttrName"
                    v-for="saleAttr in spuSaleAttrList"
                    :key="saleAttr.id"
                >
                    <el-select placeholder="请选择" v-model="saleAttr.saleIdAndValueId" filterable>
                        <el-option
                            v-for="item in saleAttr.spuSaleAttrValueList"
                            :key="item.id"
                            :label="item.saleAttrValueName"
                            :value="`${saleAttr.id}:${item.id}`"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片列表">
            <el-table :data="spuImageList" @selection-change="handlerSelectionChange" border stripe>
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="col.id" label="图片" width="col.width">
                    <template slot-scope="{row}">
                        <img :src="row.imgUrl" class="imgBox" />
                    </template>
                </el-table-column>
                <el-table-column prop="col.id" label="名称" width="col.width">
                    <template slot-scope="{row}">{{ row.imgName }}</template>
                </el-table-column>
                <el-table-column prop="col.id" label="操作" width="col.width">
                    <template slot-scope="{row}">
                        <el-button
                            v-show="row.isDefault == 0"
                            type="primary"
                            size="default"
                            @click="setDefault(row)"
                        >设为默认</el-button>
                        <el-tag
                            v-show="row.isDefault == 1"
                            type="success"
                            size="normal"
                            :disable-transitions="true"
                        >默认</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: "SkuForm",
    data() {
        return {
            spu: {},
            skuInfo: {
                // 从父组件传递
                category3Id: 0,
                spuId: 0,
                tmId: 0,
                // 从表单收集
                skuName: "",
                price: "",
                skuDesc: "",
                weight: "",
                // 从表单选择框收集
                // 图片
                skuImageList: [
                    // {
                    //     imgName: "string",
                    //     imgUrl: "string",
                    //     isDefault: "string",
                    //     spuImgId: 0,
                    // },
                ],
                skuDefaultImg: "", // 默认图片
                // 销售属性
                skuSaleAttrValueList: [
                    // {
                    //     id: 0,
                    //     saleAttrId: 0,
                    //     saleAttrName: "string",
                    //     saleAttrValueId: 0,
                    //     saleAttrValueName: "string",
                    //     skuId: 0,
                    //     spuId: 0,
                    // },
                ],
                // 平台属性
                skuAttrValueList: [
                    // {
                    //     attrId: 0,
                    //     valueId: 0,
                    // },
                ],
            },
            spuImageList: [], // spu图片
            spuSaleAttrList: [], // spu的销售属性列表
            attrInfoList: [], // 平台属性列表
            selectedImageList: []
        };
    },
    methods: {
        // 获取图片列表 | spu的销售属性列表
        initData(row, cateForm) {
            const { tmId, id, category3Id } = row;

            this.spu = row
            this.spuId = id;

            this.skuInfo.spuId = id;
            this.skuInfo.tmId = tmId;
            this.skuInfo.category3Id = category3Id;

            // spuImageList 图片列表
            this.$API.spu
                .reqGetSpuImageList(id)
                .then((res) => {
                    this.spuImageList = res.data;
                    this.spuImageList.forEach(item => {
                        this.$set(item, 'isDefault', 0)
                    })
                })
                .catch((err) => { });

            // spu的销售属性列表
            this.$API.spu
                .reqGetSpuSaleAttrList(id)
                .then((res) => {
                    this.spuSaleAttrList = res.data;
                })
                .catch((err) => { });

            // spu属性列表
            const { cate1Id, cate2Id, cate3Id } = cateForm;
            this.$API.spu
                .reqGetAttrInfoList({
                    category1Id: cate1Id,
                    category2Id: cate2Id,
                    category3Id: cate3Id,
                })
                .then((result) => {
                    this.attrInfoList = result.data;
                })
                .catch((err) => { });
        },
        // 设置默认图
        setDefault(img) {
            this.skuInfo.skuDefaultImg = img.imgUrl
            this.spuImageList.forEach(item => {
                item.isDefault = 0
            })
            img.isDefault = 1
        },
        // 复选框点击
        handlerSelectionChange(selection) {
            this.selectedImageList = selection
        },
        // 保存按钮
        save() {
            const { attrInfoList, skuInfo, spuSaleAttrList, selectedImageList } = this
            // 方法一
            // let arr = []
            // attrInfoList.forEach(item => {
            //     if (item.attrIdAndValueId) {
            //         const [attrId, valueId] = item.attrIdAndValueId.split(':')
            //         let obj = { attrId, valueId }
            //         arr.push(obj)
            //     }
            // })

            // this.skuInfo.skuAttrValueList = arr

            // 方法二
            // 整理平台属性
            skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
                if (item.attrIdAndValueId) {
                    const [attrId, valueId] = item.attrIdAndValueId.split(':')
                    prev.push({ attrId, valueId })
                }
                return prev
            }, [])

            // 整理销售属性
            skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
                if (item.saleIdAndValueId) {
                    const [saleAttrId, saleAttrValueId] = item.saleIdAndValueId.split(':')
                    prev.push({ saleAttrId, saleAttrValueId })
                }
                return prev
            }, [])

            // 整理图片列表
            skuInfo.skuImageList = selectedImageList.map(item => {
                return {
                    imgName: item.imgName,
                    imgUrl: item.imgUrl,
                    isDefault: item.isDefault,
                    spuImgId: item.spuId,
                }
            })

            this.$API.spu.reqSaveSkuInfo(skuInfo).then((result) => {
                this.$message({
                    type: "success",
                    message: '添加SKU成功'
                })
                this.$emit("changeScene", { scene: 0, flag: false }, false);
                this.cleanForm()
            }).catch((err) => {

            });
        },
        // 取消按钮
        cancel() {
            this.$emit("changeScene", { scene: 0, flag: true });
            this.cleanForm()
        },
        // 清除数据
        cleanForm() {
            Object.assign(this._data, this.$options.data())
        }
    },
};
</script>

<style>
.ml20 {
    margin-left: 20px;
}

.imgBox {
    width: 150px;
    height: 150px;
}
</style>