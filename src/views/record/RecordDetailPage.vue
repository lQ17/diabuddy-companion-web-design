<script setup>
import { useRoute } from 'vue-router'
import CheckBloodSugar from './components/CheckBloodSugar.vue'
import CheckExercise from './components/CheckExercise.vue'
import CheckInjection from './components/CheckInjection.vue'
import CheckAgent from './components/CheckAgent.vue'
import CheckDiet from './components/CheckDiet.vue'
import { recordGetDetailService } from '@/api/record'
import { ref, onMounted } from 'vue'
const route = useRoute()
const recordRootId = route.query.recordRootId
const onClickLeft = () => history.back()
const recordType = ref('')
const typeDetail = ref({})
const getDetail = async () => {
  const res = await recordGetDetailService(recordRootId)
  recordType.value = res.data.data.recordType
  typeDetail.value = res.data.data.typeDetail
}
onMounted(() => {
  getDetail()
})
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="记录详情" left-text="返回" left-arrow @click-left="onClickLeft" fixed placeholder />
    <check-agent v-if="recordType === 'agent'" :typeDetail="typeDetail"></check-agent>
    <check-blood-sugar v-if="recordType === 'bloodSugar'" :typeDetail="typeDetail"></check-blood-sugar>
    <check-diet v-if="recordType === 'diet'" :typeDetail="typeDetail"></check-diet>
    <check-exercise v-if="recordType === 'exercise'" :typeDetail="typeDetail"></check-exercise>
    <check-injection v-if="recordType === 'injection'" :typeDetail="typeDetail"></check-injection>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  background: #f6f7fb;
}
</style>
