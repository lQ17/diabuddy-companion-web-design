<script setup>
import { WinkingFace } from '@icon-park/vue-next'
const onClickLeft = () => history.back()
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="帮助与反馈" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <!-- 图标、slogan -->
    <div class="main-box">
      <van-row :gutter="[0, 10]">
        <van-col span="8"></van-col>
        <van-col span="8">
          <div class="diabuddy-icon">
            <winking-face theme="outline" size="80" fill="#1989fa" strokeLinecap="square" />
          </div>
        </van-col>
        <van-col span="8"></van-col>
        <van-col span="8"></van-col>
        <van-col span="8">
          <div class="diabuddy-slogan-col-1">天空海阔</div>
        </van-col>
        <van-col span="8"></van-col>
        <van-col span="8"></van-col>
        <van-col span="8">
          <div class="diabuddy-slogan-col-2">任你行</div>
        </van-col>
      </van-row>
    </div>
    <div class="foot-box">
      <div class="foot-msg">*本软件目前仅对一型糖友提供健康参考</div>
      <div class="foot-msg">*有任何问题请发送邮件至Qingx.Yang@outlook.com</div>
    </div>
  </div>
</template>

<style scoped>
.foot-box {
  padding-top: 20px;
}
.foot-msg {
  font-size: 15px;
  text-align: center;
  color: #808080;
}
.main-box {
  padding-top: 20px;
}
.diabuddy-icon {
  display: flex;
  justify-content: center;
}
.diabuddy-slogan-col-2 {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;
  font-size: 30px;
  font-weight: bold;
}
.diabuddy-slogan-col-1 {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;
  font-size: 20px;
}
.page-container {
  height: 100vh;
  background: #f6f7fb;
}
</style>
