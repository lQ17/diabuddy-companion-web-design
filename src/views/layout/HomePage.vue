<script setup>
import TDDIcon from '@/assets/icon/TDD-icon.png'
import ICRIcon from '@/assets/icon/ICR-icon.png'
import ISFIcon from '@/assets/icon/ISF-icon.png'
import BasalRateIcon from '@/assets/icon/basal-rate-icon.png'
import FoodIcon from '@/assets/icon/food-icon.png'
import DayEatingIcon from '@/assets/icon/day-eating-icon.png'
import NeedleIcon from '@/assets/icon/needle.png'
</script>
<template>
  <div class="page-container">
    <!-- 头像、搜索框、闹钟 -->
    <van-row type="flex" justify="space-between" align="center" class="custom-row">
      <!-- 头像 -->
      <van-col class="image-col">
        <van-image
          round
          width="50"
          height="50"
          fit="cover"
          position="center"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
          <template v-slot:error>加载失败</template>
        </van-image>
      </van-col>

      <!-- 搜索 -->
      <!-- click-input 点击输入区域时触发 event: MouseEvent -->
      <van-col class="search-col">
        <van-search placeholder="请输入搜索关键词" shape="round" background="#1989fa" />
      </van-col>

      <!-- 闹钟 -->
      <van-col class="icon-col">
        <!-- <van-icon name="src\assets\alarm.svg" size="30" color="#fff" /> -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-alarm"
          viewBox="0 0 16 16"
          color="#fff"
        >
          <path
            d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"
          />
          <path
            d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"
          />
        </svg>
      </van-col>
    </van-row>

    <!-- 头像、搜索框下的一排功能 -->
    <van-row type="flex" justify="space-around" class="placeholder-row">
      <van-col class="placeholder-div">
        <div class="icon-placeholder">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-calculator row-2-icon"
            viewBox="0 0 16 16"
          >
            <path
              d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"
            />
            <path
              d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-2zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-4z"
            />
          </svg>
        </div>
        <span>碳水快算</span>
      </van-col>
      <van-col class="placeholder-div">
        <div class="icon-placeholder">
          <img :src="NeedleIcon" alt="needle" width="30px" height="30px" />
        </div>
        <span>纠正量</span>
      </van-col>
      <van-col class="placeholder-div">
        <div class="icon-placeholder">
          <van-icon name="link-o" class="row-2-icon" />
        </div>
        <span>绑定动态</span>
      </van-col>
      <van-col class="placeholder-div">
        <div class="icon-placeholder">
          <van-icon name="friends-o" class="row-2-icon" />
        </div>
        <span>看亲友</span>
      </van-col>
    </van-row>

    <!-- 主要盒子 -->
    <div class="main-box">
      <van-space direction="vertical" fill>
        <van-row class="main-action-row-1">
          <!-- 1. 更新用户信息 -->
          <van-col class="main-row-1-div update-userInfo-quick col-1">
            <van-button round type="primary" color="#00cfff" class="update-userInfo-quick-button">
              <van-icon name="edit" class="left-icon" />
            </van-button>
          </van-col>
          <!-- 2. 记行为 -->
          <van-col class="main-row-1-div add-records col-2">
            <van-button round type="primary" color="#00cfff" class="add-records-button">
              <van-icon name="plus" class="custom-icon center-icon" />
            </van-button>
          </van-col>
          <!-- 3. 历史记录 -->
          <van-col class="main-row-1-div check-records col-3">
            <van-button round type="primary" color="#00cfff" class="check-records-button">
              <van-icon name="todo-list-o" class="right-icon" />
            </van-button>
          </van-col>
          <!-- 4 -->
          <van-col class="main-row-1-div main-row-2-div update-userInfo-quick-button-bottom col-4">
            <van-button size="small" type="default" round hairline class="col-4">改信息</van-button>
          </van-col>
          <!-- 5 -->
          <van-col class="main-row-1-div main-row-2-div add-records-bottom col-5">
            <van-button type="default" round>
              <van-swipe
                vertical
                class="notice-swipe"
                :autoplay="2000"
                :touchable="false"
                :show-indicators="false"
                hairline
              >
                <van-swipe-item class="col-5">记行为</van-swipe-item>
                <van-swipe-item class="col-5">记血糖</van-swipe-item>
                <van-swipe-item class="col-5">记饮食</van-swipe-item>
                <van-swipe-item class="col-5">记运动</van-swipe-item>
                <van-swipe-item class="col-5">记注射</van-swipe-item>
                <van-swipe-item class="col-5">记用药</van-swipe-item>
              </van-swipe>
            </van-button>
          </van-col>
          <!-- 6 -->
          <van-col class="main-row-1-div main-row-2-div check-records-bottom col-6">
            <van-button size="small" type="default" round hairline class="col-4">查记录</van-button>
          </van-col>
        </van-row>
        <van-row class="divider-row">
          <van-col span="24" class="divider-col">
            <van-divider>最近5条记录</van-divider>
          </van-col>
        </van-row>
        <!-- 最近的5条记录 -->
        <van-row>
          <van-cell-group class="main-cell-group">
            <van-cell class="reset-cell-height" title-style="flex: 50%;" value="5.7">
              <template #title>
                <div class="custom-title">
                  <van-tag color="#ffe1e1" text-color="#ad0000" class="custom-title">血糖</van-tag>
                  <span class="span-title"> | 空腹</span>
                </div>
              </template>
            </van-cell>
            <van-cell class="reset-cell-height" title-style="flex: 50%;" value="30分钟">
              <template #title>
                <van-tag color="#cfffd4" text-color="#009a0f" class="custom-title">运动</van-tag>
                <span class="span-title"> | 跑步</span>
              </template>
            </van-cell>
            <van-cell class="reset-cell-height" title-style="flex: 50%;" value="5U">
              <template #title>
                <van-tag color="#cbe3ff" text-color="#0077ff" class="custom-title">注射</van-tag>
                <span class="span-title"> | 胰岛素</span>
              </template>
            </van-cell>
            <van-cell class="reset-cell-height" title-style="flex: 50%;" value="1片">
              <template #title>
                <van-tag color="#cca4e3" text-color="#56004f" class="custom-title">用药</van-tag>
                <span class="span-title"> | 二甲双胍85mg</span>
              </template>
            </van-cell>
            <van-cell class="reset-cell-height" title-style="flex: 30%;" value="碳水:45克">
              <template #title>
                <van-tag color="#ffeea1" text-color="#ff7500" class="custom-title">饮食</van-tag>
                <span class="span-title"> | 早餐</span>
              </template>
            </van-cell>
          </van-cell-group>
        </van-row>
      </van-space>
    </div>
    <!-- 底部盒子 -->
    <div class="foot-box">
      <van-row :gutter="[15, 10]" justify="center">
        <van-col span="6" class="compute-icon-col">
          <img :src="TDDIcon" alt="TDD" class="all-compute-icon" />
        </van-col>
        <van-col span="6" class="compute-icon-col">
          <img :src="ICRIcon" alt="ICR" class="all-compute-icon" />
        </van-col>
        <van-col span="6" class="compute-icon-col">
          <img :src="ISFIcon" alt="ISF" class="all-compute-icon" />
        </van-col>
        <van-col span="6" class="compute-icon-col">
          <img :src="BasalRateIcon" alt="BasalRate" class="all-compute-icon" />
        </van-col>
        <van-col span="6" class="compute-font-col">TDD计算</van-col>
        <van-col span="6" class="compute-font-col">ICR计算</van-col>
        <van-col span="6" class="compute-font-col">ISF计算</van-col>
        <van-col span="6" class="compute-font-col">基础率段</van-col>
        <van-col span="6" class="compute-icon-col">
          <img :src="FoodIcon" alt="Food" class="all-compute-icon" />
        </van-col>
        <van-col span="6" class="compute-icon-col">
          <img :src="DayEatingIcon" alt="DayEating" class="all-compute-icon" />
        </van-col>
        <van-col span="6"></van-col>
        <van-col span="6"></van-col>
        <van-col span="6" class="compute-font-col">食物预设</van-col>
        <van-col span="6" class="compute-font-col">三餐摄入</van-col>
        <van-col span="6"></van-col>
        <van-col span="6"></van-col>
      </van-row>
    </div>
  </div>
