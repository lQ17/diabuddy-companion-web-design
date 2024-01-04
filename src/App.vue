<script setup>
import { useUserStore } from '@/stores'
const userStore = useUserStore()
</script>

<template>
  <div>
    <div class="box"></div>
    Hello Vue
    {{ userStore.token }}
    <van-button type="primary" @click="userStore.setToken('asdfsdafdasfsdf')">test</van-button>
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
