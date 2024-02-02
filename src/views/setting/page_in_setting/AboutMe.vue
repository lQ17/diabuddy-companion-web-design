<script setup>
import { WinkingFace } from '@icon-park/vue-next'
const onClickLeft = () => history.back()
</script>
<template>
  <div class="page-container">
    <van-nav-bar title="关于我" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
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

    <!-- 检测新版本... -->
    <div class="foot-box">
      <div class="cell-group">
        <van-cell-group>
          <van-cell title="检测新版本(尚未开发)" />
          <van-cell title="去评分(尚未开发)" />
          <van-cell title="使用协议(尚未开发)" />
          <van-cell title="隐私政策(尚未开发)" />
          <van-cell title="毕业设计展示" />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<style scoped>
.foot-box {
  padding-top: 60px;
}
.cell-group {
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 0px;
  padding-right: 10px;
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
