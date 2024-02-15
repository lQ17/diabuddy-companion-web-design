<script setup>
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import vantComponents from '@/components/vantComponents'
const router = useRouter()
const userStore = useUserStore()
const onClickLeft = () => history.back()
const onLogout = () => {
  vantComponents
    .showConfirmDialog({
      title: '确定退出？'
    })
    .then(() => {
      userStore.removeToken()
      userStore.setUser({})
      router.replace('/login')
    })
}
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="设置" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <div class="cell-group">
      <van-cell-group>
        <van-cell title="账号设置" is-link to="/setting/account-setting" />
        <van-cell title="共享管理" is-link to="/" />
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group>
        <van-cell title="账户与安全" is-link to="/setting/account-security-setting" />
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group>
        <van-cell title="隐私设置(还没开发)" is-link to="/" />
        <van-cell title="清除缓存(还没开发)" is-link to="/" />
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group>
        <van-cell title="关于我" is-link to="/setting/about-me" />
        <van-cell title="帮助与反馈" is-link to="/setting/help-and-feed-back" />
      </van-cell-group>
    </div>
    <div class="outside-logout-box">
      <div class="logout-box">
        <van-button class="logout-btn" color="#9a9a9a" size="large" round @click="onLogout">退出登录</van-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logout-btn {
  --van-button-large-height: 40px;
  font-size: 15px;
}
.outside-logout-box {
  margin: 40px;
}
.logout-box {
  display: flex;
  justify-content: center;
}
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
