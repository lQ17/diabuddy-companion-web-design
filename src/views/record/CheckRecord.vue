<script setup>
import { ref, computed, onMounted } from 'vue'
import { recordGetList, recordDeleteService } from '@/api/record'
import { useUserStore } from '@/stores'
import { useRouter, useRoute } from 'vue-router'
import { showConfirmDialog } from '@/components/vantComponents'
const router = useRouter()
const route = useRoute()
const id = route.query.id
const username = route.query.username
const userStore = useUserStore()
const onClickLeft = () => history.back()

// 控制组件
const selectedModel = ref('all')
const selectedTime = ref('nearlyWeek')
const modelOption = [
  { text: '全部记录', value: 'all' },
  { text: '血糖', value: 'bloodSugar' },
  { text: '运动', value: 'exercise' },
  { text: '注射', value: 'injection' },
  { text: '用药', value: 'agent' },
  { text: '饮食', value: 'diet' }
]
const timeOption = [
  { text: '全部时间', value: 'allTime' },
  { text: '最近一个月', value: 'nearlyMonth' },
  { text: '最近一周', value: 'nearlyWeek' }
]

const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从0开始计数，所以+1
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 计算startTime和endTime
const timeRange = computed(() => {
  const now = new Date()
  let startTime = ''
  const endTime = formatDate(now)

  switch (selectedTime.value) {
    case 'nearlyMonth': {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
      startTime = formatDate(lastMonth)
      break
    }
    case 'nearlyWeek': {
      const lastWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
      startTime = formatDate(lastWeek)
      break
    }
    case 'allTime':
    default:
      // 如果是'allTime'或未知值，不设置startTime
      startTime = '1970-01-01 08:00:00'
  }
  return { startTime, endTime }
})
// 假数据
// const list = ref([
//   { recordType: 'bloodSugar', bloodSugarLevel: 5.5, measureTime: '空腹', recordTime: '07:03:00', recordDate: '2024-02-21' },
//   { recordType: 'exercise', exerciseType: '跑步', duration: 30, recordTime: '08:03:00', recordDate: '2024-02-21' },
//   {
//     recordType: 'injection',
//     insulinType: '门冬胰岛素',
//     injectionType: '大剂量',
//     bolus: 3,
//     squareWaveTime: 0,
//     squareWaveRate: 0,
//     recordTime: '07:05:00',
//     recordDate: '2024-02-21'
//   },
//   {
//     recordType: 'injection',
//     insulinType: '赖脯胰岛素',
//     injectionType: '方波',
//     bolus: 0,
//     squareWaveTime: 150,
//     squareWaveRate: 2.25,
//     recordTime: '12:05:00',
//     recordDate: '2024-02-21'
//   },
//   {
//     recordType: 'injection',
//     insulinType: '赖脯胰岛素',
//     injectionType: '双波',
//     bolus: 3,
//     squareWaveTime: 200,
//     squareWaveRate: 1.75,
//     recordTime: '12:55:00',
//     recordDate: '2024-02-31'
//   },
//   { recordType: 'agent', agentName: '盐酸二甲双胍', dosage: 85, measureTime: '空腹', recordTime: '11:59:00', recordDate: '2024-02-21' },
//   { recordType: 'diet', mealType: '晚餐', foodName: '烧饼', totalCarb: 45, recordTime: '11:59:00', recordDate: '2024-02-21' }
// ])
const list = ref([])
const loading = ref(false)
const finished = ref(false)
const page = ref(1)
const pageSize = 10
const onLoad = async () => {
  loading.value = true

  try {
    const submitObj = {
      userId: id,
      recordType: selectedModel.value,
      page: page.value,
      pageSize: pageSize,
      startTime: timeRange.value.startTime,
      endTime: timeRange.value.endTime
    }

    const res = await recordGetList(submitObj)
    const newList = res.data.data.list
    list.value = list.value.concat(newList)
    const totalPages = res.data.data.totalPages

    // 判断是否全部加载完成
    if (page.value >= totalPages) {
      finished.value = true
    } else {
      // 如果还没有加载完，准备加载下一页
      page.value += 1
    }
  } catch (error) {
    console.error('加载数据失败:', error)
  }

  loading.value = false
}

const changeParams = () => {
  list.value = []
  page.value = 1
  loading.value = false
  finished.value = false
  onLoad()
}
const onDelete = async (item, index) => {
  showConfirmDialog({
    title: '确认删除？'
  })
    .then(async () => {
      list.value.splice(index, 1)
      await recordDeleteService(item.recordRootId)
    })
    .catch(() => {})
}

const onCheckRecordDetail = (item) => {
  router.push(`/check-record/detail?recordRootId=${item.recordRootId}`)
}

