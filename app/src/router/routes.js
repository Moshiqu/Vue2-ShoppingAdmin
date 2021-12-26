// 路由配置信息

// 引入一级路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from "@/pages/Pay"
import PaySuccess from '@/pages/PaySuccess'
import Center from "@/pages/Center"

// 引入二级路由组件
import MyOrder from "@/pages/Center/myOrder"
import GroupOrder from "@/pages/Center/groupOrder"

const routes = [
    // 重定型, 在项目跑起来的时候, 访问的'/', 立马定向到首页
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        meta: { show: true }
    },
    {
        path: '/detail/:skuid?',
        component: Detail,
        meta: { show: true },
        name: 'detail'
    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }
    }, {
        path: '/register',
        component: Register,
        meta: { show: false }
    }, {
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true },
        name: 'search',
        // 路由组件能不能传递props数据
        // 布尔值写法: 只能传递params
        // props:true,
        //对象写法
        props: { a: 1, b: 2 },
    }, {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: '/shopcart',
        name: 'shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: '/trade',
        name: 'trade',
        component: Trade,
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (to.path == '/shopcart') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: Pay,
        beforeEnter: (to, from, next) => {
            if (to.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    }, {
        path: '/paysuccess',
        name: "paysuccess",
        component: PaySuccess
    }, {
        path: '/center',
        name: 'center',
        component: Center,
        children: [
            {
                path: '/center',
                redirect: '/center/myorder'
            }, {
                path: 'myorder',
                component: MyOrder
            }, {
                path: 'grouporder',
                component: GroupOrder
            }
        ]
    }
]

export default routes