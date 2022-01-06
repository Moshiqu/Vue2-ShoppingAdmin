<template>
  <div>
    <el-card>
      <CategorySelector @getCategoryForm="getCategoryForm" :valid="scene != 0"></CategorySelector>
    </el-card>
    <!-- 展示spu -->
    <el-card class="mt20" v-show="scene == 0">
      <!-- 添加按钮 -->
      <el-button
        type="primary"
        size="default"
        @click="addSPU"
        icon="el-icon-plus"
        :disabled="!cateForm.cate3Id"
      >添加SPU</el-button>

      <!-- 表格 -->
      <el-table :data="spuList" border stripe class="mt20">
        <el-table-column align="center" type="index" label="序号" width="150"></el-table-column>
        <el-table-column prop="spuName" label="spu名称"></el-table-column>
        <el-table-column prop="description" label="spu描述"></el-table-column>
        <el-table-column prop="prop" label="操作" width="300">
          <template slot-scope="{row}">
            <HintButton
              type="success"
              size="mini"
              @click="addSku(row)"
              icon="el-icon-plus"
              title="添加sku"
            ></HintButton>
            <HintButton
              type="warning"
              size="mini"
              @click="editSpu(row)"
              icon="el-icon-edit"
              title="修改spu"
            ></HintButton>
            <HintButton
              type="info"
              size="mini"
              @click="checkSku(row)"
              icon="el-icon-info"
              title="查看当前spu全部sku列表"
            ></HintButton>
            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
              <HintButton
                type="danger"
                size="mini"
                icon="el-icon-delete"
                title="删除spu"
                slot="reference"
              ></HintButton>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <el-pagination
        :page-sizes="[3, 5, 10]"
        :page-size="pageSize"
        :current-page="pageIndex"
        @current-change="getSpuList"
        @size-change="handleSizeChange"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        style="margin-top: 20px; text-align: center"
      ></el-pagination>
    </el-card>
    <!-- 添加spu -->
    <el-card class="mt20" v-show="scene == 1">
      <SpuForm @changeScene="changeScene" ref="spuRef"></SpuForm>
    </el-card>
    <!-- 添加或修改sku -->
    <el-card class="mt20" v-show="scene == 2">
      <SkuForm @changeScene="changeScene" ref="skuRef"></SkuForm>
    </el-card>

    <el-dialog
      :title="`${selectedSpu.spuName}的SKU列表`"
      :visible.sync="dialogSkuInfoVisible"
      :before-close="closeDialog"
    >
      <el-table :data="skuInfoList" v-loading="isLoding">
        <el-table-column prop="skuName" label="名称"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="weight" label="重量"></el-table-column>
        <el-table-column label="默认图片">
          <template slot-scope="{row}">
            <img :src="row.skuDefaultImg" :alt="row.skuDesc" class="imgBox" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from "./SpuForm/index.vue";
import SkuForm from "./SkuForm/index.vue";
export default {
  name: "Spu",
  data() {
    return {
      cateForm: {},
      spuList: [],
      pageIndex: 1,
      pageSize: 3,
      total: 0,
      scene: 0, // 0: 展示spu; 1: 添加spu; 2: 添加或修改sku
      dialogSkuInfoVisible: false, // sku对话框
      skuInfoList: [], // sku信息
      selectedSpu: {}, // 查看sku的spu
      isLoding: true, // sku表格的loading
    };
  },
  watch: {
    cateForm: {
      handler(n) {
        if (!n.cate3Id) {
          this.spuList = [];
        }
      },
      deep: true
    }
  },
  methods: {
    // 自定义事件回调 传回来的是分类的id
    getCategoryForm(cateForm) {
      this.cateForm = cateForm;
      // 获取数据列表
      this.getSpuList();
    },
    // 获取spuList
    getSpuList(page = 1) {
      this.pageIndex = page;
      this.$API.spu
        .reqGetSpuList(this.pageIndex, this.pageSize, this.cateForm.cate3Id)
        .then((result) => {
          this.spuList = result.data.records;
          this.total = result.data.total;
        })
        .catch((err) => { console.log(err); });
    },
    // 添加SPU按钮
    addSPU() {
      this.scene = 1
      console.log('添加SPU按钮');
      this.$refs.spuRef.createData(this.cateForm.cate3Id)
    },
    // 修改Spu按钮
    editSpu(row) {
      this.scene = 1
      this.$refs.spuRef.initData(row.id)
      console.log('修改Spu按钮');
    },
    // 添加sku按钮
    addSku(row) {
      this.scene = 2
      console.log('添加sku按钮');
      this.$refs.skuRef.initData(row, this.cateForm)
    },
    // 修改场景值
    changeScene({ scene, flag }, reload = true) {
      // reload 为true, 重新加载数据; false, 不需要重新加载数据
      // flag 为true, 修改(当前页); false, 添加(第一页)
      this.scene = scene
      if (!reload) return

      if (flag) {
        this.getSpuList(this.pageIndex)
      } else {
        this.getSpuList()
      }
    },
    // 改变分页器中的pageSize
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getSpuList();
    },
    // 删除spu
    deleteSpu(row) {
      console.log(row);
      this.$API.spu.reqDeleteSpu(row.id).then((result) => {
        this.$message({
          type: 'success',
          message: '删除SPU成功'
        })
        this.getSpuList(this.spuList.length > 1 ? this.pageIndex : this.pageIndex - 1)
      }).catch((err) => {

      });
    },
    // 获取sku信息
    checkSku(spu) {
      // 获取数据
      this.selectedSpu = spu
      this.dialogSkuInfoVisible = true
      this.$API.spu.reqGetSkuBySpuId(spu.id).then((result) => {
        this.skuInfoList = result.data
        this.isLoding = false
      }).catch((err) => {
      });
    },
    //关闭dialog
    closeDialog(done) {
      // 清空数据
      this.skuInfoList = []
      this.selectedSpu = {}
      this.isLoding = true
      done()
    }
  },
  components: { SpuForm, SkuForm }
};
</script>

<style lang="less">
.mt20 {
  margin: 20px 0;
}

.imgBox {
  width: 150px;
  height: 150px;
}
</style>
