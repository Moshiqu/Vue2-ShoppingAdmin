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
