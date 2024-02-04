<script setup>
import vantComponents from '@/components/vantComponents'
import RecordBloodSugar from './components/RecordBloodSugar.vue'
import RecordExercise from './components/RecordExercise.vue'
import RecordInjection from './components/RecordInjection.vue'
import RecordAgent from './components/RecordAgent.vue'
import RecordDiet from './components/RecordDiet.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const onClickLeft = () => history.back()
const showSelectRecordTypeSheet = ref(true)
const recordType = [
  { name: '血糖记录', value: 1 },
  { name: '运动记录', value: 2 },
  { name: '注射记录', value: 3 },
  { name: '用药记录', value: 4 },
  { name: '饮食记录', value: 5 }
]
const selectedRecordType = ref()
const onSelectRecordType = (item) => {
  showSelectRecordTypeSheet.value = false
  selectedRecordType.value = item.value
}
const onClickOverlay = () => {
  showSelectRecordTypeSheet.value = false
  // 默认选择记录血糖
  selectedRecordType.value = 1
  vantComponents.showToast('已默认选择记录血糖')
}
</script>
<template>
  <div class="page-container">
    <van-nav-bar title="记录新行为" left-text="返回" left-arrow @click-left="onClickLeft" />
    <water-level theme="filled" size="48" fill="#50e3c2" strokeLinecap="square" />
    <van-action-sheet
      v-model:show="showSelectRecordTypeSheet"
      :actions="recordType"
      @select="onSelectRecordType"
      @cancel="router.back()"
      @click-overlay="onClickOverlay"
      cancel-text="取消"
      close-on-click-action
      duration="0.2"
    />
    <div class="components-box" v-if="!showSelectRecordTypeSheet">
      <record-blood-sugar v-if="selectedRecordType === 1"></record-blood-sugar>
      <record-exercise v-if="selectedRecordType === 2"></record-exercise>
      <record-injection v-if="selectedRecordType === 3"></record-injection>
      <record-agent v-if="selectedRecordType === 4"></record-agent>
      <record-diet v-if="selectedRecordType === 5"></record-diet>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  background: #f6f7fb;
}
</style>
