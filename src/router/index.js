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
    { path: '/food/:food_id', component: () => import('@/views/food/FoodDetail.vue') },
    { path: '/setting', component: () => import('@/views/setting/SettingPage.vue') },
    {
      path: '/setting/about-me',
      component: () => import('@/views/setting/page_in_setting/AboutMe.vue')
    },
    {
      path: '/setting/help-and-feed-back',
      component: () => import('@/views/setting/page_in_setting/HelpAndFeedBack.vue')
    },
    {
      path: '/setting/account-security-setting',
      component: () => import('@/views/setting/page_in_setting/AccountSecuritySetting.vue')
    },
    {
      path: '/setting/account-setting',
      component: () => import('@/views/setting/page_in_setting/AccountSetting.vue')
    },
    {
      path: '/setting/setting-username',
      component: () => import('@/views/setting/page_in_setting/page_in_account_base_info_setting/SettingUsername.vue')
    },
    {
      path: '/setting/setting-baseinfo',
      component: () => import('@/views/setting/page_in_setting/page_in_account_base_info_setting/SettingBaseInfo.vue')
    },
    {
      path: '/setting/change-phone',
      component: () => import('@/views/setting/page_in_setting/page_in_account_security_setting/ChangePhone.vue')
    },
    {
      path: '/setting/change-email',
      component: () => import('@/views/setting/page_in_setting/page_in_account_security_setting/ChangeEmail.vue')
    },
    {
      path: '/setting/change-password',
      component: () => import('@/views/setting/page_in_setting/page_in_account_security_setting/ChangePassword.vue')
    },
    {
      path: '/setting/cancel-account',
      component: () => import('@/views/setting/page_in_setting/page_in_account_security_setting/CancelAccount.vue')
    },

    { path: '/:pathMatch(.*)*', component: () => import('@/views/err/NotFoundPage.vue') } // 通配符路由
  ]
})

export default router
