<script setup>
import { ref, onMounted } from 'vue'
import { useHistoryListStore } from '@/stores'
import { useRouter } from 'vue-router'
const router = useRouter()

const historyListStore = useHistoryListStore()
const userInput = ref('')
const onClickLeft = () => history.back()
const searchInput = ref(null)

const onSearch = (value) => {
  //点击搜索历史，进行搜索
  if (value !== '') {
    historyListStore.addHistoryItem(value)
  }
  userInput.value = ''
  router.push(`/foodlist?search=${value}`)
}

const toClearHistory = () => {
  historyListStore.clearHistory()
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
      <van-search v-model="userInput" ref="searchInput" show-action placeholder="请输入搜索关键词" @search="onSearch(userInput)" />
    </form>
    <!-- 搜索历史 -->
    <div class="search-history">
      <div class="title">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="20" @click="toClearHistory()" />
      </div>
      <div class="list" v-if="historyListStore.historyList.length > 0">
        <div v-for="item in historyListStore.reversedHistoryList" :key="item" class="list-item" @click="onSearch(item)">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-weight: bold;
  color: #046b99;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  margin: 10px;
}
.list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0 10px;
  gap: 5%;
  margin-left: 15px;
}
.list-item {
  width: 15%;
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
  min-height: 100vh;
  background: #f6f7fb;
}
</style>
