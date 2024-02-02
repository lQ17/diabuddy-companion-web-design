export default [
  { path: '/food-favorite', component: () => import('@/views/food/FoodFavorite.vue') },
  { path: '/foodlist', component: () => import('@/views/food/FoodList.vue') },
  { path: '/foodsearch', component: () => import('@/views/food/FoodSearch.vue') },
  // 路由动态传参 /food-detail?foodId=xxx
  { path: '/food-detail', component: () => import('@/views/food/FoodDetail.vue') },
  { path: '/food-detail-more', component: () => import('@/views/food/FoodDetailMore.vue') }
]
