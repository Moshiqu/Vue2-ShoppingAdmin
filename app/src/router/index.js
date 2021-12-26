// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';

import store from "@/store";

// 使用插件
Vue.use(VueRouter);

import routes from './routes'

//重写push和replace方法, 相同路由跳转相同路由 会报错

let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 配置路由
let router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})

// 全局守卫： 前置守卫， （在路由跳转之前进行判断）
router.beforeEach((to, from, next) => {
    const userToken = store.state.user.user_token
    const userName = store.state.user.userInfo.name
    // next:放行函数 next()放行 next(path)放行到指定的路由 next(false)
    if (userToken) {
        if (to.path == '/login' || to.path == '/register') {
            // 登录情况下 去login, register
            next('/home')
        } else {
            // 登录情况下 去的不是login, register
            if (userName) {
                // userInfo有数据
                next()
            } else {
                // userInfo没有数据
                store.dispatch('getUserInfo').then(res => {
                    next()
                }).catch(err => {
                    this.$router.push('/login')
                })
            }
        }
    } else {
        // 未登录状态下, 不能放行交易相关, 支付相关
        if (to.path.indexOf('/trade') != -1 || to.path.indexOf('/pay') != -1 || to.path.indexOf('/center') != -1) {
            next('/login?redirect=' + to.path)
        } else {
            next()
        }
    }
})

export default router

