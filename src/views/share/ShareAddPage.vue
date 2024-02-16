<script setup>
// import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { showSuccessToast } from '@/components/vantComponents'
// const router = useRouter()
const usernameOrPhone = ref('')
const onClickLeft = () => history.back()
const shareList = [
  { sharerName: 'napnap', sharerPhoneHide: '138****1418', sharerRealName: '杨*祥' },
  { sharerName: 'kik kik', sharerPhoneHide: '135****6953', sharerRealName: '王*明' }
]
const handleAdd = () => {
  showSuccessToast('已发送请求')
}
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="添加亲友" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <van-search v-model="usernameOrPhone" placeholder="请输入亲友的手机号或者用户名" shape="round" />
    <van-list>
      <div class="cell-group" v-for="(item, index) in shareList" :key="index">
        <van-cell-group inset>
          <van-cell center is-link @click="handleAdd">
            <template #title>
              <div class="item-value">{{ item.sharerRealName }}</div>
            </template>
            <template #label>
              {{ item.sharerName }}
            </template>
            <template #value>{{ item.sharerPhoneHide }}</template>
          </van-cell>
        </van-cell-group>
      </div>
    </van-list>
  </div>
</template>

<style scoped>
.cell-group {
  padding-top: 10px;
  /* padding-left: 10px; */
  padding-bottom: 0px;
  /* padding-right: 10px; */
}
.page-container {
  height: 100vh;
  background: #f6f7fb;
}
</style>
