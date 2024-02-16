<script setup>
// import { useRouter } from 'vue-router'
// import { ref } from 'vue'
// const router = useRouter()
const onClickLeft = () => history.back()
const requestList = [
  { requestName: 'napnap', requestPhoneHide: '138****1418', requestRealName: '杨*祥' },
  { requestName: 'kik kik', requestPhoneHide: '135****6953', requestRealName: '王*明' }
]
const onAdd = (phone) => {
  console.log(phone + 'add')
}
const onCancel = (phone) => {
  console.log(phone + 'cancel')
}
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="查看好友申请" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <van-list>
      <div class="cell-group" v-for="(item, index) in requestList" :key="index">
        <van-cell-group inset>
          <van-cell center>
            <template #title>
              <div class="item-value">{{ item.requestRealName }}</div>
            </template>
            <template #label>
              {{ item.requestPhoneHide }}
            </template>
            <template #value>
              <van-space>
                <van-button type="primary" size="small" plain @click="onAdd(item.requestPhoneHide)">同意</van-button>
                <van-button type="danger" size="small" plain @click="onCancel(item.requestPhoneHide)">忽略</van-button>
              </van-space>
            </template>
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
