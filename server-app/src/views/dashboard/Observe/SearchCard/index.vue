<template>
    <el-card shadow="always">
        <div slot="header" class="search-header">
            <span>线上热门搜索</span>
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item>双皮奶</el-dropdown-item>
                    <el-dropdown-item>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-row :gutter="20">
            <el-col :span="12">
                <LineChart title="搜索用户数"></LineChart>
            </el-col>
            <el-col :span="12">
                <LineChart title="人均搜索次数"></LineChart>
            </el-col>
        </el-row>
        <el-table
            ref="filterTable"
            border
            :data="tableData"
            stripe
            style="width: 100%"
            class="table"
        >
            <el-table-column type="index" align="center" label="排名" width="80" column-key="date"></el-table-column>
            <el-table-column prop="keyword" label="搜索关键字" width="180"></el-table-column>
            <el-table-column prop="userCount" label="用户数" sortable></el-table-column>
            <el-table-column prop="rate" label="周涨幅" sortable></el-table-column>
        </el-table>
        <!-- @size-change="sizeChange"
        @current-change="currentChange"-->
        <el-pagination layout="prev, pager, next" :total="1000" class="pagination"></el-pagination>
    </el-card>
</template>

<script>
import LineChart from "./LineChart/index.vue";
export default {
    name: "Search",
    data() {
        return {
            tableData: [{}]
        }
    },
    components: { LineChart }
}
</script>

<style lang="less" scoped>
.search-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.table {
    margin-top: 10px;
}

.pagination {
    float: right;
}
</style>