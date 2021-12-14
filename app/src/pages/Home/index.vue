<template>
    <div>
        <!-- 三级联动组件: 三级联动组件已经注册为全局组件, 这里不需要再引入 -->
        <TypeNav />
        <ListContainer />
        <TodayRecommend />
        <Rank />
        <Like />
        <Floor />
        <Floor />
        <Brand />
    </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer"
import TodayRecommend from '@/pages/Home/TodayRecommend'
import Rank from '@/pages/Home/Rank'
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";


export default {
    name: "",
    components: {
        ListContainer,
        TodayRecommend,
        Rank,
        Like,
        Floor,
        Brand
    },
    computed: {
    },
    methods: {

    },
}
</script>

<style lang="less" scoped>
</style>