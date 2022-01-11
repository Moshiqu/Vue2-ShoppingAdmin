<template>
    <div>
        <div class="title-box">
            <span>{{ title }}</span>
            <svg
                t="1641556525687"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2122"
                width="16"
                height="16"
            >
                <path
                    d="M512 14.208c274.56 0 497.792 223.168 497.792 497.792 0 274.56-223.168 497.792-497.792 497.792C237.44 1009.792 14.208 786.56 14.208 512 14.208 237.44 237.44 14.208 512 14.208z m0 71.104A427.072 427.072 0 0 0 85.312 512 427.072 427.072 0 0 0 512 938.688 427.072 427.072 0 0 0 938.688 512 427.072 427.072 0 0 0 512 85.312z m35.584 628.16v71.104H476.416v-71.04h71.168z m0-474.048v402.944H476.416V239.424h71.168z"
                    p-id="2123"
                    fill="#cccccc"
                />
            </svg>
        </div>
        <div class="title-text">
            <span class="title-left">12321</span>
            <span class="title-right">17.1</span>
            <!-- 上升 -->
            <svg
                t="1641563805917"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2210"
                width="16"
                height="16"
                v-show="true"
            >
                <path
                    d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z"
                    fill="#d81e06"
                    p-id="2211"
                />
            </svg>
            <!-- 下降 -->
            <svg
                t="1641563840759"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3263"
                width="16"
                height="16"
                v-show="false"
            >
                <path
                    d="M512 618.666667L298.666667 405.333333h426.666666L512 618.666667z"
                    fill="#1afa29"
                    p-id="3264"
                />
            </svg>
        </div>
        <div class="chart" ref="lineRef"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: 'LineChart',
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            let lineChart = echarts.init(this.$refs.lineRef)
            lineChart.setOption({
                xAxis: {
                    // 隐藏x轴
                    show: false,
                    type: 'category'
                },
                yAxis: {
                    // 隐藏y轴
                    show: false
                },
                // 系列
                series: [{
                    type: 'line',
                    data: [23, 44, 11, 56, 24, 15, 36, 12, 33, 6],
                    // 拐点样式
                    itemStyle: {
                        opacity: 0,
                    },
                    // 线条颜色
                    lineStyle: 'purple',
                    // 填充颜色
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'skyblue' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#fff' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    },
                    // 设置线条为曲线
                    smooth: true,
                }],
                // 布局
                grid: {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                }
            })
        }
    },
}
</script>

<style lang="less" scoped>
.chart {
    width: 100%;
    height: 100px;
}

.title-box {
    display: flex;
    align-items: center;
    color: #ccc;
}

.chart {
    width: 100%;
    height: 100px;
}

.title-box {
    display: flex;
    align-items: center;
    color: #ccc;

    svg {
        margin-left: 10px;
    }
}

.title-text {
    display: flex;
    align-items: flex-end;
    margin-top: 10px;

    .title-left {
        font-size: 20px;
        margin-right: 20px;
    }
}
</style>