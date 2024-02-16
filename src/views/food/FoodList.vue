<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import FoodListItem from './components/FoodListItem.vue'
import { foodGetListService } from '@/api/food'
const route = useRoute()
const router = useRouter()
const onClickLeft = () => history.back()
// 地址栏拿到的参数
const searchValue = ref('')
searchValue.value = route.query.search || ''

const onClick = () => {
  router.replace('/foodsearch')
}
// 列表
const foodList = ref([])
const foodListLoading = ref(false)
const foodListFinished = ref(false)
const onLoad = async () => {
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
  const res = await foodGetListService({ foodName: searchValue.value })
  foodList.value = res.data.data.list
  foodListLoading.value = false
  foodListFinished.value = true
}
</script>
<template>
  <div class="page-container">
    <van-nav-bar title="食物列表" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <van-search v-model="searchValue" @click="onClick" />
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
