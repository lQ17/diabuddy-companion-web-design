import { createRouter, createWebHistory } from 'vue-router'

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
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    { path: '/register', component: () => import('@/views/register/RegisterPage.vue') },
    { path: '/record', component: () => import('@/views/record/RecordPage.vue') },
    { path: '/share', component: () => import('@/views/share/SharePage.vue') },
    { path: '/food/favorite', component: () => import('@/views/food_favorite/FoodFavorite.vue') },
    { path: '/foodlist', component: () => import('@/views/food/FoodList.vue') },
    // 路由动态传参
    { path: '/food/:food_id', component: () => import('@/views/food/FoodDetail.vue') }
  ]
})

export default router
