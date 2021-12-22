## 12.20

### vue v-for 可以遍历对象, 数组, 数字, 字符串

## 手写分页器

## 12.21

### 路由跳转的滚动行为

```javaScript
    // 配置路由
    export default new VueRouter({
        routes,
        // 滚动行为
        scrollBehavior(to, from, savedPosition) {
            return { y: 0 }
        }
    })
```

### 排他

先将所有的 isChecked 变为未选择状态, 然后把选中的选项变为选中状态

## 23.22

### 涉及用户输入的地方, 需要考虑数字, 中文, 字母, 符号(+,-,...)

### async await 的函数, 返回的是一个 promise
