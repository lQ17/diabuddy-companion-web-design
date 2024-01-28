<script setup>
import { ref, computed } from 'vue'
const totalDay = ref()
const totalUsage = ref()
const age = ref()
const weight = ref()
const showHowToCompute = ref(false)
const onClickLeft = () => history.back()
const TDDResult = computed(() => {
  if (age.value >= 18) {
    return ((totalUsage.value / totalDay.value + 0.53 * weight.value) * 0.45).toFixed(2)
  }
  if (age.value < 18) {
    return ((totalUsage.value / totalDay.value + 0.44 * weight.value) * 0.45).toFixed(2)
  } else return 0
})
</script>
<template>
  <div class="page-container">
    <van-nav-bar title="每日胰岛素总量(TDD)计算" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="warning-box">
      <div class="warning-font-box">计算TDD可帮助我们快速的推算ICR(碳水化合物系数)和ISF(胰岛素敏感系数)</div>
    </div>
    <van-cell-group inset title="第一步：请输入过去7天或更多天的胰岛素总用量">
      <van-field v-model="totalDay" type="digit" placeholder="请输入天数" />
      <van-field v-model="totalUsage" type="number" placeholder="请输入胰岛素总用量" />
    </van-cell-group>
    <van-cell-group inset title="第二步：请输入您的年龄和体重">
      <van-field v-model="age" type="digit" placeholder="请输入年龄" />
      <van-field v-model="weight" type="number" placeholder="请输入体重(单位：千克)" />
    </van-cell-group>
    <div class="compute-btn">
      <div class="result-box" v-if="TDDResult > 0.01">
        <div class="result-value-box">您的每日胰岛素总量(TDD)为：{{ TDDResult }}U/天</div>
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

    <div class="how-to-compute-box">
      <van-action-sheet v-model:show="showHowToCompute" title="每日胰岛素总量(TDD)计算公式">
        <div class="content">
          <div class="step-box">
            <div id="msg-1">第一步</div>
            <div id="msg-2">
              <div id="msg-2-2">
                <p>&nbsp; &nbsp; &nbsp; 首先计算出过去七天或更多天的胰岛素总量(包括基础胰岛素、餐前胰岛素、纠正胰岛素)。胰岛素总量/天数</p>
                <p>&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; 例如：小明过去8天的基础胰岛素、餐前胰岛素、纠正胰岛素总量加起来一共240U，那么他的AVG-TDD就是240/8=30U/天。</p>
              </div>
            </div>
          </div>
          <div class="step-box">
            <div id="msg-1">第二步</div>
            <div id="msg-2">
              <div id="msg-2-2">
                <p>&nbsp; &nbsp; &nbsp; 然后根据体重评估每日胰岛素总量：系数 × 体重(成人系数为0.53，儿童系数为0.44，大于等于18岁为成人)</p>
                <p>&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; 例如：小明今年17岁，体重为70kg，那么他的Weight-TDD为：0.44 × 70 = 30.8U/天</p>
              </div>
            </div>
          </div>
          <div class="step-box">
            <div id="msg-1">第三步</div>
            <div id="msg-2">
              <div id="msg-2-2">
                <p>&nbsp; &nbsp; &nbsp; 最后根据第一步和第二步得到的结果(AVG-TDD Weight-TDD)来计算TDD。公式为：TDD = (AVG-TDD + Weight-TDD) × 0.45</p>
                <p>&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; 例如：小明AVG-TDD为30U/天，Weight-TDD为30.8U/天。他的TDD即为：(30 + 30.8) × 0.45 = 27.36U/天</p>
              </div>
            </div>
          </div>
        </div>
      </van-action-sheet>
    </div>
    <div class="warning-box">
      <div class="warning-font-box">
        <p>注意：</p>
        <p>
          每日胰岛素总量(TDD)仅相对稳定，随饮食、运动、应激与否、天气、心情、你的DeadLine、地日实施距离的变化(×)，均会产生波动。并且随着体重的增加或进入青春期，胰岛素总量都会上升
        </p>
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
.compute-btn {
  margin: 25px;
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
