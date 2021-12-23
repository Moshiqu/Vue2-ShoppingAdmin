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

```JavaScript
    localStorage.setItem('key', value)
    localStorage.getItem('key')
```

#### 会话存储 --- 存储的是字符串

非持久化, 会话结束, 数据会消失

```JavaScript
    sessionStorage.setItem('key', value)
    sessionStorage.getItem('key')
```

### uuid

```JavaScript
    import { v4 as uuidv4 } from 'uuid';
    uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
```

每一次调用都会生成唯一的一个 id, 所以只能调用一次, 并且要永久化储存(locaStorage)

### Promise.all()

Promise.all([p1,p2,p3])
当所有的 promise(p1,p2,p3)返回的结果都为成功, 那么 Promise.all([p1,p2,p3])的结果就是成功, 如果有一个或多个 promise 的结果为失败, 那么 Promise.all([p1,p2,p3])的结果就是失败
