import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import Layout from '../views/layout/layout.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: 'home',
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
      },
      {
        path: '/cardList',
        name: 'cardList',
        component: () => import(/* webpackChunkName: "cardList" */ '../views/CardList.vue')
      },
      {
        path: '/listinfo',
        name: 'listinfo',
        component: () => import(/* webpackChunkName: "listionfo" */ '../components/ad/func.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL), // createWebHistory(process.env.BASE_URL),
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    // 是否在登录状态下
    const state: any = store.state
    if (state.system.isLogin) {
      if (to.matched.length === 0) {
        // 如果未匹配到路由
        from.path ? next({ path: from.path }) : next('/home')
        // 如果上级也未匹配到路由则跳转主页面，如果上级能匹配到则转上级路由
      } else {
        next()
      }
    } else {
      next('/login')
    }
  }
})
export default router
