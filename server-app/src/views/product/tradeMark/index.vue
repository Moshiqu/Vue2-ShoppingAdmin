<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0"
      @click="showDialog"
      >添加</el-button
    >
    <!-- 显示表格 -->
    <el-table :data="list" border style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column prop="tmName" label="品牌名称"></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" style="height: 100px; width: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            @click="showDialog(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="showDelete(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      @size-change="handlerSizeChange"
      @current-change="getPageList"
      :current-page="this.pageIndex"
      :page-sizes="[3, 5, 10]"
      :page-size="this.pageSize"
      :pager-count="7"
      layout="prev, pager, next, jumper,->,total, sizes"
      :total="this.total"
      style="margin-top: 20px; text-align: center"
    ></el-pagination>

    <!-- dialog 添加表单对话框 -->
    <el-dialog
      :title="tradeMarkForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="tradeMarkForm"
        :rules="rules"
        ref="tradeMarkFormRef"
        style="width: 80%"
      >
        <el-form-item label="品牌名称" prop="tmName" label-width="100px">
          <el-input
            v-model="tradeMarkForm.tmName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="添加LOGO" prop="logoUrl" label-width="100px">
          <!-- 上传图片组件, 不能用v-model, 它不是表单元素 -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="tradeMarkForm.logoUrl"
              :src="tradeMarkForm.logoUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradMark",
  data() {
    return {
      pageIndex: 1,
      pageSize: 5,
      total: 0,
      list: [],
      dialogFormVisible: false, // 对话框显示与隐藏
      tradeMarkForm: {
        tmName: "",
        logoUrl: "",
      },
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2-10个字符", trigger: "change" },
        ],
        logoUrl: [{ required: true, message: "请上传图片" }],
      }, // 表单验证规则
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    async getPageList(page = 1) {
      this.pageIndex = page;
      const result = await this.$API.tradeMark.reqTradeMarkList(
        this.pageIndex,
        this.pageSize
      );
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      } else {
        this.$message.error("获取数据失败");
      }
    },
    handlerSizeChange(limit) {
      this.pageSize = limit;
      this.getPageList();
    },
    // 显示对话框
    showDialog(tradeMark) {
      this.tradeMarkForm.logoUrl = "";
      this.tradeMarkForm.tmName = "";
      this.tradeMarkForm.id = 0;
      if (tradeMark.id) {
        // 不能直接使this.tradeMarkForm = tradeMark
        // 因为this.tradeMarkForm和tradeMark都是对象, 直接赋值的话会使两个变量指向同一个地址
        // this.tradeMarkForm,tradeMark 对象内都是简单类型的数据, 可以使用浅拷贝
        this.tradeMarkForm = { ...tradeMark };
      }
      this.dialogFormVisible = true;
    },
    // 图片上次成功
    handleAvatarSuccess(res, file) {
      this.tradeMarkForm.logoUrl = res.data;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 添加或者修改品牌
    saveOrUpdateTradeMark() {
      this.$refs.tradeMarkFormRef.validate(async (validate) => {
        if (validate) {
          this.dialogFormVisible = false;
          const result = await this.$API.tradeMark.reqSaveOrUpdateTradeMark(
            this.tradeMarkForm
          );
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: this.tradeMarkForm.id ? "修改品牌成功" : "添加品牌成功",
            });
            this.getPageList(this.tradeMarkForm.id ? this.pageIndex : 1);
          } else {
            this.$message.error(
              this.tradeMarkForm.id ? "修改品牌失败" : "添加品牌失败"
            );
          }
        } else {
          console.warn("表单校验失败");
        }
      });
    },
    // 点击删除品牌
    showDelete(tradeMark) {
      this.$confirm(`此操作将永久删除${tradeMark.tmName}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await this.$API.tradeMark.reqDeleteTradeMark(tradeMark.id);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getPageList(
              this.list.length > 1 ? this.pageIndex : this.pageIndex - 1
            );
          } catch (error) {
            console.log("品牌删除失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
