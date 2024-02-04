<script setup>
import { ref, onMounted, computed } from 'vue'
import { WaterLevel as IconWaterLevel, Time as IconTime, SpeedOne as IconSpeedOne } from '@icon-park/vue-next'
import changeMeasureActions from './MeasureActions'
const now = new Date()
const showChangeRecordTime = ref(false)
const showChangeRecordDate = ref(false)
const showChangeMeasure = ref(false)

const onConfirm = ({ selectedOptions }) => {
  showChangeMeasure.value = false
  measureTime.value.text = selectedOptions[0].text
  measureTime.value.value = selectedOptions[0].value
}
const measureTime = ref({ text: '', value: '' })
const currentTime = ref(['', '', ''])
const currentDate = ref(['', '', ''])
const columnsType = ['hour', 'minute', 'second']
const showDateTime = computed(() => {
  return (
    currentDate.value[0] +
    '年' +
    currentDate.value[1] +
    '月' +
    currentDate.value[2] +
    '日' +
    currentTime.value[0] +
    ':' +
    currentTime.value[1] +
    ':' +
    currentTime.value[2]
  )
})
const formatDateTime = () => {
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  const year = String(now.getFullYear())
  const month = String(now.getMonth() + 1).padStart(2, '0') // 月份是从0开始的
  const date = String(now.getDate()).padStart(2, '0')
  currentTime.value = [hours, minutes, seconds]
  currentDate.value = [year, month, date]
}
const initMeasureTime = () => {
  const hour = parseInt(currentTime.value[0])
  const min = parseInt(currentTime.value[1])
  const sec = parseInt(currentTime.value[2])
  if ((hour >= 23 && min >= 0 && sec >= 0) || (hour < 1 && min >= 0 && sec >= 0)) {
    // 凌晨
    measureTime.value.text = changeMeasureActions[0].text
    measureTime.value.value = changeMeasureActions[0].value
    return
  }
  if ((hour > 5 || (hour === 5 && (min > 0 || sec > 0))) && hour < 7) {
    // 空腹
    // 当前时间大于等于5:00:00且小于7:00:00
    measureTime.value.text = changeMeasureActions[1].text
    measureTime.value.value = changeMeasureActions[1].value
    return
  }
  if ((hour > 7 || (hour === 7 && (min > 0 || sec > 0))) && hour < 10) {
    // 早餐后
    // 当前时间大于等于7:00:00且小于10:00:00
    measureTime.value.text = changeMeasureActions[2].text
    measureTime.value.value = changeMeasureActions[2].value
    return
  }
  if ((hour > 11 || (hour === 11 && min >= 30)) && (hour < 13 || (hour === 13 && min < 30))) {
    // 午餐前
    // 当前时间大于等于11:30:00且小于13:30:00
    measureTime.value.text = changeMeasureActions[3].text
    measureTime.value.value = changeMeasureActions[3].value
    return
  }
  if ((hour > 13 || (hour === 13 && min >= 30)) && (hour < 15 || (hour === 15 && min < 30))) {
    // 午餐后
    // 当前时间大于等于13:30:00且小于15:30:00
    measureTime.value.text = changeMeasureActions[4].text
    measureTime.value.value = changeMeasureActions[4].value
    return
  }
  if ((hour > 17 || (hour === 17 && min >= 0)) && (hour < 19 || (hour === 19 && min < 30))) {
    // 晚餐前
    // 当前时间大于等于17:00:00且小于19:30:00
    measureTime.value.text = changeMeasureActions[5].text
    measureTime.value.value = changeMeasureActions[5].value
    return
  }
  if ((hour > 19 || (hour === 19 && min >= 30)) && (hour < 21 || (hour === 21 && min < 30))) {
    // 晚餐后
    // 当前时间大于等于19:30:00且小于21:30:00
    measureTime.value.text = changeMeasureActions[6].text
    measureTime.value.value = changeMeasureActions[6].value
    return
  }
  if ((hour > 21 || (hour === 21 && min >= 30)) && hour < 23) {
    // 睡前
    // 当前时间大于等于21:30:00且小于23:00:00
    measureTime.value.text = changeMeasureActions[7].text
    measureTime.value.value = changeMeasureActions[7].value
    return
  }
  // 随机
  measureTime.value.text = changeMeasureActions[8].text
  measureTime.value.value = changeMeasureActions[8].value
}

// 初始化时间和日期
onMounted(() => {
  formatDateTime()
  initMeasureTime()
})
const bloodSugar = ref()
</script>
<template>
  <div class="components-container">
    <van-row justify="space-between" class="group-head">
      <van-col span="24">
        <h2>记录血糖</h2>
      </van-col>
    </van-row>
    <div class="cell-group">
      <van-cell-group inset>
        <van-field v-model="bloodSugar" type="number" label="血糖" input-align="right">
          <template #left-icon> <icon-water-level theme="filled" size="20" fill="#DC143C" strokeLinecap="square" /> </template>
          <template #right-icon> mmol/L </template>
        </van-field>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-cell is-link @click="showChangeMeasure = true" center :value="measureTime.text">
          <template #icon><icon-speed-one theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #title>
            <div class="title-in-cell">测量节点</div>
          </template>
        </van-cell>
        <van-popup v-model:show="showChangeMeasure" round position="bottom">
          <van-picker :columns="changeMeasureActions" @cancel="showChangeMeasure = false" @confirm="onConfirm" />
        </van-popup>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-cell is-link @click="showChangeRecordDate = true" center>
          <template #icon> <icon-time theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /> </template>
          <template #value>{{ showDateTime }} </template>
          <template #title>
            <div class="title-in-cell">记录时间</div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <van-popup v-model:show="showChangeRecordTime" position="bottom" round :style="{ height: '30%' }">
      <van-time-picker v-model="currentTime" title="选择时间" :columns-type="columnsType" @confirm="showChangeRecordTime = false" />
    </van-popup>
    <van-popup v-model:show="showChangeRecordDate" position="bottom" round :style="{ height: '30%' }">
      <van-date-picker v-model="currentDate" title="选择日期" @confirm="(showChangeRecordDate = false), (showChangeRecordTime = true)" />
    </van-popup>
    <div class="btn-submit"><van-button type="primary" block round plain>提交</van-button></div>
    <div class="btn-submit"><van-button type="success" block round plain>提交并记录下一条</van-button></div>
  </div>
</template>

<style scoped>
.btn-submit {
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 20px;
}
.title-in-cell {
  margin-left: 5px;
}
.group-head {
  margin-top: 10px;
  margin-left: 20px;
  font-weight: bold;
  color: #046b99;
}
.cell-group {
  padding-top: 10px;
  /* padding-left: 10px; */
  padding-bottom: 0px;
  /* padding-right: 10px; */
}
</style>
