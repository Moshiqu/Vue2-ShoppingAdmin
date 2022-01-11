<template>
    <div class="chart" ref="chartRef"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: 'ProcessChart',
    data() {
        return {

        }
    },
    mounted() {
        this.initChart()
    },
    methods: {
        initChart() {
            let processChart = echarts.init(this.$refs.chartRef)
            processChart.setOption({
                xAxis: {
                    show: false,
                    // 最小值
                    min: 0,
                    max: 100
                },
                yAxis: {
                    show: false,
                    // 均分
                    type: 'category'
                },
                series: [{
                    type: 'bar',
                    data: [78],
                    barWidth: 10,
                    color: 'yellowGreen',
                    showBackground: true,
                    backgroundStyle: {
                        color: "#eee"
                    },
                    // 文本标签
                    label: {
                        show: true,
                        formatter: '|',
                        position: 'right'
                    }
                }],

                grid: {
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                },
                tooltip: {}
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