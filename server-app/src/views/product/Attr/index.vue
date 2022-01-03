<template>
  <div>
    <el-card class="mt20">
      <CategorySelector
        @getCategoryForm="getCategoryForm"
        :valid="!isShowTable"
      />
    </el-card>
    <el-card v-show="isShowTable">
      <el-button
        type="primary"
        size="medium"
        icon="el-icon-plus"
        @click="addAttr"
        :disabled="!cateForm.cate3Id"
        >添加商品</el-button
      >
      <el-table :data="attrsList" border stripe class="mt20">
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="attrName" label="属性名称" width="150">
        </el-table-column>
        <el-table-column label="属性值列表">
          <template slot-scope="{ row }">
            <el-tag
              :key="tag.id"
              v-for="tag in row.attrValueList"
              :disable-transitions="false"
            >
              {{ tag.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="{ row }">
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-edit"
              @click="editAttr(row)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card v-show="!isShowTable">
      <el-form ref="form" :inline="true" size="normal" :model="attrInfo">
        <el-form-item label="属性名">
          <el-input placeholder="请输入属性名" v-model="attrInfo.attrName">
          </el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        size="default"
        @click="addAttrValue"
        icon="el-icon-plus"
        :disabled="!attrInfo.attrName"
        >添加属性值</el-button
      >
      <el-button @click="isShowTable = true"> 取消 </el-button>

      <el-table border stripe class="mt20" :data="attrInfo.attrValueList">
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="150"
        ></el-table-column>
        <el-table-column
          :prop="attrInfo.attrValueList.valueName"
          label="属性值名称"
        >
          <template slot-scope="{ row, $index }">
            <el-input
              v-model="row.valueName"
              placeholder="请输入属性值名称"
              size="mini"
              clearable
              v-if="row.flag"
              @blur="hideInput(row)"
              @keyup.native.enter="hideInput(row)"
              :ref="$index"
            ></el-input>
            <span
              style="display: block"
              @dblclick="handlerDbclick(row, $index)"
              v-else
              >{{ row.valueName }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="{ row, $index }">
            <el-popconfirm
              confirm-button-text="好的"
              cancel-button-text="不用了"
              icon="el-icon-info"
              icon-color="red"
              :title="`确定要删除${row.valueName}？`"
              @onConfirm="deleteValue($index)"
            >
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                slot="reference"
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        size="default"
        @click="save"
        :disabled="attrInfo.attrName && !attrInfo.attrValueList.length"
        >保存</el-button
      >
      <el-button @click="isShowTable = true">取消</el-button>
    </el-card>
  </div>
</template>

<script>
import CategorySelector from "@/components/CategorySelector";
export default {
  name: "Attr",
  components: {
    CategorySelector,
  },
  data() {
    return {
      attrsList: [],
      isShowTable: true,
      cateForm: {},
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      }, //收集或新增的数据表
    };
  },
  methods: {
    // 自定义事件回调 传回来的是分类的id
    getCategoryForm(cateForm) {
      this.cateForm = cateForm;
      this.$API.attr
        .reqGetAttrsList(cateForm)
        .then((result) => {
          this.attrsList = result.data;
        })
        .catch((err) => {});
    },
    // 添加属性
    addAttr() {
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.cateForm.cate3Id,
        categoryLevel: 3,
      };
      this.isShowTable = false;
    },
    // 添加属性值
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id || undefined,
        valueName: "",
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // 修改属性值
    editAttr(attr) {
      // 深拷贝
      this.attrInfo = JSON.parse(JSON.stringify(attr));
      this.attrInfo.attrValueList.forEach((item) => {
        // 这里新增的flag不是响应式布局
        // item.flag = false;
        this.$set(item, "flag", false);
      });
      this.isShowTable = false;
    },
    // 双击
    handlerDbclick(attr, index) {
      attr.flag = true;
      // 点击span的时候, 切换为input变为编辑模式, 但是需要注意, 对于浏览器而言, 页面的重绘和重排都是耗时间的
      // 点击span的时候, 重绘重排一个input他是需要耗费事件的, 所以不可能一点击span就立马获取到ref
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 隐藏输入框
    hideInput(attr) {
      if (attr.valueName.trim() == "") {
        // 如果输入的是空格 或者是空的字符串
        this.$message(`请输入正常的属性值`);
        return;
      }

      let isRepeat = this.attrInfo.attrValueList.some((item) => {
        // 将row从数组中剔除
        if (attr !== item) {
          return attr.valueName == item.valueName;
        }
      });
      if (isRepeat) {
        this.$message(`属性值已重复`);
        return;
      }

      attr.flag = false;
    },
    // 确认删除属性
    deleteValue(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
    // 保存
    save() {
      // 整理参数, 属性名为空的不传
      // 删除flag字段
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          if (item.valueName !== "") {
            delete item.flag;
            return true;
          }
        }
      );
      this.$API.attr
        .reqSaveOrUpdateAttrInfo(this.attrInfo)
        .then((result) => {
          console.log(result);
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.getCategoryForm(this.cateForm);
          this.isShowTable = true;
        })
        .catch((err) => {
          this.$message.error("保存失败");
        });
    },
    //取消
    cancel() {},
  },
};
</script>

<style lang="less">
.mt20 {
  margin: 20px 0;
}

.el-tag + .el-tag {
  margin-left: 10px;
  margin-top: 10px;
}
</style>
