<template>
    <el-card shadow="always" class="card">
        <div class="card-box">
            <el-tabs v-model="activeName" class="right-box">
                <el-tab-pane label="销售额" name="销售额">
                    <el-row :gutter="20">
                        <el-col :span="18">
                            <div class="bar-chart" ref="barRef"></div>
                        </el-col>
                        <el-col :span="6">
                            <div class="topList">
                                <span class="topList-title">门店销售额排名</span>
                                <ul>
                                    <li>
                                        <span class="topList-left">1</span>
                                        <span class="topList-center">肯德基</span>
                                        <span class="topList-rigth">323,234</span>
                                    </li>
                                    <li>
                                        <span class="topList-left">2</span>
                                        <span class="topList-center">肯德基</span>
                                        <span class="topList-rigth">323,234</span>
                                    </li>
                                    <li>
                                        <span class="topList-left">3</span>
                                        <span class="topList-center">肯德基</span>
                                        <span class="topList-rigth">323,234</span>
                                    </li>
                                    <li>
                                        <span class="topList-left">4</span>
                                        <span class="topList-center">肯德基</span>
                                        <span class="topList-rigth">323,234</span>
                                    </li>
                                    <li>
                                        <span class="topList-left">5</span>
                                        <span class="topList-center">肯德基</span>
                                        <span class="topList-rigth">323,234</span>
                                    </li>
                                    <li>
                                        <span class="topList-left">6</span>
                                        <span class="topList-center">肯德基</span>
                                        <span class="topList-rigth">323,234</span>
                                    </li>
                                </ul>
                            </div>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="访问量" name="访问量">访问量</el-tab-pane>
            </el-tabs>
            <div class="left-box">
                <span>今日</span>
                <span>本周</span>
                <span>本月</span>
                <span>本年</span>
                <el-date-picker
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="mini"
                    class="date-picker"
                ></el-date-picker>
            </div>
        </div>
    </el-card>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: 'Sale',
    data() {
        return {
            activeName: '销售额'
        }
    },
    mounted() {
        this.initChart()
    },
    methods: {
        initChart() {
            let barChart = echarts.init(this.$refs.barRef)
            barChart.setOption({
                title: {
                    text: "销售额趋势"
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", '八月', '九月', '十月', '十一月', '十二月'],
                    axisTick: {
                        alignWidthLabel: true
                    }
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: "Direct",
                    type: "bar",
                    data: [5, 20, 36, 10, 10, 20, 4, 99, 12, 54, 23, 16],
                    barWidth: '60%',
                    color: 'yellowgreen'
                }],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                }
            })
        }
    },
}
</script>

<style lang="less" scoped>
.card {
    margin-top: 10px;
}

.card-box {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.right-box {
    width: 100%;

    .topList {
        .topList-title {
            font-size: 18px;
            font-weight: 600;
        }

        ul {
            padding: 0;
            margin-bottom: 0;
            list-style: none;
            width: 100%;
            height: 300px;

            li {
                height: 15%;

                .topList-left {
                    display: inline-block;
                    background-color: #000;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    color: #fff;
                    margin-right: 30px;
                    text-align: center;
                    line-height: 20px;
                    font-size: 14px;
                    box-sizing: border-box;
                }

                .topList-rigth {
                    float: right;
                }
            }
        }
    }
}

.left-box {
    display: flex;
    align-items: center;
    position: absolute;
    top: 5px;
    right: 0;

    span {
        margin: 0 5px;
    }
    .date-picker {
        width: 200px;
        margin: 0 20px;
    }
}

.bar-chart {
    width: 100%;
    height: 300px;
}

/deep/.el-card__body {
    padding-top: 0;
}
</style>