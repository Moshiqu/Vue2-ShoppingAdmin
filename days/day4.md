## 12.15

### 复习

#### 商品分类的三级列表由静态变为动态形式(获取服务器数据: 解决跨域问题)

#### 函数的防抖与节流

#### 路由跳转: 声明式导航(router-link), 编程式导航()

如果用声明式导航 会使用<router-link>组件, 在商品分类中, 会创建几百个 router-link 组件实例, 占用内存
编程式导航 + 自定义属性解决

### 商品三级分类列表优化

在 APP.vue 根组件中发请求, 根组件 mounted 只执行一次, 拿到数据后 储存在 vuex 仓库中

### 开发 Home 首页当中的 ListContainer 组件与 floor 组件?

https://docschina.org/
本项目服务器返回的数据(接口)只有商品分类菜单数据, 对于 ListContainer 组件与 Floor 组件数据, 服务器没有提供

#### mock 数据(模拟): 需要使用 mockjs 插件

使用步骤:

1. 在项目中 src 文件夹创建 mock 文件夹
2. 准备 JSON 数据(mock 文件夹中创建相应的 JSON 文件) ----格式化, 不能有空格
3. 把 mock 数据需要的图片放置到 public 看文件夹中【public 文件夹在打包的时候， 会把相应的资源原封不动打包到 dist 文件夹
4. 创建 mockServer.js 通过 mockServer 插件实现模拟数据
5. mockServer.js 文件在入口文件中引入(至少需要执行一次,才能模拟数据)

## 12.17

### swiper 插件

#### 安装 swiper5 版本

npm install --save swiper@5
注意:

1. html 中需要有 swiper 结构, 需要导入 swiper 的 css 样式
2. 初始化实例之前, 必须要有 swiper 结构, 并且有数据才能创建实例成功

### watch + nextTick

#### watch: 在服务器返回数据后, 拿到数据之后

#### $nextTick

nextTick: 在下次 DOM 更新循环结束(譬如 v-for 渲染完成之后, 已经有了 html 结构)之后执行延迟回调。在修改数据之后(譬如从服务器返回数据之后|watch, 已经有了数据)立即使用这个方法，获取更新后的 DOM

#### $ref

vue 中 最好不要用 document.querySelector()去选择元素, 使用 $refs.(ref)

### 组件传参

1. props: 用于父子组件通信
2. 自定义事件: @on @emit 可以实现子给父通信
3. 全局事件总线: $bus 全能
4. pubsub-js: vue 当中几乎不用 全能
5. 插槽
6. vuex
