<template>
    <el-form :model="spuInfo" label-width="80px" :inline="false" size="normal">
        <el-form-item label="SPU名称">
            <el-input v-model="spuInfo.spuName"></el-input>
        </el-form-item>
        <el-form-item label="品牌">
            <el-select v-model="spuInfo.tmId" placeholder="请选择品牌" filterable>
                <el-option
                    v-for="item in tradeMarkList"
                    :key="item.id"
                    :label="item.tmName"
                    :value="item.id"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4 }"
                placeholder="SPU描述"
                v-model="spuInfo.description"
            ></el-input>
        </el-form-item>
        <el-form-item label="SPU图片">
            <el-upload
                action="/dev-api/admin/product/fileUpload"
                list-type="picture-card"
                :file-list="spuImageList"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handlerOnSccess"
            >
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-select v-model="attrIdAndName" :placeholder="`还有${unselectedSaleAttr.length}个未选择`">
                <el-option
                    v-for="item in unselectedSaleAttr"
                    :key="item.id"
                    :label="item.name"
                    :value="`${item.id}+${item.name}`"
                ></el-option>
            </el-select>
            <el-button
                type="primary"
                size="default"
                class="ml10"
                :disabled="!attrIdAndName"
                @click="addSaleAttr"
            >添加销售属性</el-button>
        </el-form-item>
        <el-form-item>
            <el-table border stripe :data="spuInfo.spuSaleAttrList">
                <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
                <el-table-column prop="saleAttrName" label="属性名" width="200"></el-table-column>
                <el-table-column prop="spuSaleAttrValueList" label="属性值名称列表">
                    <template slot-scope="{row}">
                        <el-tag
                            :key="tag.id"
                            v-for="(tag,index) in row.spuSaleAttrValueList"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(row, index)"
                        >{{ tag.saleAttrValueName }}</el-tag>
                        <el-input
                            class="input-new-tag"
                            v-if="row.inputVisible"
                            v-model="row.inputValue"
                            @blur="handleInputConfirm(row)"
                            @keyup.enter.native="handleInputConfirm(row)"
                            ref="saveTagInput"
                            size="small"
                        ></el-input>
                        <el-button
                            v-else
                            class="button-new-tag"
                            size="small"
                            @click="addSaleAttrValue(row)"
                        >+ 添加</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="prop" label="操作" width="150">
                    <template slot-scope="{$index}">
                        <el-button
                            type="danger"
                            size="mini"
                            icon="el-icon-delete"
                            @click="removeSpuAttr($index)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="$emit('changeScene', 0)">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'SpuForm',
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            attrList: [], // 销售属性
            attrIdAndName: '', // 未选择的销售属性id
            tradeMarkList: [], // 品牌列表
            spuInfo: {
                category3Id: 0,
                description: "",
                tmId: 0, // 品牌id
                spuName: '',
                spuImageList: [
                    // {
                    //     id: 0,
                    //     imgName: "",
                    //     imgUrl: "",
                    //     spuId: 0
                    // }
                ],
                spuSaleAttrList: [
                    // {
                    //     baseSaleAttrId: 0,
                    //     id: 0,
                    //     saleAttrName: "",
                    //     spuId: 0,
                    //     spuSaleAttrValueList: [
                    //         {
                    //             baseSaleAttrId: 0,
                    //             id: 0,
                    //             isChecked: "",
                    //             saleAttrName: "",
                    //             saleAttrValueName: "",
                    //             spuId: 0
                    //         }
                    //     ]
                    // }
                ],
            }, // spu信息
            spuImageList: [],
            inputValue: ''
        }
    },
    computed: {
        unselectedSaleAttr() {
            let resultArr = this.attrList.filter(item => {
                return this.spuInfo.spuSaleAttrList.every(item2 => {
                    return item.name != item2.saleAttrName
                })
            })
            return resultArr
        }
    },
    methods: {
        // 获取品牌列表 | 获取销售属性列表 | 获取spu数据
        initData(spuId) {
            // 获取品牌列表
            this.$API.spu.reqGetTradeMarkList().then((result) => {
                this.tradeMarkList = result.data
            }).catch((err) => {
                console.log(err);
            });
            // 获取销售属性列表
            this.$API.spu.reqGetAttrList().then((result) => {
                this.attrList = result.data
            }).catch((err) => {
                console.log(err);
            });
            // 获取spu数据
            this.$API.spu.reqGetSpuById(spuId).then((result) => {
                this.spuInfo = result.data
                this.spuInfo.spuSaleAttrList.forEach(item => {
                    this.$set(item, 'inputVisible', false)
                })
            }).catch((err) => {
                console.log(err);
            });
            // 获取spu图片列表
            this.$API.spu.reqGetSpuImageList(spuId).then((result) => {
                let arr = result.data
                arr.forEach(item => {
                    item.name = item.imgName
                    item.url = item.imgUrl
                })
                this.spuImageList = arr
            }).catch((err) => {
                console.log(err);
            });
        },
        // 图片移除
        handleRemove(file, fileList) {
            // file: 删除的那张图片
            // fileList: 照片墙删除某一张图片后剩下的图片
            // console.log(file, fileList);
            this.spuImageList = fileList
        },
        // 图片预览
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 图片上传成功
        handlerOnSccess(response, file, fileList) {
            this.spuImageList = fileList
        },
        // 添加销售属性
        addSaleAttr() {
            const [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split('+')
            this.spuInfo.spuSaleAttrList.push({
                baseSaleAttrId,
                saleAttrName,
                spuSaleAttrValueList: []
            })
            this.attrIdAndName = ''
        },
        // 点击添加属性值名称
        addSaleAttrValue(row) {
            this.$set(row, 'inputVisible', true)
            this.$set(row, 'inputValue', '')
        },
        // 失去焦点
        handleInputConfirm(row) {
            const { baseSaleAttrId, inputValue } = row
            if (inputValue.trim() == '') {
                row.inputVisible = false
                return
            }

            let result = row.spuSaleAttrValueList.every(item => item.saleAttrValueName != inputValue)
            if (!result) {
                this.$message('属性值已重复')
                row.inputVisible = false
                return
            }

            let newSaleAttrVlue = { baseSaleAttrId, saleAttrValueName: inputValue }
            row.spuSaleAttrValueList.push(newSaleAttrVlue)
            row.inputVisible = false
        },
        // 删除属性值
        handleClose(row, index) {
            row.spuSaleAttrValueList.splice(index, 1)
        },
        // 删除spu属性
        removeSpuAttr(index) {
            this.spuInfo.spuSaleAttrList.splice(index, 1)
        },
        // 保存按钮
        save() {
            this.spuInfo.spuImageList = this.spuImageList.map(item => {
                return {
                    imgName: item.name,
                    imgUrl: (item.response && item.response.data) || item.url
                }
            })
            this.$API.spu.reqSaveOrUpdateSpu(this.spuInfo).then((result) => {
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
                this.$emit('changeScene', 0)
            }).catch((err) => {

            });
        }
    },
}
</script>

<style>
.ml10 {
    margin-left: 10px;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>