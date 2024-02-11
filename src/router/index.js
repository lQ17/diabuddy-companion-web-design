import { createRouter, createWebHistory } from 'vue-router'
import settingRouter from '@/router/components/setting-router.js'
import tinyUtilsRouter from '@/router/components/tiny-utils-router.js'
import foodRouter from './components/food-router'
import recordRouter from './components/record-router'
import setDiaInfo from './components/set-dia-info'
import shareRouter from './components/share-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/home',
      children: [
        { path: '/home', component: () => import('@/views/layout/HomePage.vue') },
        { path: '/wiki', component: () => import('@/views/layout/WikiPage.vue') },
        { path: '/food', component: () => import('@/views/layout/FoodPage.vue') },
        { path: '/user', component: () => import('@/views/layout/UserPage.vue') }
      ]
    },

    { path: '/register', component: () => import('@/views/register/RegisterPage.vue') },
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    // 尚未开发
    { path: '/ud', component: () => import('@/views/err/UndevelopedPage.vue') },
    // 无法开发
    { path: '/cantd', component: () => import('@/views/err/CantDevelopePage.vue') },
    ...shareRouter,
    ...setDiaInfo,
    ...recordRouter,
    ...foodRouter,
    // 设置页面
    ...settingRouter,
    // 首页小工具页面
    ...tinyUtilsRouter,
    { path: '/:pathMatch(.*)*', component: () => import('@/views/err/NotFoundPage.vue') } // 通配符路由
  ]
})

export default router
