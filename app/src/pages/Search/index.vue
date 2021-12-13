<template>
    <div>
        搜索
        <br>
        params传参--- {{params}}----{{a}}----{{b}}
        <br>
        query传参--- {{query}}
    </div>
</template>

<script>
export default{
    name:'',
    props:['keyword','a','b'],
    data() {
        return {
            params:this.$route.params.keyword || null,
            query:this.$route.query.k || null
        }
    },
}
</script>

<style lang="less" scoped>

</style>