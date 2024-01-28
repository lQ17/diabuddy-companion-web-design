<script setup>
const onClickLeft = () => history.back()
</script>
<template>
  <div class="page-container">
    <van-nav-bar title="尚未开发" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />

    <div class="empty">
      <van-empty image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80" description="正在爆肝开发中" />
    </div>
  </div>
</template>
<style scoped>
.empty {
  margin-top: 30px;
}
.page-container {
  min-height: 100vh;
  background: #f6f7fb;
}
</style>
