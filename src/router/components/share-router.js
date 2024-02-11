export default [
  { path: '/share', component: () => import('@/views/share/SharePage.vue') },
  { path: '/share-add', component: () => import('@/views/share/ShareAddPage.vue') },
  { path: '/share-check', component: () => import('@/views/share/CheckFriendRequest.vue') }
]
