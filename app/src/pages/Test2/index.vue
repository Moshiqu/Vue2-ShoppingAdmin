<template>
    <div>
        <span>{{ count }}</span>
        <button @click="count++">++++++</button>
    </div>
</template>

<script>
export default {
    name: 'Test2',
    data() {
        return {
            count: 0
        }
    },
}
</script>

<style>
</style>