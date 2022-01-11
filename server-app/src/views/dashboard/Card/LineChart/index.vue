<template>
    <div class="echart" ref="echartRef"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name: 'LineChart',
    data() {
        return {

        }
    },
    mounted() {
        this.initChart()
    },
    methods: {
        initChart() {
            // 初始化echarts实例
            let lineChart = echarts.init(this.$refs.echartRef)
            // 配置数据
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
                                offset: 0, color: 'purple' // 0% 处的颜色
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
                    // 铺满容器
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
.echart {
    height: 100%;
    width: 100%;
}
</style>