const pageTitle = ref('我的所有记录')

onMounted(() => {
  if (id != userStore.user.id) {
    if (username) {
      pageTitle.value = username + '的所有记录'
    } else {
      pageTitle.value = 'TA的所有记录'
    }
  }
})
</script>

<template>
  <div class="page-container">
    <van-nav-bar :title="pageTitle" left-text="返回" left-arrow @click-left="onClickLeft" fixed placeholder />
    <van-dropdown-menu>
      <van-dropdown-item v-model="selectedModel" :options="modelOption" @change="changeParams" />
      <van-dropdown-item v-model="selectedTime" :options="timeOption" @change="changeParams" />
    </van-dropdown-menu>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad()">
      <div class="cell-group van-haptics-feedback" v-for="(item, index) in list" :key="index" @click="onCheckRecordDetail(item)">
        <van-cell-group inset>
          <van-swipe-cell>
            <van-cell center>
              <template #title>
                <div class="bloodSugar" v-if="item.recordType === 'bloodSugar'">
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
                  <van-space v-if="item.injectionType === '大剂量'">
                    <div class="item-value">{{ item.bolus }}</div>
                    <div>U</div>
                  </van-space>
                  <van-space v-if="item.injectionType === '方波'">
                    <div class="item-value">{{ item.squareWaveRate }}U/H</div>
                    <div class="item-value-mid">{{ item.squareWaveTime }}分钟</div>
                  </van-space>
                  <van-space v-if="item.injectionType === '双波'">
                    <div class="item-value">{{ item.bolus }}U</div>
                    <div class="item-value-mid">{{ item.squareWaveRate }}U/H</div>
                    <div class="item-value-mid">{{ item.squareWaveTime }}分钟</div>
                  </van-space>
                </div>
                <div class="agent" v-if="item.recordType === 'agent'">
                  <van-space>
                    <div class="item-value">{{ item.dosage }}</div>
                    <div>mg</div>
                  </van-space>
                </div>
                <div class="diet" v-if="item.recordType === 'diet'">
                  <van-space>
                    <div class="item-value">{{ item.totalCarb }}</div>
                    <div>克碳水</div>
                  </van-space>
                </div>
              </template>

              <!-- 只显示时间 -->
              <template #label>
                {{ item.recordDate }} {{ item.recordTime }}
                <!-- <div class="bloodSugar" v-if="item.recordType === 'bloodSugar'">{{ item.recordDate }} {{ item.recordTime }}</div>
              <div class="exercise" v-if="item.recordType === 'exercise'">{{ item.recordDate }} {{ item.recordTime }}</div>
              <div class="injection" v-if="item.recordType === 'injection'">{{ item.recordDate }} {{ item.recordTime }}</div>
              <div class="agent" v-if="item.recordType === 'agent'">{{ item.recordDate }} {{ item.recordTime }}</div>
              <div class="diet" v-if="item.recordType === 'diet'">{{ item.recordDate }} {{ item.recordTime }}</div> -->
              </template>

              <!-- Tag、二级信息（空腹、大剂量……） -->
              <template #value>
                <div class="bloodSugar" v-if="item.recordType === 'bloodSugar'">
                  {{ item.measureTime }}
                  <van-tag color="#ffe1e1" text-color="#ad0000" class="custom-title" size="large">血糖</van-tag>
                </div>
                <div class="exercise" v-if="item.recordType === 'exercise'">
                  {{ item.exerciseType }}
                  <van-tag color="#cfffd4" text-color="#009a0f" class="custom-title" size="large">运动</van-tag>
                </div>
                <div class="injection" v-if="item.recordType === 'injection'">
                  {{ item.injectionType }}
                  <van-tag color="#cbe3ff" text-color="#0077ff" class="custom-title" size="large">注射</van-tag>
                </div>
                <div class="agent" v-if="item.recordType === 'agent'">
                  {{ item.agentName }}
                  <van-tag color="#eed0ff" text-color="#56004f" class="custom-title" size="large">用药</van-tag>
                </div>
                <div class="diet" v-if="item.recordType === 'diet'">
                  {{ item.mealType }}
                  <van-tag color="#ffeea1" text-color="#ff7500" class="custom-title" size="large">饮食</van-tag>
                </div>
              </template>
            </van-cell>
            <template #right>
              <van-button class="right-btn" square type="danger" text="删除" @click="onDelete(item, index)" />
            </template>
          </van-swipe-cell>
        </van-cell-group>
      </div>
    </van-list>
  </div>
</template>

<style scoped>
.right-btn {
  height: 100%;
}
.item-value-mid {
  font-size: 15px;
}
.item-value {
  font-size: 20px;
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
