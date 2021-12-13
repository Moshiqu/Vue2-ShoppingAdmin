// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用插件
Vue.use(VueRouter);

// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

//重写push和replace方法
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location,resolve,reject) {
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}

VueRouter.prototype.replace = function (location,resolve,reject) {
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}

// 配置路由
export default new VueRouter({
    routes: [
        // 重定型, 在项目跑起来的时候, 访问的'/', 立马定向到首页
        {
            path:'/',
            redirect:'/home'
        },
        {
            path: '/home',
            component: Home,
            meta:{show:true}
        },
        {
            path: '/login',
            component: Login,
            meta:{show:false}
        }, {
            path: '/register',
            component: Register,
            meta:{show:false}
        }, {
            path: '/search/:keyword?',
            component: Search,
            meta:{show:true},
            name:'search',
            // 路由组件能不能传递props数据
            // 布尔值写法: 只能传递params
            // props:true,
            //对象写法
            props:{a:1,b:2},
        },
    ]
})

