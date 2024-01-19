<script setup></script>
<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/wiki" icon="smile-o">学习</van-tabbar-item>
      <van-tabbar-item replace to="/food" icon="search">查食物</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="contact-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
