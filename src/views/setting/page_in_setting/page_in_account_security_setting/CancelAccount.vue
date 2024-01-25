<script setup>
import WikingFaceIcon from '@/assets/icon/winking-face.svg'
const onClickLeft = () => history.back()
</script>
<template>
  <div class="page-container">
    <van-nav-bar title="注销账号" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <!-- 图标、slogan -->
    <div class="main-box">
      <van-row :gutter="[0, 10]">
        <van-col span="8"></van-col>
        <van-col span="8">
          <div class="diabuddy-icon">
            <van-image width="80" height="80" :src="WikingFaceIcon" />
          </div>
        </van-col>
        <van-col span="8"></van-col>
        <van-col span="24">
          <div class="diabuddy-slogan-col-1">如果失忆</div>
        </van-col>
        <van-col span="24">
          <div class="diabuddy-slogan-col-2">我渴望再多一次</div>
        </van-col>
        <van-col span="8"></van-col>
        <van-col span="8">
          <div class="diabuddy-slogan-col-3">认识你</div>
        </van-col>
      </van-row>
    </div>
    <div class="warning-box">注销后，您的所有信息将被清空，且无法找回，请慎重考虑再做决定</div>
    <div style="margin: 16px">
      <van-button round block type="danger" native-type="submit"> 申请注销 </van-button>
    </div>
  </div>
</template>

<style scoped>
.warning-box {
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  font-size: 15px;
  text-align: left;
  color: #808080;
}
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
.diabuddy-slogan-col-3 {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;
  font-size: 30px;
  font-weight: bold;
}
.diabuddy-slogan-col-2 {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;
  font-size: 20px;
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