</template>

<style scoped>
.compute-font-col {
  font-size: 13px;
}
.all-compute-icon {
  width: 50px;
  height: 50px;
  border-radius: 10%;
}
.foot-box {
  width: 85%;
  height: 200px;
  margin: 100px auto 0;
  margin-top: 15px;
  padding: 20px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.reset-cell-height {
  padding-top: 0%;
  padding-bottom: 0%;
}
.main-cell-group {
  width: 100%;
}
.divider-row {
  display: flex;
  height: 10px;
  .divider-col {
    display: flex;
    height: 10px;
  }
}
/* .reset-cell-height {
  --van-cell-line-height: 5px;
} */
.update-userInfo-quick-button,
.check-records-button {
  width: 40px;
  height: 40px;
}
.left-icon,
.right-icon {
  font-size: 16px;
}
.center-icon {
  font-size: 35px;
  font-weight: bold;
}
.notice-swipe {
  height: 40px;
  line-height: 40px;
}

.col-5 {
  /* color: #00cfff; */
  font-size: 16px;
  font-weight: bold;
  text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
}

.col-4,
.col-6 {
  /* color: #00cfff; */
  font-size: 13px;
  font-weight: bold;
  text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
}

.add-records-button {
  width: 80px;
  height: 80px;
}
.placeholder-row {
  margin-top: 10px;
  margin-bottom: 0px;
}

.main-action-row-1 {
  width: 100%;
  display: flex-start;
  justify-content: space-around;
  align-items: flex-start;
  margin-top: 10px;
}

.main-row-1-div {
  width: 25%; /* 每个动作 div 的宽度 */
  height: 100px; /* 高度 */
  /* background-color: #88c1fa; */
  border-radius: 8px;
}
.main-row-2-div {
  width: 25%; /* 每个动作 div 的宽度 */
  height: 50px; /* 高度 */
  /* background-color: #88c1fa; */
  border-radius: 8px;
  display: flex; /* 设置为 Flex 容器 */
  align-items: flex-start; /* 子元素靠顶对齐 */
}
.add-records,
.add-records-bottom {
  width: 40%; /* 中间 div 的宽度 */
  display: flex; /* 设置为 Flex 容器 */
  align-items: flex-start; /* 子元素靠顶对齐 */
  /* 如果需要，可以添加 padding-top 来增加顶部空间 */
  padding-top: 10px; /* 根据需要调整这个值 */
}
.placeholder-div {
  width: 20%;
  height: 60px;
  border-radius: 8px;
  border: 2px solid white; /* 加粗白色边框 */
  color: white; /* 文字颜色 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent; /* 背景透明 */
}

.placeholder-div span {
  font-size: 12px;
}

.placeholder-div svg {
  font-size: 30px;
}

.row-2-icon {
  font-size: 30px;
}

/* .icon-placeholder {
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  margin-bottom: 5px;
} */

.main-box {
  width: 80%;
  margin: 100px auto 0;
  margin-top: 20px;
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.page-container {
  height: 100vh;
  background: linear-gradient(to bottom, #1989fa 10%, white 30%);
}

.custom-row {
  width: 100%;
}

.image-col,
.icon-col {
  flex: none;
}

.search-col {
  flex-grow: 1;
}

.van-col {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
}

.van-search {
  width: 100%;
  box-sizing: border-box;
}
.col-1,
.col-3 {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: flex-end; /* 靠近底部对齐 */
  padding-bottom: 10px;
}
</style>
