<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import FoodPageContainer from '@/views/food/components/FoodPageContainerInFoodPage.vue'
import foodCategoryColumns from '@/components/FoodCategoryColumns.js'
const router = useRouter()
const activeSidebar = ref(0)
const activeTabs = ref(0)
const showChilren = computed(() => {
  return foodCategoryColumns[activeSidebar.value].children
})
const onClick = () => {
  router.push('/foodsearch')
}
</script>
<template>
  <div class="page-container">
    <van-nav-bar title="食物库" fixed placeholder />
    <van-search placeholder="请输入搜索关键词" @click="onClick" />
    <div class="content-container">
      <div class="sidebar-content-container">
        <van-sidebar v-model="activeSidebar" class="food-sidebar">
          <!-- 谷类、薯类、淀粉 -->
          <van-sidebar-item v-for="item in foodCategoryColumns" :title="item.text" :key="item.index" />
        </van-sidebar>
      </div>
      <!-- 内容显示区域 -->
      <div class="content-display">
        <van-tabs v-model="activeTabs">
          <!-- 以后改成v-for 向子元素传入食物类（food_category）、食物子类（food_tiny_category）van-tab标题为子类 -->
          <!-- food-page-container里面有list -->
          <van-tab v-for="item in showChilren" :title="item.text" :key="item.index">
            <food-page-container> </food-page-container>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<style scoped>
.food-sidebar {
  /* height: 110vh; */
  --van-sidebar-width: 80px;
  --van-sidebar-font-size: 12px;
  --van-sidebar-padding: 10px;
}
.content-container {
  display: flex;
  width: 100%;
}

.content-display {
  flex-grow: 1;
  padding: 20px;
  flex-grow: 1; /* 允许元素占据剩余空间 */
  /* background: #f6f7fb; */
  /* overflow-y: auto; */

  overflow: auto; /* 添加滚动条 */
  max-height: 100vh; /* 设定最大高度为视窗高度，确保内容不会溢出屏幕 */
}
</style>
