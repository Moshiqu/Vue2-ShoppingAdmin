<template>
    <el-card shadow="always">
        <div slot="header" class="card-header">
            <span>销售额类别占比</span>
            <el-radio-group v-model="radio" size="mini">
                <el-radio-button label="全部渠道"></el-radio-button>
                <el-radio-button label="线上"></el-radio-button>
                <el-radio-button label="门店"></el-radio-button>
            </el-radio-group>
        </div>
        <!-- card body -->
        <div class="chart" ref="pieChart"></div>
    </el-card>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: 'Category',
    data() {
        return {
            radio: '全部渠道'
        }
    },
    mounted() {
        this.initChart()
    },
    methods: {
        initChart() {
            let pieChart = echarts.init(this.$refs.pieChart)
            pieChart.setOption({
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: true,
                            position: 'outside'
                        },
                        labelLine: {
                            show: true
                        },
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ]
                    }
                ]
            })
            pieChart.on('mouseover', params => {
                const { name, value } = params
                pieChart.setOption({
                    title: {
                        text: `${name}`,
                        subtext: `${value}`,
                        top: 'center',
                        left: "center"
                    }
                })
            });
        }
    },
}
</script>

<style lang="less" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/deep/ .el-card__header {
    padding: 13px 20px;
}

.chart {
    width: 100%;
    height: 300px;
}
</style>