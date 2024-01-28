<script setup>
import { ref } from 'vue'
const list = ref([])
const loading = ref(false)
const finished = ref(false)
const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1)
    }
    // 加载状态结束
    loading.value = false
    // 数据全部加载完成
    if (list.value.length >= 40) {
      finished.value = true
    }
  }, 1000)
}
// 查完后，装到这个list中
const food_list_by_category_and_tiny_category = ref([])
defineProps({
  food_category: {
    required: true,
    type: String
  },
  food_tiny_category: {
    required: true,
    type: String
  }
})
</script>

<template>
  <div>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in food_list_by_category_and_tiny_category" :key="item" :title="item" />
    </van-list>
  </div>
</template>
