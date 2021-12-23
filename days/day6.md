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

一般需要用 tryCatch 和 await 来接受一个函数 return 返回的 promise

## 23.23

### 浏览器的储存功能 HTML5 新增的

#### 本地存储 --- 存储的是字符串

持久化, 有上限(5M): 关闭浏览器, 关机, 存储的数据不会丢失

#### 会话存储 --- 存储的是字符串

非持久化, 会话结束, 数据会消失
