export default [
  {
    path: '/utils/carb-fast-calculation',
    component: () => import('@/views/tiny_utils/CarbFastCalculation.vue')
  },
  {
    path: '/utils/insulin-adjustment',
    component: () => import('@/views/tiny_utils/InsulinAdjustment.vue')
  },
  {
    path: '/utils/insulin-pump-basal-rate',
    component: () => import('@/views/tiny_utils/InsulnPumpBasalRate.vue')
  },
  {
    path: '/utils/user-upload-food',
    component: () => import('@/views/tiny_utils/UserUploadFood.vue')
  },
  {
    path: '/utils/user-upload-food-detail',
    component: () => import('@/views/tiny_utils/UserMoreUploadFoodDetail.vue')
  },
  {
    path: '/utils/day-eating',
    component: () => import('@/views/tiny_utils/DayEating.vue')
  },
  {
    path: '/utils/ICR-calculation',
    component: () => import('@/views/tiny_utils/ICRCalculation.vue')
  },
  {
    path: '/utils/ISF-calculation',
    component: () => import('@/views/tiny_utils/ISFCalculation.vue')
  },
  {
    path: '/utils/TDD-calculation',
    component: () => import('@/views/tiny_utils/TDDCalculation.vue')
  }
]
