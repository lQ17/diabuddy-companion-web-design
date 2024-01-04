<script setup></script>

<template>
  <div>
    <div class="box"></div>
    Hello Vue
    <van-button type="primary">主要按钮</van-button>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.box {
  height: 300px;
  width: 300px;
  background-color: pink;
}
</style>
