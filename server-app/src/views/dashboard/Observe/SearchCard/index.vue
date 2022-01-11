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
        <el-table ref="filterTable" :data="tableData" style="width: 100%">
            <el-table-column
                prop="date"
                label="日期"
                sortable
                width="180"
                column-key="date"
                :filters="[{ text: '2016-05-01', value: '2016-05-01' }, { text: '2016-05-02', value: '2016-05-02' }, { text: '2016-05-03', value: '2016-05-03' }, { text: '2016-05-04', value: '2016-05-04' }]"
                :filter-method="filterHandler"
            ></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>
            <el-table-column
                prop="tag"
                label="标签"
                width="100"
                :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end"
            >
                <template slot-scope="scope">
                    <el-tag
                        :type="scope.row.tag === '家' ? 'primary' : 'success'"
                        disable-transitions
                    >{{ scope.row.tag }}</el-tag>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
import LineChart from "./LineChart/index.vue";
export default {
    name: "Search",
    components: { LineChart }
}
</script>

<style lang="less" scoped>
.search-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>