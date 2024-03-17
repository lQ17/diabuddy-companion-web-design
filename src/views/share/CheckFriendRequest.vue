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

const isEmptyList = ref(true)

const pullLoading = ref(false)
const onRefresh = () => {
  try {
    initList()
  } finally {
    pullLoading.value = false
  }
}

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
  try {
    const res = await shareGetWaitListService(userStore.user.id)
    requestList.value = res.data.data.list
    if (requestList.value) {
      isEmptyList.value = false
    } else {
      isEmptyList.value = true
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  initList()
})
const isLoading = ref(true)
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="查看好友申请" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <van-pull-refresh v-model="pullLoading" @refresh="onRefresh" success-text="刷新成功" style="min-height: 100vh">
      <van-list v-if="!isEmptyList" style="min-height: 90vh">
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
      <div v-else>
        <div id="emp-list" v-if="!isLoading">目前还没有收到好友申请，下滑屏幕刷新试试！</div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<style scoped>
#emp-list {
  text-align: center;
  margin-top: 50px;
  margin-left: 50px;
  margin-right: 50px;
  color: #808080;
  height: 90vh;
}
.cell-group {
  padding-top: 10px;
  /* padding-left: 10px; */
  padding-bottom: 0px;
  /* padding-right: 10px; */
}
.page-container {
  /* height: 100vh; */
  background: #f6f7fb;
}
</style>
