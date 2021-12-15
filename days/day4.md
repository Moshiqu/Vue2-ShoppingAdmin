## 12.15
### 复习
#### 商品分类的三级列表由静态变为动态形式(获取服务器数据: 解决跨域问题)
#### 函数的防抖与节流
#### 路由跳转: 声明式导航(router-link), 编程式导航()
如果用声明式导航 会使用<router-link>组件, 在商品分类中, 会创建几百个router-link组件实例, 占用内存
编程式导航 + 自定义属性解决

### 商品三级分类列表优化
在APP.vue根组件中发请求, 根组件mounted只执行一次, 拿到数据后 储存在vuex仓库中

### 开发Home首页当中的ListContainer组件与floor组件?
https://docschina.org/
本项目服务器返回的数据(接口)只有商品分类菜单数据, 对于ListContainer组件与Floor组件数据, 服务器没有提供

#### mock数据(模拟): 需要使用mockjs插件
使用步骤:
1. 在项目中src文件夹创建mock文件夹
2. 准备JSON数据(mock文件夹中创建相应的JSON文件) ----格式化, 不能有空格
3. 把mock数据需要的图片放置到public看文件夹中【public文件夹在打包的时候， 会把相应的资源原封不动打包到dist文件夹
4. 创建mockServer.js 通过mockServer插件实现模拟数据
5. mockServer.js文件在入口文件中引入(至少需要执行一次,才能模拟数据)
