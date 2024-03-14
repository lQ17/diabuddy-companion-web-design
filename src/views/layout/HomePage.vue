<script setup>
import TDDIcon from '@/assets/icon/TDD-icon.png'
import ICRIcon from '@/assets/icon/ICR-icon.png'
import ISFIcon from '@/assets/icon/ISF-icon.png'
import BasalRateIcon from '@/assets/icon/basal-rate-icon.png'
import {
  Rice as IconRice,
  KnifeFork as IconKnifeFork,
  Needle as IconNeedle,
  CalculatorOne as IconCalculatorOne,
  AlarmClock as IconAlarmClock
} from '@icon-park/vue-next'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { recordGetFiveRecordsService } from '@/api/record'
import { showFailToast } from '@/components/vantComponents'
const userStore = useUserStore()
const router = useRouter()

const toRecordSth = () => {
  router.push('/record')
}
const toSetDiaInfo = () => {
  router.push('/set-dia-info')
}

const userPic = ref('')

//初始化记录list
const userRecordList = ref([])

//获取五条最近的数据
const getHomePageRecord = async () => {
  const res = await recordGetFiveRecordsService(userStore.user.id)
  userRecordList.value = res.data.data
}

onMounted(() => {
  if (!userStore.token) {
    router.replace('/login')
    showFailToast('请先登录')
  } else {
    userPic.value = userStore.user.userPic
    getHomePageRecord()
  }
})

// 根据记录类型返回对应的标签文本
const tagText = (type) => {
  switch (type) {
    case 'blood_sugar':
      return '血糖'
    case 'diet':
      return '饮食'
    case 'injection':
      return '注射'
    case 'exercise':
      return '运动'
    case 'agent':
      return '用药'
    default:
      return ''
  }
}

// 根据记录类型返回对应的标签颜色
const tagColor = (type) => {
  switch (type) {
    case 'blood_sugar':
      return '#ffe1e1'
    case 'diet':
      return '#ffeea1'
    case 'injection':
      return '#cbe3ff'
    case 'exercise':
      return '#cfffd4'
    case 'agent':
      return '#eed0ff'
    default:
      return ''
  }
}

