<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ISFTable from '@/assets/pic/ISFTable.png'
const router = useRouter()
const onClickLeft = () => history.back()
const showHowToCompute = ref(false)
const showHbA1c = ref(false)

const userTDD = ref()
const userHbA1c = ref()
const factorInCompute = computed(() => {
  if (userHbA1c.value < 6.6) return 133
  if (userHbA1c.value >= 6.6 && userHbA1c.value < 7) return 117
  if (userHbA1c.value >= 7 && userHbA1c.value < 8) return 106
  if (userHbA1c.value >= 8 && userHbA1c.value < 10) return 94
  if (userHbA1c.value >= 10) return 80
  else return 110
})
const ISFResult = computed(() => {
  return (factorInCompute.value / userTDD.value).toFixed(2)
})
</script>
<template>
  <div class="page-container">
    <van-nav-bar title="胰岛素敏感系数(ISF)计算" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="warning-box">
      <div class="warning-font-box">计算ISF，我们就可以知道打1U胰岛素，可以减低多少血糖</div>
    </div>
    <van-cell-group inset title="第一步：请输入每日胰岛素总量(TDD)">
      <van-field v-model="userTDD" type="number" placeholder="请输入每日胰岛素总量(TDD)" />
    </van-cell-group>
    <p id="to-compute-TDD" @click="router.push('/utils/TDD-calculation')">每日胰岛素总量(TDD)如何计算？</p>
    <van-cell-group inset>
      <template #title>
        <van-space>
          <div>第二步：最近三个月的糖化血红蛋白(HbA1c)</div>
          <div>
            <van-icon name="question-o" color="#1989fa" size="20" @click="showHbA1c = true" />
          </div>
        </van-space>
      </template>
      <van-field v-model="userHbA1c" type="number" placeholder="非必填" />
    </van-cell-group>
    <!-- 糖化血红蛋白解释 -->
    <div class="showHbA1c">
      <van-popup v-model:show="showHbA1c" round :style="{ padding: '40px' }">
        <template #default>
          <div class="showHbA1cTitle">HbA1c(糖化血红蛋白)</div>
          <div class="showHbA1cDetail">
            糖化血红蛋白浓度可有效地反映过去8~12周平均血糖水平。临床上常用作糖尿病控制的监测指标，其浓度应用占成人血红蛋白的百分比表示。
          </div>
        </template>
      </van-popup>
    </div>
    <div class="compute-btn">
      <div class="result-box" v-if="ISFResult > 0.01">
        <div class="result-value-box">您的胰岛素敏感系数(ISF)为：{{ ISFResult }}mmol/U</div>
        <van-button type="primary" block round>保存至我的参数</van-button>
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
                <p>
                  &nbsp; &nbsp; &nbsp;
                  其次需要根据用户的糖化血红蛋白来评估过去三个月该用户血糖控制的怎样，随着糖化血红蛋白水平的上升，ISF也会上升。具体公式在最后。
                </p>
                <p>&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; 如果用户没有提供糖化血红蛋白，将默认过去三个月该用户血糖水平控制良好。使ISF偏大以保证不会有低血糖的风险</p>
                <p>&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; 那么就通过ISF = ( 110mmol/L ÷ TDD)来计算</p>
              </div>
            </div>
          </div>
          <van-image :src="ISFTable" class="ISF-table-img" />
        </div>
      </van-action-sheet>
    </div>
    <div class="warning-box">
      <div class="warning-font-box">
        <p>注意：</p>
        <p>&nbsp;</p>
        <p>1. 你可以使用ISF来纠正高血糖至正常水平，可以使用首页-纠正量页面来计算</p>
        <p>&nbsp;</p>
        <p>2. ISF个体差异很大，并且生病、应激、血糖偏高时，都会使胰岛素敏感度较低。</p>
        <p>&nbsp;</p>
        <p>3. 另外运动可以短时间提高胰岛素敏感度，并且ISF会随着运动强度的提高而提高。长期保持运动也可以提高胰岛素敏感度</p>
        <p>&nbsp;</p>
        <p>4. 最好佩戴动态血糖仪(CGM)来检测血糖波动曲线，对ISF进行微调。或经常检测指尖血糖</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.ISF-table-img {
  margin-bottom: 20px;
}
.showHbA1cDetail {
  font-size: 15px;
}
.showHbA1cTitle {
  margin-top: -20px;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
}
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
