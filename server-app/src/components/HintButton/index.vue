<template>
    <a :title="title" class="m10">
        <el-button v-bind="$attrs" v-on="$listeners"></el-button>
    </a>
</template>

<script>
export default {
    name: 'HintButton',
    props: {
        title: {
            type: String,
            default: '点击'
        }
    },
}
</script>

<style lang="less">
.m10 {
    margin: 10px;
}
</style>