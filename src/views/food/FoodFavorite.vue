<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { foodGetUserFavoriteListService } from '@/api/food'
import { useUserStore } from '@/stores'
import FoodListItem from './components/FoodListItem.vue'
const userStore = useUserStore()
const router = useRouter()
const onClickLeft = () => history.back()

// 列表
const foodList = ref([])
const foodListLoading = ref(false)
const foodListFinished = ref(false)
const onLoad = async () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  await getUserFavoriteFoodList()
  foodListLoading.value = false
  foodListFinished.value = true
}
const getUserFavoriteFoodList = async () => {
  const res = await foodGetUserFavoriteListService(userStore.user.id)
  foodList.value = res.data.data
}
onMounted(() => {
  getUserFavoriteFoodList()
})
</script>
<template>
  <div class="page-container">
    <van-nav-bar title="收藏的食物" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <van-list v-model:loading="foodListLoading" :finished="foodListFinished" finished-text="没有更多了" @load="onLoad">
      <food-list-item
        v-for="food in foodList"
        :key="food.foodId"
        :food="food"
        class="van-haptics-feedback"
        @click="router.push(`/food-detail?foodId=${food.foodId}`)"
      ></food-list-item>
    </van-list>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  background: #f6f7fb;
}
</style>
