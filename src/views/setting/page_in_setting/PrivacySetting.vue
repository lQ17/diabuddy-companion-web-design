<script setup>
import { useUserStore } from '@/stores'
// import { useRouter } from 'vue-router'
import { showSuccessToast } from '@/components/vantComponents'
import { ref, onMounted } from 'vue'
import { userCheckPrivateService, userUpdatePrivateService } from '@/api/user'
// const router = useRouter()
const userStore = useUserStore()
const onClickLeft = () => history.back()
const isPrivateUser = ref(false)

const onChange = async () => {
  // isPrivateUser.value = !isPrivateUser.value
  const toSend = isPrivateUser.value ? 1 : 0
  await userUpdatePrivateService(userStore.user.id, toSend)
  showSuccessToast('修改成功')
}

const init = async () => {
  const res = await userCheckPrivateService(userStore.user.id)
  if (res.data.data.isPrivateUser == 1) {
    isPrivateUser.value = true
  } else {
    isPrivateUser.value = false
  }
}
onMounted(() => {
  init()
})
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="隐私设置" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <div class="cell-group">
      <van-cell-group>
        <van-cell title="隐私账户" center>
          <template #value>
            <van-switch v-model="isPrivateUser" @change="onChange()" />
          </template>
          <template #label>
            <div>开启后，不会被他人搜索到，但并不影响已添加的亲友</div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<style scoped>
.cell-group {
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 0px;
  padding-right: 10px;
}
.page-container {
  height: 100vh;
  background: #f6f7fb;
}
</style>
