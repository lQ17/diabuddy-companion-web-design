<script setup>
const onClickLeft = () => history.back()
</script>

<template>
  <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" placeholder fixed />
  <div>
    <van-empty description="描述文字">
      <van-button @click="onClickLeft" round type="primary" class="bottom-button"> 返回上一页 </van-button>
    </van-empty>
  </div>
</template>
<style scoped>
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>
