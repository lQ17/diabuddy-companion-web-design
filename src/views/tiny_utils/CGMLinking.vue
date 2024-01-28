<script setup>
const onClickLeft = () => history.back()
</script>

<template>
  <!-- 绑定动态 -->
  <div class="page-container">
    <van-nav-bar title="绑定动态" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
  </div>
</template>

<style scoped>
.page-container {
  height: 100vh;
  background: #f6f7fb;
}
</style>
