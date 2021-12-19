## 12.12

### vue-cli 脚手架初始化项目

node_modules 文件夹: 项目依赖文件夹

public 文件夹:一般放置一些静态资源(图片), 需要注意, 放在 public 文件夹中的静态资源, webpack 进行打包的时候,会远方不懂打包到 dist 文件夹中.

src 文件夹(程序员源代码文件夹):
assets 文件夹: 一般也是放置静态资源(一般放置多个组件公用的静态资源), 需要注意, 放置在 assets 文件夹里面静态资源, 在 webpack 打包的时候, webpack 会把静态资源当作一个模块, 打包 JS 文件里面.

    components文件夹: 一般防止的是非路由组件(全局组件).

    App.vue: 唯一的根组件, vue当中的组件(.vue)

    mian.js: 程序入口文件, 也是整个程序当中最先执行的文件

babel.config.js: 配置文件(babel)

package.json 文件: 认为项目'身份证', 记录项目叫做什么, 项目当中有哪些依赖, 项目怎么运行.

package-lock.json: 缓存性文件

README.md: 说明性文件

### 项目其他配置

#### 运行项目时, 浏览器自动打开

-- package.json

```JavaScript
    "scripts": {
        "serve": "vue-cli-service serve --open",
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint"
    },
```

#### eslint 校验功能关闭

--在根目录下,创建 vue.config.js
// 关闭 eslint
lintOnSave:false

#### src 文件夹简写方法,配置别名

```JavaScript
    {
        "compilerOptions": {
            "baseUrl": "./",
            "paths": {
                "@/*": [
                    "src/*"
                ]
            }
        },
        "exclude": [
            "node_modules",
            "dist"
        ]
    }
```

### 项目路由的分析

vue-router
前端所谓路由: KV 键值对.
key: URL (地址栏中的路径)
value: 相应的路由组件

路由组件:
Home 首页路由组件, Search 路由组件, login 登录路由, Register 注册路由
非路由组件:
Header[首页,搜索页]
Footer[在首页.搜索页], 但在登录|注册页面时没有

### 完成非路由组件 Header 与 Footer 业务

在该项目中, 不以 HTML+CSS 为主, 主要处理业务, 逻辑
在开发项目的时候:

1. 书写静态页面(HTML+CSS)
2. 拆分组件
3. 获取服务器的数据动态展示
4. 完成相应的动态业务逻辑

注意 1. 创建组件的时候, 组件结构+组件样式+图片资源

注意 2. 项目采用 less 样式, 浏览器不支持 less 样式, 需要通过 less, less-loader [安装 5 版本] 进行处理 less, 把 less 样式变为 css 样式, 浏览器才能识别

注意 3. 如果想让组件识别 less 样式, 需要在 style 标签上添加 lang=less

#### 使用组件的步骤(非路由组件)

-创建或定义 -引入 -注册 -使用

### 路由组件的搭建

vue-router
目前有四个路由组件: Home, Search, Login, Register
-components 文件夹: 经常放置非路由组件(全局共用组件)
-pages|views 文件夹: 经常放置路由组件

#### 配置路由

项目当中配置的路由 一般放置于 router 文件夹中

#### 总结

路由组件与非路由组件的区别?
1: 路由组件一般放置于 pages|views 文件夹内, 非路由组件一般放置于 components 文件夹内
2: 路由组件一般需要在 router 文件夹中注册(使用的即为组件的名字)
3: 注册完路由, 不管是路由组件还是非路由组件, 身上都有$route,$router 属性

$route, 一般获取路由信息【路径、query、params等等】
$router，一般进行编程式导航进行路由跳转【push|replace】

#### 路由的跳转

路由的跳转有两种形式:
声明式导航 router-link, 可以进行路由的跳转
编程式导航 push|replace, 可以进行路由的跳转

编程式导航: 声明式导航能做到, 编程式导航都能做
但是编程式导航除了可以进行路由跳转, 还能做一些其他的业务逻辑

### Footer 组件的显示与隐藏

显示或隐藏组件: v-if|v-show
Footer 组件:在 Home,Search 显示
Footer 组件:在 Login,Register 隐藏

#### 可以根据组件身上的$route 获取当前路由信息, 通过路由路径判断 Footer 显示与隐藏

#### 配置路由的时候, 可以给路由添加路由元信息【meta】, 路由需要配置对象, 它的 key 不能乱写

## 12.13

### 路由传参

#### 路由跳转有几种方式

比如: A->B
声明式导航: router-link (务必要有 to 属性), 可以实现路由的跳转
编程式导航: 利用的是组件实例的$router.push|replace 方法, 可以实现路由的跳转,(书写一些自己的业务逻辑)

#### 路由传参, 传参有几种写法?

params 参数: 属于路径当中的一部分, 需要注意, 在配置路由的时候, 需要占位
query 参数: 不属于路径当中的一部分, 类似于 ajax 中的 queryString, /home?k=v&kv=, 不需要占位
一般使用对象的形式进行参数传递
this.$router.push({name:'search',params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}})
