<script setup>
// import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { ref, onMounted } from 'vue'
import { showSuccessToast } from '@/components/vantComponents'
// const router = useRouter()
import { shareGetWaitListService, shareUpdateShareRequestService } from '@/api/share'
const onClickLeft = () => history.back()
const userStore = useUserStore()
const requestList = ref([])

/**  { requestName: 'napnap', requestPhoneHide: '138****1418', requestRealName: '杨*祥',id:11 },
  { requestName: 'kik kik', requestPhoneHide: '135****6953', requestRealName: '王*明',id:112 } */

// 同意
const onAdd = async (id) => {
  await shareUpdateShareRequestService(userStore.user.id, id, 'agree')
  const index = requestList.value.findIndex((item) => item.id === id)
  if (index !== -1) {
    requestList.value.splice(index, 1)
  }
  showSuccessToast('操作成功')
}

// 拒绝
const onCancel = async (id) => {
  await shareUpdateShareRequestService(userStore.user.id, id, 'refuse')
  const index = requestList.value.findIndex((item) => item.id === id)
  if (index !== -1) {
    requestList.value.splice(index, 1)
  }
  showSuccessToast('操作成功')
}

const initList = async () => {
  const res = await shareGetWaitListService(userStore.user.id)
  requestList.value = res.data.data.list
}

onMounted(() => {
  initList()
})
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="查看好友申请" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <van-list>
      <div class="cell-group" v-for="(item, index) in requestList" :key="index">
        <van-cell-group inset>
          <van-cell center>
            <template #title>
              <div class="item-value">{{ item.fullName }}</div>
            </template>
            <template #label>
              {{ item.phone }}
            </template>
            <template #value>
              <van-space>
                <van-button type="primary" size="small" plain @click="onAdd(item.id)">同意</van-button>
                <van-button type="danger" size="small" plain @click="onCancel(item.id)">拒绝</van-button>
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
