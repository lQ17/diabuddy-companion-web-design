<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const onClickLeft = () => history.back()

// 用户头像 URL
const userPic = ref('')
const username = ref('')
onMounted(() => {
  userPic.value = userStore.user.userPic
  username.value = userStore.user.username
})
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="账号设置" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <div class="avatar-box">
      <van-uploader accept="image/*">
        <van-image round width="70" height="70" fit="cover" position="center" :src="userPic" @click="showActionSheet = true">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
          <template v-slot:error>加载失败</template>
        </van-image>
      </van-uploader>
    </div>
    <div class="change-tips">点击头像进行更换</div>
    <div class="change-avatar-box">
      <!-- 操作表单 -->
    </div>
    <div class="cell-group">
      <van-cell-group>
        <van-cell title="用户名" is-link to="/setting/setting-username" :value="username" />
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group>
        <van-cell title="基本信息" is-link to="/setting/setting-baseinfo" />
      </van-cell-group>
    </div>
  </div>
</template>

<style scoped>
.change-tips {
  font-size: 12px;
  text-align: center;
  color: #808080;
  margin-bottom: 30px;
}
.cell-group {
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 0px;
  padding-right: 10px;
}
.avatar-box {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
.page-container {
  height: 100vh;
  background: #f6f7fb;
}
</style>
