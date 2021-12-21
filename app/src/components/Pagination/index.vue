<template>
    <div class="pagination">
        <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
        <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)">1</button>
        <button v-if="startNumAndEndNum.start > 2">···</button>

        <template v-for="(page,index) in startNumAndEndNum.end">
            <button
                v-if="page > startNumAndEndNum.start - 1"
                :key="index"
                @click="$emit('getPageNo', page)"
                :class="{ active: page == pageNo }"
            >{{ page }}</button>
        </template>

        <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
        <button
            v-if="startNumAndEndNum.end < totalPage"
            @click="$emit('getPageNo', totalPage)"
        >{{ totalPage }}</button>
        <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页</button>

        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: {
        pageNo: Number,
        pageSize: Number,
        total: Number,
        continues: Number
    },
    data() {
        return {

        }
    },
    computed: {
        totalPage() {
            return Math.ceil(this.total / this.pageSize)
        },
        startNumAndEndNum() {
            const { continues, totalPage, pageNo } = this
            let start = 0
            let end = 0
            if (continues > totalPage) {
                // 总的页数 小于 中间要显示的页数数量
                start = 1
                end = totalPage
            } else {
                start = pageNo - parseInt(continues / 2)
                end = pageNo + parseInt(continues / 2)
                if (start < 1) {
                    // 分页器开头不能为负数和0
                    start = 0
                    end = continues
                }
                if (end > totalPage) {
                    // end 页数 大于了总页数
                    end = totalPage
                    start = totalPage - continues + 1
                }
            }
            return { start, end }
        }
    },
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>