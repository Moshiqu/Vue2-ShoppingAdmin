<template>
    <el-row :gutter="10">
        <el-col :span="6">
            <el-card shadow="always">
                <Detail count="￥ 126560" title="总销售额">
                    <template slot="charts">
                        <div class="flex-center">
                            <span class="flex-box">
                                周同比&nbsp;&nbsp;&nbsp;
                                56.67%&nbsp;
                                <svg
                                    t="1641563805917"
                                    class="icon"
                                    viewBox="0 0 1024 1024"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    p-id="2210"
                                    width="16"
                                    height="16"
                                >
                                    <path
                                        d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z"
                                        fill="#d81e06"
                                        p-id="2211"
                                    />
                                </svg>&nbsp;
                            </span>
                            <span class="flex-box">
                                周同比&nbsp;&nbsp;&nbsp;
                                56.67%&nbsp;
                                <svg
                                    t="1641563840759"
                                    class="icon"
                                    viewBox="0 0 1024 1024"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    p-id="3263"
                                    width="16"
                                    height="16"
                                >
                                    <path
                                        d="M512 618.666667L298.666667 405.333333h426.666666L512 618.666667z"
                                        fill="#1afa29"
                                        p-id="3264"
                                    />
                                </svg>
                            </span>
                        </div>
                    </template>
                    <template slot="footer">
                        <div>日销售额: ￥12423</div>
                    </template>
                </Detail>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card shadow="always">
                <Detail count="126560" title="访问量">
                    <template slot="footer">
                        <div>日访问量: 1234</div>
                    </template>
                </Detail>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card shadow="always">
                <Detail count="126560" title="支付笔数">
                    <template slot="footer">
                        <div>转化率: %66</div>
                    </template>
                </Detail>
            </el-card>
        </el-col>

        <el-col :span="6">
            <el-card shadow="always">
                <Detail count="78%" title="运营活动效果">
                    <template slot="footer">
                        <div>转化率: %66</div>
                    </template>
                </Detail>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import Detail from "./Detail/index.vue";
export default {
    name: "Card",
    components: { Detail }
}
</script>

<style lang="less">
.flex-center {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .flex-box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        svg {
            margin-left: 10px;
        }
    }
}
</style>