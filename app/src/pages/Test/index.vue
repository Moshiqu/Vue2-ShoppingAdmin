<template>
    <div>
        <div>Test</div>
        <Child @click.native="cli"></Child>
        <span>{{ count }}</span>
        <button @click="count++">++++++</button>
        <div @click="messageChange">{{ message }}</div>
    </div>
</template>

<script>
import Child from "./Child/index.vue"
export default {
    name: "Test",
    data() {
        return {
            count: 0,
            name: 'li',
            message: 'message1111111'
        };
    },
    methods: {
        cli() {
            console.log(3213)
        },
        messageChange() {
            this.message = 'message222222'
            this.message = 'message333333'
            this.message = 'message444444'
            this.message = 'message555555'
            console.log(this.$el);
        },
    },
    provide() {
        return {
            provideData: this.name
        }
    },
    components: { Child }
}
</script>

<style>
</style>