<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FoodListItem from './components/FoodListItem.vue'
const defaultFoodImg = 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
const router = useRouter()
const onClickLeft = () => history.back()

// 列表
const foodList = ref([
  { foodId: 1, foodName: '苹果', cal: 53, carb: 13.7, img: defaultFoodImg },
  { foodId: 2, foodName: '香蕉', cal: 93, carb: 22, img: defaultFoodImg },
  { foodId: 3, foodName: '草莓', cal: 32, carb: 7.1, img: defaultFoodImg }
])
const foodListLoading = ref(false)
const foodListFinished = ref(false)
const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  // setTimeout(() => {
  //   for (let i = 0; i < 10; i++) {
  //     foodList.value.push(foodList.value.length + 1)
  //   }
  //   // 加载状态结束
  //   foodListLoading.value = false
  //   // 数据全部加载完成
  //   if (foodList.value.length >= 20) {
  //     foodListFinished.value = true
  //   }
  // }, 1000)
  foodListLoading.value = false
  foodListFinished.value = true
}
</script>
<template>
  <div class="page-container">
    <van-nav-bar title="收藏的食物" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <van-list v-model:loading="foodListLoading" :finished="foodListFinished" finished-text="没有更多了" @load="onLoad">
      <food-list-item
        v-for="food in foodList"
        :key="food.foodName"
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
