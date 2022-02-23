<template>
    <div>
        <div>Child</div>
        <input v-focus type="text" />
        {{ str | capitalize }}
        <Child2 />
    </div>
</template>

<script>
import Child2 from "../Child2/index.vue";
export default {
    name: "Child",
    data() {
        return {
            str: "zxcvzxcv"
        };
    },
    mounted() {
        console.log("child挂载");
    },
    directives: {
        focus: {
            // 指令的定义
            inserted: function (el, bindding) {
                el.focus(); // 页面加载完成之后自动让输入框获取到焦点的小功能
            }
        }
    },
    filters: {
        capitalize: function (value) {
            console.log(value);
            if (!value) return "";
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    },
    beforeDestroy() {
    },
    components: { Child2 }
}
</script>

<style>
</style>