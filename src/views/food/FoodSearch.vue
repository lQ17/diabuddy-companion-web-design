<script setup>
import { ref, onMounted } from 'vue'
const userInput = ref('')
const onClickLeft = () => history.back()
const searchInput = ref(null)

const onSearch = () => {
  console.log('用户搜索了' + userInput.value)
}

//进入页面，搜索框自动获取焦点
onMounted(() => {
  if (searchInput.value) {
    searchInput.value.focus()
  }
})
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="搜索食物" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <form action="/">
      <van-search v-model="userInput" ref="searchInput" show-action placeholder="请输入搜索关键词" @search="onSearch" />
    </form>
    <!-- 搜索历史 -->
    <!-- <div class="search-history" v-if="history.length > 0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="16" @click="clear()" />
      </div>
      <div class="list">
        <div v-for="item in history" :key="item" class="list-item" @click="goSearch(item)">{{ item }}</div>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
.title {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
}
.list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0 10px;
  gap: 5%;
}
.list-item {
  width: 30%;
  text-align: center;
  padding: 7px;
  line-height: 15px;
  border-radius: 50px;
  background: #fff;
  font-size: 13px;
  border: 1px solid #efefef;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 10px;
}
.page-container {
  height: 100vh;
  background: #f6f7fb;
}
</style>
