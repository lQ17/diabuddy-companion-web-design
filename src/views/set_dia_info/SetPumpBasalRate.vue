<script setup>
import { ref } from 'vue'
const onClickLeft = () => history.back()
const onClickRight = () => {
  console.log('已保存')
}
// 点击0消失
const onFocus = (item) => {
  if (item.value === '0') {
    item.value = ''
  }
}
const onBlur = (item) => {
  if (item.value === '') {
    item.value = '0'
  }
}
// “同上”按钮
const sameLikeAbove = (index) => {
  if (pumpBasalRate.value[index - 1].value !== '0') {
    // 复制上一个元素的值到当前元素
    pumpBasalRate.value[index].value = pumpBasalRate.value[index - 1].value
  }
}
const pumpBasalRate = ref([
  { name: 'rate_00_00', value: 0 },
  { name: 'rate_00_30', value: 0 },
  { name: 'rate_01_00', value: 0 },
  { name: 'rate_01_30', value: 0 },
  { name: 'rate_02_00', value: 0 },
  { name: 'rate_02_30', value: 0 },
  { name: 'rate_03_00', value: 0 },
  { name: 'rate_03_30', value: 0 },
  { name: 'rate_04_00', value: 0 },
  { name: 'rate_04_30', value: 0 },
  { name: 'rate_05_00', value: 0 },
  { name: 'rate_05_30', value: 0 },
  { name: 'rate_06_00', value: 0 },
  { name: 'rate_06_30', value: 0 },
  { name: 'rate_07_00', value: 0 },
  { name: 'rate_07_30', value: 0 },
  { name: 'rate_08_00', value: 0 },
  { name: 'rate_08_30', value: 0 },
  { name: 'rate_09_00', value: 0 },
  { name: 'rate_09_30', value: 0 },
  { name: 'rate_10_00', value: 0 },
  { name: 'rate_10_30', value: 0 },
  { name: 'rate_11_00', value: 0 },
  { name: 'rate_11_30', value: 0 },
  { name: 'rate_12_00', value: 0 },
  { name: 'rate_12_30', value: 0 },
  { name: 'rate_13_00', value: 0 },
  { name: 'rate_13_30', value: 0 },
  { name: 'rate_14_00', value: 0 },
  { name: 'rate_14_30', value: 0 },
  { name: 'rate_15_00', value: 0 },
  { name: 'rate_15_30', value: 0 },
  { name: 'rate_16_00', value: 0 },
  { name: 'rate_16_30', value: 0 },
  { name: 'rate_17_00', value: 0 },
  { name: 'rate_17_30', value: 0 },
  { name: 'rate_18_00', value: 0 },
  { name: 'rate_18_30', value: 0 },
  { name: 'rate_19_00', value: 0 },
  { name: 'rate_19_30', value: 0 },
  { name: 'rate_20_00', value: 0 },
  { name: 'rate_20_30', value: 0 },
  { name: 'rate_21_00', value: 0 },
  { name: 'rate_21_30', value: 0 },
  { name: 'rate_22_00', value: 0 },
  { name: 'rate_22_30', value: 0 },
  { name: 'rate_23_00', value: 0 },
  { name: 'rate_23_30', value: 0 }
])
// 格式化时间
const formatTimeRange = (rateString) => {
  // 从 rate 字符串中提取小时和分钟
  const matches = rateString.match(/rate_(\d{2})_(\d{2})/)
  if (matches) {
    const startHour = matches[1]
    const startMinute = matches[2]
    // 通过添加30分钟来计算结束时间
    let endHour = parseInt(startHour)
    let endMinute = parseInt(startMinute) + 30
    if (endMinute === 60) {
      endHour = (endHour + 1) % 24
      endMinute = '00'
    }
    // 格式化结束时间小时
    if (endHour < 10) {
      endHour = '0' + endHour
    }
    // 特殊情况处理最后一个时间段
    if (rateString === 'rate_23_30') {
      return `23:30 - 24:00`
    }
    return `${startHour}:${startMinute} - ${endHour}:${endMinute}`
  }
  return '' // 如果格式不匹配，返回空字符串
}
</script>

<template>
  <div class="page-container">
    <van-nav-bar
      title="基础率设置"
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      fixed
      placeholder
    />
    <van-list>
      <van-field
        v-for="(item, index) in pumpBasalRate"
        :key="item.name"
        class="my-cell"
        center
        v-model="item.value"
        input-align="right"
        type="number"
        @focus="onFocus(item)"
        @blur="onBlur(item)"
      >
        <template #label> {{ formatTimeRange(item.name) }}</template>
        <template #right-icon> U/H </template>
        <template #button v-if="item.name !== 'rate_00_00'">
          <van-button plain type="primary" size="small" @click="() => sameLikeAbove(index)">同上</van-button>
        </template>
        <template #button v-else>
          <van-button plain type="primary" size="small" disabled id="first_cell">同上</van-button>
        </template>
      </van-field>
    </van-list>
  </div>
</template>

<style scoped>
#first_cell {
  opacity: 0;
}
.cell-value {
  text-align: center;
}
.my-cell {
  --van-field-label-width: 120px;
}
</style>
