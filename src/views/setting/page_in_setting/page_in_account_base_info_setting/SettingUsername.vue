<script setup>
const onClickLeft = () => history.back()
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores'
import { userUpdateUsernameService } from '@/api/user'
import { showSuccessToast } from '@/components/vantComponents'
const userStore = useUserStore()
const showPlaceholder = userStore.user.username
//记得做用户名回显
const username = ref('')

const onClick = async () => {
  await userUpdateUsernameService(userStore.user.id, username.value)
  userStore.user.username = username.value
  showSuccessToast('更新成功')
}
onMounted(() => {
  // username.value = userStore.user.username
})
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="修改用户名" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <div class="setting-box">
      <van-form>
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            :placeholder="showPlaceholder"
            :rules="[{ required: true, message: '请填写用户名' }]"
            clear-trigger="focus"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit" @click="onClick"> 确定 </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style scoped>
.setting-box {
  margin-top: 20px;
}
.page-container {
  height: 100vh;
  background: #f6f7fb;
}
</style>
