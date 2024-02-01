<script setup>
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { ref, computed } from 'vue'
const isShowResult = ref(false)
// import { useRouter } from 'vue-router'
// const router = useRouter()
const showHowToComfirmPercent = ref(false)
const showPicker = ref(false)
const onClickLeft = () => history.back()
const sliderValue = ref([50, 70])
const inputAge = ref()
const age = ref(-1)
const height = ref()
const weight = ref()
const columns = [
  { text: '卧床休养', value: 1 },
  { text: '轻强度(教师、医生、文职等)', value: 2 },
  { text: '中强度(学生、服务员等)', value: 3 },
  { text: '高强度(运动员、建筑工人等)', value: 4 }
]
const fieldValue = ref('')
const workLevel = ref()
// 活动强度
const onConfirm = ({ selectedOptions }) => {
  showPicker.value = false
  if (selectedOptions[0].text === '卧床休养') {
    fieldValue.value = selectedOptions[0].text
  } else {
    fieldValue.value = selectedOptions[0].text.slice(0, 3)
  }
  workLevel.value = selectedOptions[0].value
}
const carbPercent = computed(() => {
  return sliderValue.value[0]
})
const proteinPercent = computed(() => {
  return sliderValue.value[1] - sliderValue.value[0]
})
const fatPercent = computed(() => {
  return 100 - sliderValue.value[1]
})
const handleBlur = () => {
  age.value = inputAge.value
}
const userBMI = computed(() => {
  return (weight.value / (height.value * height.value)).toFixed(2)
})
// 所需的热量
const requiredKalorie = computed(() => {
  //儿童只考虑age
  if (age.value < 18) {
    if (age.value < 3 && age.value > 0) {
      return (1000 + age.value * 100).toFixed()
    }
    if (age.value >= 3 && age.value <= 6) {
      return (1000 + age.value * 90).toFixed()
    }
    if (age.value >= 7 && age.value <= 10) {
      return (1000 + age.value * 80).toFixed()
    }
    if (age.value > 10) {
      return (1000 + age.value * 70).toFixed()
    }
  }
  //BMI判断
  // 过轻
  if (userBMI.value < 18.5) {
    if (workLevel.value === 1) {
      return (25 * weight.value).toFixed()
    }
    if (workLevel.value === 2) {
      return (35 * weight.value).toFixed()
    }
    if (workLevel.value === 3) {
      return (40 * weight.value).toFixed()
    }
    if (workLevel.value === 4) {
      return (45 * weight.value).toFixed()
    }
  }
  // 正常
  if (userBMI.value >= 18.5 && userBMI.value < 24) {
    if (workLevel.value === 1) {
      return (20 * weight.value).toFixed()
    }
    if (workLevel.value === 2) {
      return (30 * weight.value).toFixed()
    }
    if (workLevel.value === 3) {
      return (35 * weight.value).toFixed()
    }
    if (workLevel.value === 4) {
      return (40 * weight.value).toFixed()
    }
  }
  // 超重
  if (userBMI.value >= 24) {
    if (workLevel.value === 1) {
      return (15 * weight.value).toFixed()
    }
    if (workLevel.value === 2) {
      return (25 * weight.value).toFixed()
    }
    if (workLevel.value === 3) {
      return (30 * weight.value).toFixed()
    }
    if (workLevel.value === 4) {
      return (35 * weight.value).toFixed()
    }
  }
  return 2000
})
// 碳水重量
const carbWeight = computed(() => {
  return ((requiredKalorie.value * carbPercent.value * 0.01) / 4).toFixed(2)
})
// 蛋白质重量
const proteinWeight = computed(() => {
  return ((requiredKalorie.value * proteinPercent.value * 0.01) / 4).toFixed(2)
})
// 脂肪重量
const fatWeight = computed(() => {
  return ((requiredKalorie.value * fatPercent.value * 0.01) / 9).toFixed(2)
})
// 配置饼图
const breakfastChartOptions = {
  plugins: {
    datalabels: {
      color: '#fff',
      textAlign: 'center',
      font: {
        size: 10
      },
      formatter: (value, ctx) => {
        let label = ctx.chart.data.labels[ctx.dataIndex]
        let weight = ''
        switch (label) {
          case '碳水':
            weight = `${(carbWeight.value * 0.2).toFixed()}克`
            break
          case '蛋白质':
            weight = `${(proteinWeight.value * 0.2).toFixed()}克`
            break
          case '脂肪':
            weight = `${(fatWeight.value * 0.2).toFixed()}克`
            break
        }
        return `${weight}`
      }
    }
  },
  legend: {
    display: false
  }
}
const lunchAndSupperChartOptions = {
  plugins: {
    datalabels: {
      color: '#fff',
      textAlign: 'center',
      font: {
        size: 10
      },
      formatter: (value, ctx) => {
        let label = ctx.chart.data.labels[ctx.dataIndex]
        let weight = ''
        switch (label) {
          case '碳水':
            weight = `${(carbWeight.value * 0.4).toFixed()}克`
            break
          case '蛋白质':
            weight = `${(proteinWeight.value * 0.4).toFixed()}克`
            break
          case '脂肪':
            weight = `${(fatWeight.value * 0.4).toFixed()}克`
            break
        }
        return `${weight}`
      }
    }
  },
  legend: {
    display: false
  }
}
const chartData = {
  labels: ['碳水', '蛋白质', '脂肪'],
  datasets: [
    {
      data: [carbPercent.value, proteinPercent.value, fatPercent.value],
      backgroundColor: ['#2f938f', '#f04d51', '#f2ba4e']
    }
  ]
}
// 为每个饼图定义独立的 ref
const breakfastChartCanvas = ref(null)
const lunchChartCanvas = ref(null)
const supperChartCanvas = ref(null)
let breakfastChart = null
let lunchChart = null
let supperChart = null
// 按钮后创建饼图、展示数据
const submitToShow = () => {
  const breakfastCtx = breakfastChartCanvas.value.getContext('2d')
  const lunchCtx = lunchChartCanvas.value.getContext('2d')
  const supperCtx = supperChartCanvas.value.getContext('2d')
  Chart.register(ChartDataLabels)

  // 如果饼图已经存在，则更新数据
  if (breakfastChart || lunchChart || supperChart) {
    breakfastChart.data.datasets[0].data = [carbPercent.value, proteinPercent.value, fatPercent.value]
    lunchChart.data.datasets[0].data = [carbPercent.value, proteinPercent.value, fatPercent.value]
    supperChart.data.datasets[0].data = [carbPercent.value, proteinPercent.value, fatPercent.value]
    breakfastChart.update()
    lunchChart.update()
    supperChart.update()
  } else {
    // 否则，创建新的饼图
    breakfastChart = new Chart(breakfastCtx, {
      type: 'pie',
      data: chartData,
      options: breakfastChartOptions
    })
    lunchChart = new Chart(lunchCtx, {
      type: 'pie',
      data: chartData,
      options: lunchAndSupperChartOptions
    })
    supperChart = new Chart(supperCtx, {
      type: 'pie',
      data: chartData,
      options: lunchAndSupperChartOptions
    })
  }
  isShowResult.value = true
}
</script>
<template>
  <div class="page-container">
    <van-nav-bar title="三餐摄入计算" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="warning-box">
      <div class="warning-font-box">计算合理的碳水化合物、脂肪和蛋白质摄入量</div>
    </div>
    <van-cell-group inset title="第一步：请输入您的年龄">
      <van-field v-model="inputAge" type="number" placeholder="您的年龄" @blur="handleBlur" />
    </van-cell-group>
    <van-cell-group inset title="第二步：请输入您的身高" v-if="age >= 18 || age === -1">
      <van-field v-model="height" type="number" placeholder="您的身高 (单位：厘米)" />
    </van-cell-group>
    <van-cell-group inset title="第三步：请输入您的体重" v-if="age >= 18 || age === -1">
      <van-field v-model="weight" type="number" placeholder="您的体重 (单位：千克)" />
    </van-cell-group>
    <van-cell-group inset title="第四步：请输入您的日常活动强度" v-if="age >= 18 || age === -1">
      <van-field v-model="fieldValue" is-link readonly label="活动强度" placeholder="选择活动强度" @click="showPicker = true" />
    </van-cell-group>
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup>
    <p class="slider-title" v-if="age >= 18 || age === -1">
      第五步：确定三大营养的热量占比
      <van-icon name="question-o" color="#1989fa" size="20" @click="showHowToComfirmPercent = true" />
    </p>
    <p class="slider-title" v-else>
      第二步：确定三大营养的热量占比
      <van-icon name="question-o" color="#1989fa" size="20" @click="showHowToComfirmPercent = true" />
    </p>
    <!-- 解释如何选择营养占比 -->
    <div class="showHbA1c">
      <van-popup v-model:show="showHowToComfirmPercent" round :style="{ padding: '40px' }">
        <template #default>
          <div class="showHowToComfirmPercentTitle">如何选择营养占比</div>
          <div class="showHowToComfirmPercentDetail">蛋白质15%～20%、碳水化合物45%～60%、脂肪20%～35%</div>
          <div class="showHowToComfirmPercentDetail">&nbsp; &nbsp; &nbsp;</div>
          <div class="showHowToComfirmPercentDetail">
            &nbsp; &nbsp; &nbsp;三大营养素目标方面推荐糖尿病患者每日碳水化合物供能比为45%~60%，1型糖尿病儿童和青少年可为50%~55%。
          </div>
          <div class="showHowToComfirmPercentDetail">&nbsp; &nbsp; &nbsp;</div>
          <div class="showHowToComfirmPercentDetail">
            &nbsp; &nbsp;
            &nbsp;每日膳食总脂肪供能建议占总能量的20%~35%，强调脂肪的质量比数量更为重要，建议用多不饱和脂肪酸及单不饱和脂肪酸取代部分饱和脂肪。
          </div>
          <div class="showHowToComfirmPercentDetail">&nbsp; &nbsp; &nbsp;</div>
          <div class="showHowToComfirmPercentDetail">
            &nbsp; &nbsp;
            &nbsp;推荐肾功能正常的糖尿病患者蛋白质摄入宜占总能量的15%~20%，T1DM儿童和青少年推荐蛋白质供能比可增加至25%~35%，老年糖尿病患者蛋白摄入量可酌情增加至每日1.0~1.2
            g/kg。
          </div>
        </template>
      </van-popup>
    </div>
    <div class="slider-box">
      <van-row class="show-percent-row">
        <van-col span="8">
          <div class="show-percent-col">碳水占比{{ carbPercent }}%</div>
        </van-col>
        <van-col span="8">
          <div class="show-percent-col">蛋白质占比{{ proteinPercent }}%</div>
        </van-col>
        <van-col span="8">
          <div class="show-percent-col">脂肪占比{{ fatPercent }}%</div>
        </van-col>
      </van-row>

      <div class="percent-slider">
        <van-slider v-model="sliderValue" range inactive-color="#07c160"> </van-slider>
      </div>
      <div class="submit-btn">
        <van-button type="primary" block round @click="submitToShow">计算</van-button>
      </div>
    </div>
    <div class="result-box" v-show="isShowResult">
      <div class="total-food-value-box">
        <div class="cal-font-div">总热量&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; {{ requiredKalorie }} kcal</div>
        <div class="value-font-div">碳水化合物&nbsp; &nbsp; &nbsp; {{ carbWeight }} g</div>
        <div class="value-font-div">蛋白质&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; {{ proteinWeight }} g</div>
        <div class="value-font-div">脂肪&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; {{ fatWeight }} g</div>
      </div>
      <p class="explain-p">早中晚三餐分配比例：20%、40%、40%</p>
      <div class="chart-container">
        <div class="canvas-box"><canvas ref="breakfastChartCanvas"></canvas></div>
        <div class="canvas-box"><canvas ref="lunchChartCanvas"></canvas></div>
        <div class="canvas-box"><canvas ref="supperChartCanvas"></canvas></div>
      </div>

      <van-row>
        <van-col span="8">
          <div class="meals-font-div">早餐</div>
        </van-col>
        <van-col span="8">
          <div class="meals-font-div">中餐</div>
        </van-col>
        <van-col span="8">
          <div class="meals-font-div">晚餐</div>
        </van-col>
      </van-row>
    </div>
    <div class="foot-box">
      <div class="foot-msg">*饮食不存在好与坏，但极度不推荐生酮饮食</div>
      <div class="foot-msg">*饮食要遵循个性化，本软件只提供参考</div>
      <div class="foot-msg">*计算公式来源：中国1型糖尿病诊治指南（2021版）</div>
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
.meals-font-div {
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
}
.explain-p {
  margin-top: 0px;
  margin-bottom: 10px;
  margin-left: 20px;
  padding-right: 10px;
  padding-left: 10px;
  font-size: 13px;
  color: #969799;
}
.cal-font-div {
  font-weight: bold;
}
.total-food-value-box {
  text-align: left;
  background-color: #b3efff;
  color: #046b99;
  border-radius: 10px;
  margin: 20px;
  padding: 10px;
}
.canvas-box {
  width: 130px;
  height: 130px;
}
.submit-btn {
  margin-top: 30px;
}
.showHowToComfirmPercentTitle {
  margin-top: -20px;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
}
.showHowToComfirmPercentDetail {
  font-size: 15px;
}
.slider-title {
  padding: 15px;
  font-size: 14px;
  color: #969799;
}
.slider-box {
  margin-left: 15px;
  margin-right: 15px;
}
.show-percent-col {
  font-size: 12px;
}
.percent-slider {
  margin: 10px;
  margin-top: 20px;
}
.show-percent-row {
  margin: 10px;
  text-align: center;
}
.page-container {
  min-height: 100vh;
  background: #f6f7fb;
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

.chart-container {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

/* 可以为 canvas 设置具体大小 */
/* canvas {
  width: 50px;
  height: 50px;
} */
</style>