// 根据记录类型返回对应的文字颜色
const tagTextColor = (type) => {
  switch (type) {
    case 'blood_sugar':
      return '#ad0000'
    case 'diet':
      return '#ff7500'
    case 'injection':
      return '#0077ff'
    case 'exercise':
      return '#009a0f'
    case 'agent':
      return '#56004f'
    default:
      return ''
  }
}
</script>
<template>
  <div class="page-container">
    <!-- 头像、搜索框、闹钟 -->
    <van-row type="flex" justify="space-between" class="custom-row">
      <!-- 头像 -->
      <van-col class="image-col" @click="router.push('/user')">
        <van-image round width="50" height="50" fit="cover" position="center" :src="userPic">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
          <template v-slot:error>加载失败</template>
        </van-image>
      </van-col>

      <!-- 搜索 -->
      <!-- click-input 点击输入区域时触发 event: MouseEvent -->
      <van-col class="search-col" @click="router.push('/foodsearch')">
        <van-search placeholder="请输入搜索关键词" shape="round" background="#1989fa" />
      </van-col>

      <!-- 闹钟 -->
      <!-- 以后用后端实现，并推送通知 -->
      <van-col class="icon-col" @click="router.push('/ud')">
        <icon-alarm-clock theme="outline" size="30" fill="#fff" strokeLinecap="square" />
      </van-col>
    </van-row>

    <!-- 头像、搜索框下的一排功能 -->
    <van-row type="flex" justify="space-around" class="placeholder-row">
      <van-col class="placeholder-div van-haptics-feedback" @click="router.push('/utils/carb-fast-calculation')">
        <div class="icon-placeholder">
          <icon-calculator-one theme="outline" size="30" fill="#fff" strokeLinecap="square" />
        </div>
        <span>碳水快算</span>
      </van-col>
      <van-col class="placeholder-div van-haptics-feedback" @click="router.push('/utils/insulin-adjustment')">
        <div class="icon-placeholder">
          <icon-needle theme="outline" size="30" fill="#fff" strokeLinecap="square" />
        </div>
        <span>纠正量</span>
      </van-col>
      <van-col class="placeholder-div van-haptics-feedback" @click="router.push('/cantd')">
        <div class="icon-placeholder">
          <van-icon name="link-o" class="row-2-icon" />
        </div>
        <span>绑定动态</span>
      </van-col>
      <van-col class="placeholder-div van-haptics-feedback" @click="router.push('/share')">
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
            <van-button round type="primary" color="#00cfff" class="update-userInfo-quick-button" @click="toSetDiaInfo">
              <van-icon name="edit" class="left-icon" />
            </van-button>
          </van-col>
          <!-- 2. 记行为 -->
          <van-col class="main-row-1-div add-records col-2">
            <van-button round type="primary" color="#00cfff" class="add-records-button" @click="toRecordSth">
              <van-icon name="plus" class="custom-icon center-icon" />
            </van-button>
          </van-col>
          <!-- 3. 历史记录 -->
          <van-col class="main-row-1-div check-records col-3">
            <van-button
              round
              type="primary"
              color="#00cfff"
              class="check-records-button"
              @click="router.push(`/check-record?id=${userStore.user.id}`)"
            >
              <van-icon name="todo-list-o" class="right-icon" />
            </van-button>
          </van-col>
          <!-- 4 -->
          <van-col class="main-row-1-div main-row-2-div update-userInfo-quick-button-bottom col-4">
            <van-button size="small" type="default" round hairline class="col-4" @click="toSetDiaInfo">看方案</van-button>
          </van-col>
          <!-- 5 -->
          <van-col class="main-row-1-div main-row-2-div add-records-bottom col-5">
            <van-button type="default" round @click="toRecordSth">
              <van-swipe vertical class="notice-swipe" :autoplay="2000" :touchable="false" :show-indicators="false" hairline>
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
            <van-button size="small" type="default" round hairline class="col-4" @click="router.push(`/check-record?id=${userStore.user.id}`)">
              查记录
            </van-button>
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
            <van-cell
              class="reset-cell-height"
              title-style="flex: 50%;"
              :value="record.mainValue"
              v-for="record in userRecordList"
              :key="record.recordId"
              @click="router.push(`/check-record/detail?recordRootId=${record.recordId}`)"
            >
              <template #title>
                <div class="custom-title">
                  <van-tag :color="tagColor(record.recordType)" :text-color="tagTextColor(record.recordType)" class="custom-title">{{
                    tagText(record.recordType)
                  }}</van-tag>
                  <span class="span-title"> | {{ record.mainKey }}</span>
                </div>
              </template>
            </van-cell>
          </van-cell-group>
        </van-row>
      </van-space>
    </div>
    <!-- 底部盒子 -->
    <div class="foot-box">
      <van-row :gutter="[15, 10]" justify="center">
        <van-col span="6" class="compute-icon-col" @click="router.push('/utils/TDD-calculation')">
          <img :src="TDDIcon" alt="TDD" class="all-compute-icon van-haptics-feedback" />
        </van-col>
        <van-col span="6" class="compute-icon-col" @click="router.push('/utils/ICR-calculation')">
          <img :src="ICRIcon" alt="ICR" class="all-compute-icon van-haptics-feedback" />
        </van-col>
        <van-col span="6" class="compute-icon-col" @click="router.push('/utils/ISF-calculation')">
          <img :src="ISFIcon" alt="ISF" class="all-compute-icon van-haptics-feedback" />
        </van-col>
        <van-col span="6" class="compute-icon-col" @click="router.push('/utils/insulin-pump-basal-rate')">
          <img :src="BasalRateIcon" alt="BasalRate" class="all-compute-icon van-haptics-feedback" />
        </van-col>
        <van-col span="6" class="compute-font-col">TDD计算</van-col>
        <van-col span="6" class="compute-font-col">ICR计算</van-col>
        <van-col span="6" class="compute-font-col">ISF计算</van-col>
        <van-col span="6" class="compute-font-col">基础率段</van-col>
        <van-col span="6" class="compute-icon-col" @click="router.push('/utils/user-upload-food')">
          <icon-rice theme="filled" size="50" fill="#ff3300" strokeLinecap="square" />
        </van-col>
        <van-col span="6" class="compute-icon-col" @click="router.push('/food-favorite')">
          <van-icon name="star" size="50" color="#ff976a" />
        </van-col>
        <van-col span="6" class="compute-icon-col" @click="router.push('/utils/day-eating')">
          <icon-knife-fork theme="filled" size="48" fill="#ff7500" strokeLinecap="square" />
        </van-col>
        <van-col span="6"></van-col>
        <van-col span="6" class="compute-font-col">上传食物</van-col>
        <van-col span="6" class="compute-font-col">收藏食物</van-col>
        <van-col span="6" class="compute-font-col">三餐摄入</van-col>
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
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
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
  font-size: 12px;
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
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.page-container {
  height: 100vh;
  background: linear-gradient(to bottom, #1989fa 10%, #f6f7fb 30%);
  padding-top: 5px;
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
