<template>
    <div>
        <div class="card-header">
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
        <div class="card-content">{{ count }}</div>
        <div class="card-echarts">
            <slot name="charts"></slot>
        </div>
        <el-divider></el-divider>
        <div>
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "Detail",
    props: {
        title: {
            type: String,
            default: ''
        },
        count: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="less" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ccc;
    font-size: 20px;
}

.card-content {
    padding: 10px 0;
}

.card-echarts {
    height: 50px;
}

/deep/.el-divider {
    margin: 10px 0;
}
</style>