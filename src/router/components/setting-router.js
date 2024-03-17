export default [
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
  {
    path: '/setting/privacy',
    component: () => import('@/views/setting/page_in_setting/PrivacySetting.vue')
  }
]
