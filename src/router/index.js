import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/view/login/index'
import Home from '@/view/home/index'
import Layout from '@/view/layout/index'
import Shop from '@/view/shop/index'
import Cart from '@/view/cart/Index'
import BookDetail from '@/view/book/index'
import Settings from '@/view/settings/index'
import Order from '@/view/order/index'
import Register from '@/view/register/index'
Vue.use(Layout)
Vue.use(Home)
Vue.use(Shop)
Vue.use(VueRouter)
Vue.use(Login)
Vue.use(Cart)
Vue.use(BookDetail)
Vue.use(Settings)
Vue.use(Register)
Vue.use(Order)
const routes = [
    {
        path: '/login',
        name : 'login',
        component: Login

    },
    {
      path : '/register',
      name : 'register',
      component: Register
    },
    {
        path: '/',
        component : Layout,
        children : [
            {
                path: '',
                name: 'home',
                component : Home
            },
            {
                path: '/shop',
                name: 'shop',
                component: Shop
            },
            {
                path: '/cart',
                name: 'cart',
                component: Cart
            },
            {
                path: '/book',
                name: 'bookDetail',
                component: BookDetail
            },
            {
                path: '/settings',
                name: 'settings',
                component: Settings
            },
            {
                path: '/order',
                name : 'order',
                component: Order
            }
        ]
    }

]


const router = new VueRouter({
    routes
})

export default router