<template>
    <el-card shadow="always" class="card">
        <div class="card-box">
            <el-tabs v-model="activeName" class="right-box">
                <el-tab-pane label="销售额" name="sale"></el-tab-pane>
                <el-tab-pane label="访问量" name="visit"></el-tab-pane>
            </el-tabs>
            <div class="left-box">
                <span @click="setDay">今日</span>
                <span @click="setWeek">本周</span>
                <span @click="setMonth">本月</span>
                <span @click="setYear">本年</span>
                <el-date-picker
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="mini"
                    class="date-picker"
                    v-model="date"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
            </div>
        </div>
        <div class="chart-box">
            <el-row :gutter="20">
                <el-col :span="18">
                    <div class="bar-chart" ref="barRef"></div>
                </el-col>
                <el-col :span="6">
                    <div class="topList">
                        <span class="topList-title">门店{{ title }}排名</span>
                        <ul>
                            <li class="topList-item">
                                <span>1</span>
                                <span>肯德基</span>
                                <span>323,234</span>
                            </li>
                            <li class="topList-item">
                                <span>2</span>
                                <span>肯德基</span>
                                <span>323,234</span>
                            </li>
                            <li class="topList-item">
                                <span>3</span>
                                <span>肯德基</span>
                                <span>323,234</span>
                            </li>
                            <li class="topList-item">
                                <span>4</span>
                                <span>肯德基</span>
                                <span>323,234</span>
                            </li>
                            <li class="topList-item">
                                <span>5</span>
                                <span>肯德基</span>
                                <span>323,234</span>
                            </li>
                            <li class="topList-item">
                                <span>6</span>
                                <span>肯德基</span>
                                <span>323,234</span>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'
export default {
    name: 'Sale',
    data() {
        return {
            activeName: 'sale',
            date: [],
            dateFormat: 'YYYY-MM-DD'
        }
    },
    computed: {
        title() {
            return this.activeName == 'sale' ? '销售额' : '访问量'
        }
    },
    watch: {
        activeName(nv, ov) {
            let barChart = echarts.getInstanceByDom(this.$refs.barRef)
            barChart.setOption({
                title: {
                    text: nv == 'sale' ? "销售额趋势" : "访问量趋势"
                },
            })
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
        },
        // 设置当天
        setDay() {
            const day = dayjs().format(this.dateFormat)
            this.date = [day, day]
        },
        setWeek() {
            const start = dayjs().day(1).format(this.dateFormat)
            const end = dayjs().day(7).format(this.dateFormat)
            this.date = [start, end]
        },
        setMonth() {
            const start = dayjs().startOf('month').format(this.dateFormat)
            const end = dayjs().endOf('month').format(this.dateFormat)
            this.date = [start, end]
        },
        setYear() {
            const start = dayjs().startOf('year').format(this.dateFormat)
            const end = dayjs().endOf('year').format(this.dateFormat)
            this.date = [start, end]
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

.chart-box {
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

            .topList-item {
                height: 15%;

                span:first-child {
                    display: inline-block;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    margin-right: 30px;
                    text-align: center;
                    line-height: 20px;
                    font-size: 14px;
                    box-sizing: border-box;
                    color: #fff;
                    background-color: #000;
                }

                span:last-child {
                    float: right;
                }
            }

            .topList-item:nth-child(n + 4) {
                span:first-child {
                    color: #000;
                    background-color: #fff;
                }
            }
        }
    }
}
.right-box {
    width: 100%;
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
        width: 250px;
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