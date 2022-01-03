<template>
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="一级分类">
      <el-select
        placeholder="请选择"
        v-model="cateForm.cate1Id"
        @change="getCate2"
        :disabled="valid"
      >
        <el-option
          v-for="item in cate1List"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select
        placeholder="请选择"
        v-model="cateForm.cate2Id"
        @change="getCate3"
        :disabled="valid"
      >
        <el-option
          v-for="item in cate2List"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select
        placeholder="请选择"
        v-model="cateForm.cate3Id"
        @change="getAttrsList"
        :disabled="valid"
      >
        <el-option
          v-for="item in cate3List"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "CategorySelector",
  props: {
    valid: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cate1List: [],
      cate2List: [],
      cate3List: [],
      cateForm: {
        cate1Id: "",
        cate2Id: "",
        cate3Id: "",
      }, // cateId集合
    };
  },
  mounted() {
    this.getCate1();
  },
  methods: {
    // 获取一级分类
    getCate1() {
      this.$API.attr
        .reqGetCate1List()
        .then((result) => {
          this.cate1List = result.data;
        })
        .catch((err) => {});
    },
    // 一级分类选择发生变化 获取二级分类
    getCate2() {
      this.cate2List = []; // 获取二级分类之前, 清空已选择的二级分类, 三级分类
      this.cate3List = [];
      this.cateForm.cate2Id = "";
      this.cateForm.cate3Id = "";

      this.$API.attr
        .reqGetCate2List(this.cateForm.cate1Id)
        .then((result) => {
          this.cate2List = result.data;
        })
        .catch((err) => {});
    },
    // 二级分类选择发生变化 获取三级分类
    getCate3() {
      this.cate3List = [];
      this.cateForm.cate3Id = "";

      this.$API.attr
        .reqGetCate3List(this.cateForm.cate2Id)
        .then((result) => {
          this.cate3List = result.data;
        })
        .catch((err) => {});
    },
    // 获取attr信息
    getAttrsList() {
      this.$emit("getCategoryForm", this.cateForm);
    },
  },
};
</script>

<style></style>
