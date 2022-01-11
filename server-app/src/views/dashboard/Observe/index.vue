<template>
    <el-row :gutter="10">
        <el-col :span="12">
            <Search></Search>
        </el-col>
        <el-col :span="12">
            <Category></Category>
        </el-col>
    </el-row>
</template>

<script>
import Category from "./Category/index.vue";
import Search from "./SearchCard/index.vue";
export default {
    name: "Observe",
    components: { Category, Search }
}
</script>

<style lang="less" scoped>
.el-card {
    margin-top: 10px;
}
</style>