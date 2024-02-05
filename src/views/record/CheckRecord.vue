<script setup>
import { ref } from 'vue'
const onClickLeft = () => history.back()
const selectedModel = ref(0)
const selectedTime = ref('nearlyWeek')
const modelOption = [
  { text: '全部记录', value: 0 },
  { text: '血糖', value: 1 },
  { text: '运动', value: 2 },
  { text: '注射', value: 3 },
  { text: '用药', value: 4 },
  { text: '饮食', value: 5 }
]
const timeOption = [
  { text: '全部时间', value: 'allTime' },
  { text: '最近一个月', value: 'nearlyMonth' },
  { text: '最近一周', value: 'nearlyWeek' }
]

const list = ref([
  { recordType: 'booldSugar', bloodSugarLevel: 5.5, measureTime: '空腹', recordTime: '07:03', recordDate: '2024-02-21' },
  { recordType: 'exercise', exerciseType: '跑步', duration: 30, recordTime: '08:03', recordDate: '2024-02-21' },
  {
    recordType: 'injection',
    insulinType: '门冬胰岛素',
    injectionType: 'bolus',
    bolus: 3,
    squareWaveTime: 0,
    squareWaveRate: 0,
    recordTime: '07:05',
    recordDate: '2024-02-21'
  },
  {
    recordType: 'injection',
    insulinType: '赖脯胰岛素',
    injectionType: 'squareWave',
    bolus: 0,
    squareWaveTime: 150,
    squareWaveRate: 2.25,
    recordTime: '12:05',
    recordDate: '2024-02-21'
  },
  { recordType: 'agent', medicationName: '盐酸二甲双胍', dosage: 85, measureTime: '空腹', recordTime: '11:59', recordDate: '2024-02-21' },
  { recordType: 'diet', mealType: '晚餐', foodName: '烧饼', totalCarb: 45, recordTime: '11:59', recordDate: '2024-02-21' }
])
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="所有记录" left-text="返回" left-arrow @click-left="onClickLeft" fixed placeholder />
    <van-dropdown-menu>
      <van-dropdown-item v-model="selectedModel" :options="modelOption" />
      <van-dropdown-item v-model="selectedTime" :options="timeOption" />
    </van-dropdown-menu>
    <van-list>
      <div class="cell-group" v-for="(item, index) in list" :key="index">
        <van-cell-group inset>
          <van-cell center>
            <template #title>
              <div class="bloodSugar" v-if="item.recordType === 'booldSugar'">
                <van-space>
                  <div class="item-value">{{ item.bloodSugarLevel }}</div>
                  <div>mmol/L</div>
                </van-space>
              </div>
              <div class="exercise" v-if="item.recordType === 'exercise'">
                <van-space>
                  <div class="item-value">{{ item.duration }}</div>
                  <div>分钟</div>
                </van-space>
              </div>
              <div class="injection" v-if="item.recordType === 'injection'">
                <van-space v-if="item.injectionType === 'bolus'">
                  <div class="item-value">{{ item.bolus }}</div>
                  <div>U</div>
                </van-space>
                <van-space v-if="item.injectionType === 'squareWave'">
                  <div class="item-value">{{ item.squareWaveRate }}</div>
                  <div>U/H</div>
                </van-space>
              </div>
              <div class="agent" v-if="item.recordType === 'agent'">
                <van-space>
                  <div class="medication-name">{{ item.medicationName }}</div>
                </van-space>
              </div>
              <div class="diet" v-if="item.recordType === 'diet'">
                <van-space>
                  <div class="item-value">{{ item.totalCarb }}</div>
                  <div>克碳水</div>
                </van-space>
              </div>
            </template>
            <template #label>
              <div class="bloodSugar" v-if="item.recordType === 'booldSugar'">{{ item.recordTime }} - {{ item.measureTime }}</div>
              <div class="exercise" v-if="item.recordType === 'exercise'">{{ item.recordTime }} - {{ item.exerciseType }}</div>
              <div class="injection" v-if="item.recordType === 'injection'">
                <div class="bolus" v-if="item.injectionType === 'bolus'">{{ item.recordTime }} - {{ item.insulinType }}</div>
                <div class="bolus" v-if="item.injectionType === 'squareWave'">{{ item.recordTime }} - {{ item.squareWaveTime }}分钟</div>
              </div>
              <div class="agent" v-if="item.recordType === 'agent'">{{ item.recordTime }} - {{ item.dosage }}mg</div>
              <div class="diet" v-if="item.recordType === 'diet'">{{ item.recordTime }} - {{ item.mealType }}</div>
            </template>
            <template #value>
              <div class="bloodSugar" v-if="item.recordType === 'booldSugar'">
                {{ item.recordDate }}
                <van-tag color="#ffe1e1" text-color="#ad0000" class="custom-title" size="large">血糖</van-tag>
              </div>
              <div class="exercise" v-if="item.recordType === 'exercise'">
                {{ item.recordDate }}
                <van-tag color="#cfffd4" text-color="#009a0f" class="custom-title" size="large">运动</van-tag>
              </div>
              <div class="injection" v-if="item.recordType === 'injection'">
                {{ item.recordDate }}
                <van-tag color="#cbe3ff" text-color="#0077ff" class="custom-title" size="large">注射</van-tag>
              </div>
              <div class="agent" v-if="item.recordType === 'agent'">
                {{ item.recordDate }}
                <van-tag color="#cca4e3" text-color="#56004f" class="custom-title" size="large">用药</van-tag>
              </div>
              <div class="diet" v-if="item.recordType === 'diet'">
                {{ item.recordDate }}
                <van-tag color="#ffeea1" text-color="#ff7500" class="custom-title" size="large">饮食</van-tag>
              </div>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </van-list>
  </div>
</template>

<style scoped>
.medication-name {
  font-size: 20px;
}
.item-value {
  font-size: 30px;
}
.cell-group {
  padding-top: 10px;
  /* padding-left: 10px; */
  padding-bottom: 0px;
  /* padding-right: 10px; */
}
.page-container {
  min-height: 100vh;
  background: #f6f7fb;
}
</style>
