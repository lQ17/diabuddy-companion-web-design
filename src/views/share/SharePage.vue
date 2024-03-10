<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { shareGetListService, shareDeleteByIdService } from '@/api/share'
import { useUserStore } from '@/stores'
import { showLoadingToast, closeToast, showSuccessToast, showConfirmDialog } from '@/components/vantComponents'
const router = useRouter()
const userStore = useUserStore()
const onClickLeft = () => history.back()
const showPopoverRightTop = ref(false)
const shareList = ref([])
/*
{ sharerName: 'napnap', sharerPhoneHide: '138****1418', sharerRealName: '杨*祥', birthday: '2002-02-23' },
  { sharerName: 'kik kik', sharerPhoneHide: '135****6953', sharerRealName: '王*明', birthday: '1985-02-23' }
*/
const SearchOrCheckActions = [
  { text: '添加亲友', value: 1 },
  { text: '查看亲友申请', value: 2 }
]
const onSelectActions = (action) => {
  //添加亲友
  if (action.value === 1) {
    router.push('/share-add')
  }
  //查看亲友申请
  if (action.value === 2) {
    router.push('/share-check')
  }
}

const deleteFriend = async (id) => {
  showConfirmDialog({
    title: '确认要删除该好友吗？'
  })
    .then(async () => {
      // on confirm
      await shareDeleteByIdService(userStore.user.id, id)
      const index = shareList.value.findIndex((item) => item.id === id)
      if (index !== -1) {
        shareList.value.splice(index, 1)
      }
      showSuccessToast('删除成功')
    })
    .catch(() => {
      // on cancel
    })
}

// 年龄显示
const calculateAge = (birthdayStr) => {
  const birthday = new Date(birthdayStr)
  const today = new Date()
  let age = today.getFullYear() - birthday.getFullYear()
  const m = today.getMonth() - birthday.getMonth()

  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--
  }

  return age
}

const initList = async () => {
  try {
    const res = await shareGetListService(userStore.user.id)
    shareList.value = res.data.data.list
  } catch (error) {
    console.error('Failed to load the list:', error)
  } finally {
    // 无论请求成功还是失败，都关闭加载提示
    closeToast()
    isLoading.value = false
  }
}

const isEmptyList = computed(() => {
  return shareList.value.length === 0
})
const isLoading = ref(true)

// const loadingToast = showLoadingToast({
//   message: '加载中...',
//   forbidClick: true,
//   loadingType: 'spinner',
//   duration: 0
// })

onMounted(() => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  initList()
})
</script>

<template>
  <!-- 看亲友 -->
  <div class="page-container">
    <van-nav-bar title="看亲友" left-text="返回" left-arrow @click-left="onClickLeft" placeholder @click-right="showPopoverRightTop = true">
      <template #right>
        <van-popover v-model:show="showPopoverRightTop" :actions="SearchOrCheckActions" @select="onSelectActions" placement="bottom-end">
          <template #reference>
            <van-icon name="add-o" size="25px" />
          </template>
        </van-popover>
      </template>
    </van-nav-bar>
    <van-list v-if="!isEmptyList">
      <div class="cell-group" v-for="(item, index) in shareList" :key="index">
        <van-cell-group inset>
          <van-swipe-cell>
            <van-cell center is-link :to="`/check-record?id=${item.id}&username=${item.fullName}`">
              <template #title>
                <div class="item-value">{{ item.fullName }} {{ calculateAge(item.birthday) }}岁</div>
              </template>
              <template #label>
                {{ item.username }}
              </template>
              <template #value>{{ item.phone }}</template>
            </van-cell>
            <template #right>
              <van-button square type="danger" text="删除" class="delete-btn" @click="deleteFriend(item.id)" />
            </template>
          </van-swipe-cell>
        </van-cell-group>
      </div>
    </van-list>
    <div v-else>
      <div id="emp-list" v-if="!isLoading">您还没有好友，点击右上角加号，去添加好友吧！</div>
    </div>
  </div>
</template>

<style scoped>
.delete-btn {
  height: 100%;
}
#emp-list {
  text-align: center;
  margin-top: 50px;
  margin-left: 50px;
  margin-right: 50px;
  color: #808080;
}
.item-value {
  font-size: 20px;
}
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
