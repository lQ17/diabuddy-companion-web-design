<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { showToast, showSuccessToast } from '@/components/vantComponents'
import { MedicineBottleOne, Ruler, Time as IconTime } from '@icon-park/vue-next'
import { recordCheckUserLastAgentService, recordAddAgentService } from '@/api/record'
const router = useRouter()
const userStore = useUserStore()
//药名 计量
const agentName = ref('')
const dosage = ref()
const remark = ref('')
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

const formatedDateTimeToSubmit = computed(() => {
  return `${currentDate.value[0]}-${currentDate.value[1]}-${currentDate.value[2]} ${currentTime.value[0]}:${currentTime.value[1]}:${currentTime.value[2]}`
})

// 自动选择上次的药名和计量
// 没有就空着
const initAgent = async () => {
  const res = await recordCheckUserLastAgentService(userStore.user.id)
  if (res.data.data != null) {
    agentName.value = res.data.data.lastAgent
    dosage.value = res.data.data.lastDosage
    showSuccessToast('已自动填写上次记录')
  }
}

// 校验表单
const validateToSubmit = () => {
  if (agentName.value !== '' && dosage.value > 0) {
    return true
  } else {
    return false
  }
}

// 提交
const onSubmit = () => {
  if (validateToSubmit()) {
    addRecord()
    showSuccessToast('提交成功')
    resetForm()
    router.replace('/')
  } else {
    showToast('请输入正确的数据')
  }
}

// 派发一个自定义事件
const emit = defineEmits(['to-next-record'])

// 提交并记录下一条
const onSubmitAndRecordNext = () => {
  if (validateToSubmit()) {
    addRecord()
    showSuccessToast('提交成功')
    resetForm()
    emit('to-next-record')
  } else {
    showToast('请输入正确的数据')
  }
}

// 请求
const addRecord = async () => {
  const toAddObj = {
    userId: userStore.user.id,
    agentName: agentName.value,
    dosage: dosage.value,
    recordTime: formatedDateTimeToSubmit.value,
    remark: remark.value
  }
  await recordAddAgentService(toAddObj)
}

// 重置数据
const resetForm = () => {
  formatDateTime()
  dosage.value = null
  remark.value = ''
  agentName.value = ''
}

onMounted(() => {
  formatDateTime()
  initAgent()
})
</script>
<template>
  <div class="components-container">
    <van-row justify="space-between" class="group-head">
      <van-col span="24">
        <h2>记录用药</h2>
      </van-col>
    </van-row>
    <div class="cell-group">
      <van-cell-group inset>
        <van-field v-model="agentName" type="text" label="药品名" input-align="right">
          <template #left-icon><medicine-bottle-one theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
        </van-field>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-field v-model="dosage" type="number" label="剂量" input-align="right">
          <template #left-icon><ruler theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #right-icon> mg </template>
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
    <div class="cell-group">
      <van-cell-group inset>
        <van-field
          v-model="remark"
          rows="2"
          autosize
          label="备注"
          type="textarea"
          maxlength="100"
          placeholder="说点什么吧，不说也行……"
          show-word-limit
        >
          <template #left-icon>
            <van-icon name="comment-circle-o" size="23" color="#1989fa" />
          </template>
        </van-field>
      </van-cell-group>
    </div>
    <van-popup v-model:show="showChangeRecordTime" position="bottom" round :style="{ height: '30%' }">
      <van-time-picker v-model="currentTime" title="选择时间" :columns-type="columnsType" @confirm="showChangeRecordTime = false" />
    </van-popup>
    <van-popup v-model:show="showChangeRecordDate" position="bottom" round :style="{ height: '30%' }">
      <van-date-picker v-model="currentDate" title="选择日期" @confirm="(showChangeRecordDate = false), (showChangeRecordTime = true)" />
    </van-popup>
    <div class="btn-submit"><van-button type="primary" block round plain @click="onSubmit()">提交</van-button></div>
    <div class="btn-submit"><van-button type="success" block round plain @click="onSubmitAndRecordNext()">提交并记录下一条</van-button></div>
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
