<script setup>
import { ref, onMounted, computed } from 'vue'
import { Time as IconTime, SunOne, ChopsticksFork, AppleOne } from '@icon-park/vue-next'
// 显示控制
const showSelectDietType = ref(false)

// 饮食时间相关
const dietType = ref({ text: '' })
const selectDietActions = [
  { text: '早餐', value: 1 },
  { text: '午餐', value: 2 },
  { text: '晚餐', value: 3 },
  { text: '加餐', value: 4 }
]
const onConfirm = ({ selectedOptions }) => {
  showSelectDietType.value = false
  dietType.value.text = selectedOptions[0].text
  dietType.value.value = selectedOptions[0].value
}
const initDietType = () => {
  const hour = parseInt(currentTime.value[0])
  const min = parseInt(currentTime.value[1])
  const sec = parseInt(currentTime.value[2])
  // Time between 5:00:00 to 10:00:00
  if ((hour > 5 || (hour === 5 && (min > 0 || sec > 0))) && hour < 10) {
    dietType.value.text = selectDietActions[0].text
    dietType.value.value = selectDietActions[0].value
  }
  // Time between 10:55:00 to 14:55:00
  else if ((hour > 10 || (hour === 10 && (min > 55 || sec > 0))) && (hour < 14 || (hour === 14 && min < 55))) {
    dietType.value.text = selectDietActions[1].text
    dietType.value.value = selectDietActions[1].value
  }
  // Time between 16:55:00 to 20:55:00
  else if ((hour > 16 || (hour === 16 && (min > 55 || sec > 0))) && (hour < 20 || (hour === 20 && min < 55))) {
    dietType.value.text = selectDietActions[2].text
    dietType.value.value = selectDietActions[2].value
  }
}

// 食物描述相关
const food = ref({ name: '' })
const totalCarb = ref()

// 记录时间控制
const now = new Date()
const showChangeRecordTime = ref(false)
const showChangeRecordDate = ref(false)
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

onMounted(() => {
  formatDateTime()
  initDietType()
})
</script>
<template>
  <div class="components-container">
    <van-row justify="space-between" class="group-head">
      <van-col span="24">
        <h2>记录饮食</h2>
      </van-col>
    </van-row>
    <div class="cell-group">
      <van-cell-group inset>
        <van-cell is-link @click="showSelectDietType = true" center :value="dietType.text">
          <template #icon><sun-one theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #title>
            <div class="title-in-cell">饮食类型</div>
          </template>
        </van-cell>
        <van-popup v-model:show="showSelectDietType" round position="bottom">
          <van-picker :columns="selectDietActions" @cancel="showSelectDietType = false" @confirm="onConfirm" />
        </van-popup>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-field v-model="food.name" type="text" label="食物描述" input-align="right">
          <template #left-icon><chopsticks-fork theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
        </van-field>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-field v-model="totalCarb" type="text" label="总碳水" input-align="right">
          <template #left-icon><apple-one theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #right-icon> 克 </template>
        </van-field>
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
    <div id="tip-box" v-if="showtips">*双波可理解为：大剂量+方波</div>
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

.title-in-cell {
  margin-left: 5px;
}
</style>
