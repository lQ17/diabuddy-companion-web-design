<script setup>
const onClickLeft = () => history.back()
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="账户与安全" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <div class="cell-group">
      <van-cell-group>
        <van-cell title="手机绑定" is-link to="/setting/change-phone" />
        <van-cell title="邮箱绑定" is-link to="/setting/change-email" />
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group>
        <van-cell title="密码设置" is-link to="/setting/change-password" />
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group>
        <van-cell title="注销账户" is-link to="/setting/cancel-account" />
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
