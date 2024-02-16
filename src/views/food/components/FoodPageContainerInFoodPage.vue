<script setup>
import { ref, defineProps, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import FoodListItem from '@/views/food/components/FoodListItem.vue'
import { foodGetListService } from '@/api/food'
const props = defineProps({
  foodCategory: {
    required: true,
    type: String
  },
  foodTinyCategory: {
    required: true,
    type: String
  }
})

const loading = ref(false)
const finished = ref(false)
const onLoad = async () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求

  // await getxxx()
  loading.value = false
  finished.value = true
}
// 查完后，装到这个list中
const foodListByCategoryAndTinyCategory = ref([])

const getListByCategoryAndTinyCategory = async () => {
  const res = await foodGetListService({ foodCategory: props.foodCategory, foodTinyCategory: props.foodTinyCategory })
  foodListByCategoryAndTinyCategory.value = res.data.data.list
}

// 监视 props.foodCategory 和 props.foodTinyCategory 的变化
watch(
  [() => props.foodCategory, () => props.foodTinyCategory],
  () => {
    getListByCategoryAndTinyCategory()
    // console.log(props.foodCategory, props.foodTinyCategory)
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <food-list-item
        v-for="food in foodListByCategoryAndTinyCategory"
        :key="food.foodName"
        :food="food"
        @click="router.push(`/food-detail?foodId=${food.foodId}`)"
      ></food-list-item>
    </van-list>
  </div>
</template>
