<template>
  <div>
    <el-table :data="skuList" border stripe class="mt20">
      <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
      <!-- :prop="col.id" -->
      <el-table-column prop="skuName" label="名称"></el-table-column>
      <el-table-column prop="skuDesc" label="描述"></el-table-column>
      <el-table-column label="默认图片" width="200" align="center">
        <template slot-scope="{row}">
          <img :src="row.skuDefaultImg" :alt="row.skuDesc" class="imgBox" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)"></el-table-column>
      <el-table-column prop="price" label="价格(元)" width="100"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="{row}">
          <HintButton
            v-if="row.isSale != 1"
            type="success"
            size="mini"
            icon="el-icon-top"
            title="上架"
            @click="handlerSale(row)"
          ></HintButton>
          <HintButton
            v-else
            type="info"
            size="mini"
            icon="el-icon-bottom"
            title="下架"
            @click="handlerCancel(row)"
          ></HintButton>
          <HintButton type="primary" size="mini" icon="el-icon-edit" title="编辑"></HintButton>
          <HintButton
            type="info"
            size="mini"
            icon="el-icon-info"
            title="查看"
            @click="viewSkuDetail(row)"
          ></HintButton>
          <HintButton type="danger" size="mini" icon="el-icon-delete" class="ml20" title="删除"></HintButton>
        </template>
      </el-table-column>
    </el-table>

    <!-- :before-close="handleClose" -->
    <el-drawer
      :visible.sync="isShowSkuDetail"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      size="50%"
      :withHeader="false"
      @closed="handlerClosed"
      v-loading="isShowDrawerLoading"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuDetail.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuDetail.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ `${skuDetail.price}元` }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            type="success"
            size="normal"
            v-for="attr in skuDetail.skuAttrValueList"
            :key="attr.id"
            class="mr10"
          >{{ `${attr.attrName}-${attr.valueName}` }}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <div class="goodsBoxContainer">
            <el-carousel height="400px" arrow="never" :interval="1500">
              <el-carousel-item v-for="pic in skuDetail.skuImageList" :key="pic.id">
                <img :src="pic.imgUrl" :alt="pic.imgName" class="centerBox" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
      </el-row>
    </el-drawer>

    <el-pagination
      :current-page.sync="pageIndex"
      :page-sizes="[5, 10, 20]"
      :page-size="pageSize"
      layout="  prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @size-change="sizeChange"
      @current-change="getData"
      background
      class="mt20"
      style="text-align: center;"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      pageIndex: 1,
      pageSize: 5,
      total: 0,
      skuList: [],
      isShowTop: true, // 展示向上箭头 
      isShowSkuDetail: false, // 展示sku详情
      skuDetail: {}, // sku详情
      isShowDrawerLoading: true
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(page = 1) {
      this.pageIndex = page;
      const { pageIndex, pageSize } = this;
      this.$API.sku.reqGetSkuList({ pageIndex, pageSize }).then((result) => {
        this.skuList = result.data.records;
        this.total = result.data.total;
      }).catch((err) => {
      });
    },
    sizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getData();
    },
    // 上架按钮
    handlerSale(sku) {
      this.$API.sku.reqOnSale(sku.id).then((result) => {
        this.$message({
          type: 'success',
          message: '上架成功'
        })
        sku.isSale = 1
      }).catch((err) => {

      });
    },
    // 下架按钮
    handlerCancel(sku) {
      this.$API.sku.reqCancelSale(sku.id).then((result) => {
        this.$message({
          type: 'success',
          message: '下架成功'
        })
        sku.isSale = 0
      }).catch((err) => {

      });
    },
    // 查看详情按钮
    viewSkuDetail(sku) {
      this.$API.sku.reqGETSkuInfo(sku.id).then((result) => {
        this.skuDetail = result.data
        this.isShowSkuDetail = true
      }).catch((err) => {

      });
    },
    // 关闭抽屉
    handlerClosed() {
      this.skuDetail = {}
    }
  },
};
</script>

<style lang="less" scoped>
.mt20 {
  margin-top: 20px;
}

.ml20 {
  margin-left: 20px;
}

.mr10 {
  margin-right: 10px;
}

.imgBox {
  width: 100px;
  height: 100px;
}

.centerBox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 200px;
  min-height: 200px;
  max-width: 400px;
  max-height: 400px;
}

.goodsBoxContainer {
  width: 400px;
  height: 400px;
  position: absolute;
  border: 1px solid #ccc;
  overflow: hidden;
}

.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}

.el-col {
  margin: 10px;
}
</style>
