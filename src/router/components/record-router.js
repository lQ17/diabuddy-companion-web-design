export default [
  { path: '/record', component: () => import('@/views/record/RecordPage.vue') },
  { path: '/check-record', component: () => import('@/views/record/CheckRecord.vue') },
  { path: '/check-record/detail', component: () => import('@/views/record/RecordDetailPage.vue') }
]
