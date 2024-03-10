<script setup>
// import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { ref, onMounted } from 'vue'
import { showConfirmDialog, showSuccessToast, showFailToast } from '@/components/vantComponents'
import { shareSearchUserService, shareAddFriendService } from '@/api/share'
// const router = useRouter()
const userStore = useUserStore()
const userPhone = ref('')
const onClickLeft = () => history.back()
const searchedUser = ref()

const handleAdd = (id) => {
  showConfirmDialog({
    title: '确认发送好友申请吗？'
  })
    .then(async () => {
      // on confirm
      await shareAddFriendService(userStore.user.id, id)
      showSuccessToast('发送成功')
    })
    .catch(() => {
      // on cancel
    })
}

const onSearch = async () => {
  const res = await shareSearchUserService(userPhone.value)
  console.log(res.data)
  if (res.data.code === 1 || res.data.code === '1') {
    // 查到了
    searchedUser.value = res.data.data
  } else {
    // 没查到
    showFailToast('没有查到该用户')
  }
}

const searchInput = ref(null)

onMounted(() => {
  if (searchInput.value) {
    searchInput.value.focus()
  }
})
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="添加亲友" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <van-search v-model="userPhone" placeholder="请输入亲友的手机号" shape="round" @search="onSearch" ref="searchInput" />
    <van-list>
      <div class="cell-group" v-if="searchedUser">
        <van-cell-group inset>
          <van-cell center>
            <template #title>
              <div class="item-value">{{ searchedUser.fullName }}</div>
            </template>
            <template #label>
              {{ searchedUser.username }}
            </template>
            <template #value>
              <van-space>
                <van-button type="primary" size="small" plain @click="handleAdd(searchedUser.id)">发送申请</van-button>
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
