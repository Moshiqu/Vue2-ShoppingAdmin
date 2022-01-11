<template>
    <div class="chart" ref="chartRef"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: "BarChart",
    data() {
        return {

        }
    },
    mounted() {
        this.initChart()
    },
    methods: {
        initChart() {
            let barChart = echarts.init(this.$refs.chartRef)
            barChart.setOption({
                xAxis: {
                    show: false,
                    type: 'category'
                },
                yAxis: {
                    show: false
                },
                series: [{
                    type: 'bar',
                    data: [23, 44, 11, 56, 24, 15, 36, 12, 33, 6],
                    color: 'cyan'
                }],
                grid: {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                },
                tooltip: {

                }
            })
        }
    },
}
</script>

<style lang="less" scoped>
.chart {
    width: 100%;
    height: 100%;
}
</style>