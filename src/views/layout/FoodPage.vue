<script setup>
import { ref } from 'vue'
import FoodPageContainer from '@/views/food/components/FoodPageContainerInFoodPage.vue'
const activeSidebar = ref(0)
const activeTabs = ref(0)
</script>
<template>
  <div class="page-container">
    <van-nav-bar title="食物库" fixed placeholder />
    <van-search placeholder="请输入搜索关键词" />
    <div class="sidebar-content-container">
      <div>
        <van-sidebar v-model="activeSidebar" class="food-sidebar">
          <!-- 谷类、薯类、淀粉 -->
          <van-sidebar-item title="谷薯类" />
          <van-sidebar-item title="豆类" />
          <van-sidebar-item title="蔬菜类" />
          <van-sidebar-item title="菌藻类" />
          <van-sidebar-item title="水果类" />
          <van-sidebar-item title="坚果类" />
          <!-- 禽类、畜类 -->
          <van-sidebar-item title="禽畜肉类" />
          <!-- 蛋类、奶类 -->
          <van-sidebar-item title="蛋奶类" />
          <van-sidebar-item title="鱼虾蟹贝类" />
          <van-sidebar-item title="婴幼儿食品" />
          <van-sidebar-item title="小吃糕点" />
          <van-sidebar-item title="速食食品" />
          <van-sidebar-item title="饮料、酒类" />
          <van-sidebar-item title="糖果类" />
          <van-sidebar-item title="油脂类" />
          <van-sidebar-item title="调味品类" />
          <van-sidebar-item title="其它" />
          <van-sidebar-item title=" " />
        </van-sidebar>
      </div>
      <!-- 内容显示区域 -->
      <div class="content-display">
        <van-tabs v-model="activeTabs">
          <!-- 以后改成v-for 向子元素传入食物类（food_category）、食物子类（food_tiny_category）van-tab标题为子类 -->
          <!-- food-page-container里面有list -->
          <van-tab title="小麦"><food-page-container> </food-page-container></van-tab>
          <van-tab title="标签 2"><food-page-container> </food-page-container></van-tab>
          <van-tab title="标签 3"><food-page-container> </food-page-container></van-tab>
          <van-tab title="标签 4"><food-page-container> </food-page-container></van-tab>
          <van-tab title="标签 5"><food-page-container> </food-page-container></van-tab>
          <van-tab title="标签 6"><food-page-container> </food-page-container></van-tab>
          <van-tab title="标签 7"><food-page-container> </food-page-container></van-tab>
          <van-tab title="标签 8"><food-page-container> </food-page-container></van-tab>
          <van-tab title="标签 9"><food-page-container> </food-page-container></van-tab>
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
.sidebar-content-container {
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
