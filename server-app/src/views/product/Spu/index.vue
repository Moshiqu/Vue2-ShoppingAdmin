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
              @click="add(row)"
              icon="el-icon-info"
              title="查看当前spu全部sku列表"
            ></HintButton>
            <HintButton
              type="danger"
              size="mini"
              @click="add(row)"
              icon="el-icon-delete"
              title="删除spu"
            ></HintButton>
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
      <SkuForm></SkuForm>
    </el-card>
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
    addSPU(row) {
      this.scene = 1
      console.log('添加SPU按钮');
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
    },
    // 修改场景值
    changeScene(scene) {
      this.scene = scene
      this.getSpuList(this.pageIndex)
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getSpuList();
    },
  },
  components: { SpuForm, SkuForm }
};
</script>

<style lang="less">
.mt20 {
  margin: 20px 0;
}
</style>
