<script setup>
import WritingFluently from '@/assets/icon/writing-fluently.png'
import Analysis from '@/assets/icon/analysis.png'
import Stethoscope from '@/assets/icon/stethoscope.png'
import DocDetail from '@/assets/icon/doc-detail.png'
import MedicineBottleOne from '@/assets/icon/medicine-bottle-one.png'

import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<template>
  <div class="page-container">
    <!-- 用户基础信息 -->
    <div class="user-base-info">
      <!-- 头像 -->
      <div class="avatar">
        <van-image round width="60" height="60" fit="cover" position="center" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
          <template v-slot:error>加载失败</template>
        </van-image>
      </div>
      <!-- 用户名、存在时间 -->
      <div class="user-info">
        <div class="username">用户名</div>
        <div class="user-existence-time">用户已存在167天</div>
      </div>
      <!-- 用户类别（普通用户） -->
      <div class="user-type">
        <van-tag plain type="primary">普通用户</van-tag>
      </div>
    </div>
    <!-- 健康管理 -->
    <div class="health-management-box">
      <van-row class="health-management-icon-row" justify="space-around" :gutter="[20, 20]">
        <!-- 再说吧，我也不知道该写啥 -->
        <van-col span="6">
          <div class="health-management-icon-outside-div">
            <van-icon :name="WritingFluently" class="health-management-icon" size="30"></van-icon>
            <div class="health-management-icon-description">控糖方案</div>
          </div>
        </van-col>

        <!-- 分析数据 | 折线图之类的 -->
        <van-col span="6">
          <div class="health-management-icon-outside-div">
            <van-icon :name="Analysis" class="health-management-icon" size="30"></van-icon>
            <div class="health-management-icon-description">周报|月报</div>
          </div>
        </van-col>

        <!-- 化验单管理 -->
        <van-col span="6">
          <div class="health-management-icon-outside-div">
            <van-icon :name="Stethoscope" class="health-management-icon" size="30"></van-icon>
            <div class="health-management-icon-description">病例管理</div>
          </div>
        </van-col>

        <!-- 患者 or 家属 | 基础信息填写 -->
        <van-col span="6">
          <div class="health-management-icon-outside-div">
            <van-icon :name="DocDetail" class="health-management-icon" size="30"></van-icon>
            <div class="health-management-icon-description">健康档案</div>
          </div>
        </van-col>

        <!-- 用药管理 -->
        <van-col span="6">
          <div class="health-management-icon-outside-div">
            <van-icon :name="MedicineBottleOne" class="health-management-icon" size="30"></van-icon>
            <div class="health-management-icon-description">用药管理</div>
          </div>
        </van-col>

        <!-- 占位 -->
        <van-col span="18"></van-col>
      </van-row>
    </div>
    <!-- 最后一行黑色的icon -->
    <div class="user-service-box">
      <van-row class="user-service-icon-row" justify="space-around" :gutter="[20, 20]">
        <van-col span="6">
          <div class="user-service-icon-outside-div">
            <van-icon name="friends-o" class="user-service-icon" size="30" />
            <div class="user-service-icon-description">共享管理</div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="user-service-icon-outside-div">
            <van-icon name="service-o" class="user-service-icon" size="30" />
            <div class="user-service-icon-description">联系客服</div>
          </div>
        </van-col>
        <van-col span="6" @click="router.push('/setting')">
          <div class="user-service-icon-outside-div">
            <van-icon name="setting-o" class="user-service-icon" size="30" />
            <div class="user-service-icon-description">用户设置</div>
          </div>
        </van-col>
        <van-col span="6"></van-col>
      </van-row>
    </div>
  </div>
</template>

<style scoped>
.user-service-icon-description,
.health-management-icon-description {
  margin-top: 5px;
  font-size: 12px;
}
.user-service-icon-outside-div,
.health-management-icon-outside-div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-service-box,
.health-management-box {
  width: 80%;
  margin: 100px auto 0;
  margin-top: 20px;
  padding: 20px;
  background-color: white;
  border: 0px solid #ddd;
  border-radius: 8px;
  /* display: flex;
  justify-content: center;
  align-items: flex-start; */
}
.user-type {
  margin-bottom: 30px;
  margin-left: 30px;
}
.avatar {
  margin-right: 10px;
}
.user-info {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.username {
  text-align: left;
  font-size: 20px;
}
.user-existence-time {
  text-align: left;
  font-size: 15px;
  margin-top: 5px;
  color: #969799;
}
.user-base-info {
  margin: 16px;
  margin-top: 0px;
  padding: 16px;
  display: flex;
  align-items: center;
}
.head-line-row {
  padding: 8px;
}
.page-container {
  padding-top: 30px;
  height: 100vh;
  background: #f6f7fb;
}
</style>
