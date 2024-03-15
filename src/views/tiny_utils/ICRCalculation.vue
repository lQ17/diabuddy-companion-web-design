<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { planUserUpdateICRService, planUserGetTDD } from '@/api/plan'
import { showSuccessToast } from '@/components/vantComponents'
const userStore = useUserStore()
const router = useRouter()
const onClickLeft = () => history.back()
const showHowToCompute = ref(false)

const userTDD = ref()
const weight = ref()
const ICRResult = computed(() => {
  if (userTDD.value === null || weight.value === null) {
    return 0
  }
  if (userTDD.value > 0 && weight.value > 0) {
    return ((5.7 * weight.value) / userTDD.value).toFixed(2)
  } else {
    return 0
  }
})

const onAdd = async () => {
  await planUserUpdateICRService(userStore.user.id, ICRResult.value)
  userStore.user.icr = parseFloat(ICRResult.value)
  if (userStore.user.icr) {
    showSuccessToast('更新成功')
  } else {
    showSuccessToast('新增成功')
  }
}

const initTdd = async () => {
  const res = await planUserGetTDD(userStore.user.id)
  const tdd = res.data.data.tdd
  if (tdd != null) {
    showSuccessToast('已自动获取您的TDD数值')
    userTDD.value = tdd
  }
}

onMounted(() => {
  initTdd()
})
</script>
<template>
  <div class="page-container">
    <van-nav-bar title="碳水化合物系数(ICR)计算" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="warning-box">
      <div class="warning-font-box">计算ICR，我们就可以知道打1U胰岛素，可以吃多少碳水化合物</div>
    </div>
    <van-cell-group inset title="第一步：请输入每日胰岛素总量(TDD)">
      <van-field v-model="userTDD" type="number" placeholder="请输入每日胰岛素总量(TDD)" />
    </van-cell-group>
    <p id="to-compute-TDD" @click="router.push('/utils/TDD-calculation')">每日胰岛素总量(TDD)如何计算？</p>
    <van-cell-group inset title="第二步：请输入您的体重">
      <van-field v-model="weight" type="number" placeholder="请输入体重(单位：千克)" />
    </van-cell-group>
    <div class="compute-btn">
      <div class="result-box" v-if="ICRResult > 0.01">
        <div class="result-value-box">您的碳水化合物系数(ICR)为：{{ ICRResult }}g/U</div>
        <div></div>
        <van-button type="primary" block round @click="onAdd()">保存至我的参数</van-button>
      </div>
      <van-row>
        <van-col span="7"></van-col>
        <van-col span="10">
          <div class="how-to-compute-msg" @click="showHowToCompute = true">计算公式是什么？</div>
        </van-col>
        <van-col span="7"></van-col>
      </van-row>
    </div>
    <!-- 如何计算 -->
    <div class="how-to-compute-box">
      <van-action-sheet v-model:show="showHowToCompute" title="碳水化合物系数(ICR)计算公式">
        <div class="content">
          <div class="step-box">
            <div id="msg-1">计算公式</div>
            <div id="msg-2">
              <div id="msg-2-2">
                <p>&nbsp; &nbsp; &nbsp; 请先计算每日胰岛素总量(TDD)</p>
                <p>&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; 碳水化合物系数(ICR)计算公式为：(5.7 × 体重) / TDD</p>
                <p>&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; 例如：小明的体重为70kg，他的每日胰岛素总量(TDD)为30U/天，那么他的ICR为：(5.7 × 70) / 30 = 13.3g/U</p>
                <p>&nbsp; &nbsp; &nbsp; 这意味着他每打一个单位的胰岛素就可以吃13.3克碳水</p>
              </div>
            </div>
          </div>
        </div>
      </van-action-sheet>
    </div>
    <div class="warning-box">
      <div class="warning-font-box">
        <p>注意：</p>
        <p>&nbsp;</p>
        <p>1. 在一开始，你可以把计算的ICR用在三餐，后续根据实际情况小幅度调整</p>
        <p>&nbsp;</p>
        <p>2. 一天的不同时段的ICR有所不同，会随着身体激素水平的波动而波动。</p>
        <p>&nbsp;</p>
        <p>3. 不同季节的ICR也有所不同，会随着气温的波动而波动</p>
        <p>&nbsp;</p>
        <p>4. 最好佩戴动态血糖仪(CGM)来检测血糖波动曲线，对ICR进行微调。或经常检测指尖血糖</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.result-value-box {
  margin: 30px;
  background-color: #b3efff;
  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
  color: #046b99;
  padding: 10px;
}
.result-box {
  text-align: center;
}
.compute-btn {
  margin: 25px;
}
#msg-1 {
  margin-left: 20px;
  margin-right: 20px;
  padding: 10px;
  font-weight: bold;
  /* background-color: #b3efff; */
}
#msg-2 {
  text-align: left;
  background-color: #b3efff;
  color: #046b99;
  display: flex; /* 使用Flex布局 */
  justify-content: center; /* 水平居中对齐 */
  align-items: center; /* 垂直居中对齐 */
  border-radius: 10px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 30px;
  margin-top: 0px;
  padding: 10px;
}
#msg-2-2 {
  font-size: 15px;
  font-weight: bold;
}
.how-to-compute-msg {
  font-size: 15px;
  margin-top: 15px;
  color: #1989fa;
  text-align: center;
}
#to-compute-TDD {
  margin-top: 10px;
  margin-left: 20px;
  font-size: 15px;
  color: #1989fa;
}
.warning-font-box {
  font-size: 15px;
  font-weight: bold;
}
.warning-box {
  text-align: left;
  background-color: #b3efff;
  color: #046b99;
  display: flex; /* 使用Flex布局 */
  justify-content: center; /* 水平居中对齐 */
  align-items: center; /* 垂直居中对齐 */
  border-radius: 10px;
  margin: 20px;
  padding: 10px;
}
.page-container {
  min-height: 100vh;
  background: #f6f7fb;
}
</style>
