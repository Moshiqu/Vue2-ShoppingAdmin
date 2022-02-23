<template>
    <div>
        <div @click.stop="showInject">child2</div>
        <div>-------</div>
    </div>
</template>

<script>
export default {
    name: "Child",
    data() {
        return {

        }
    },
    inject: ['provideData'],
    methods: {
        showInject() {
            console.log(this.provideData);
        }
    },
}
</script>

<style>
</style>