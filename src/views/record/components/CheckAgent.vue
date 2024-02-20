<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores'
import { showToast, showSuccessToast, showFailToast } from '@/components/vantComponents'
import { MedicineBottleOne, Ruler, Time as IconTime } from '@icon-park/vue-next'
import { recordUpdateAgentService } from '@/api/record'
const props = defineProps({
  typeDetail: {
    type: Object,
    default: () => ({})
  }
})

const userStore = useUserStore()
//药名 计量
const agentName = ref('')
const dosage = ref()
const remark = ref('')
// 记录时间控制
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

const formatedDateTimeToSubmit = computed(() => {
  return `${currentDate.value[0]}-${currentDate.value[1]}-${currentDate.value[2]} ${currentTime.value[0]}:${currentTime.value[1]}:${currentTime.value[2]}`
})

const initAgent = () => {
  dosage.value = props.typeDetail.dosage
  agentName.value = props.typeDetail.agentName
  remark.value = props.typeDetail.remark
  // 分割日期和时间
  const [date, time] = props.typeDetail.recordTime.split(' ')

  // 分割日期的年、月、日
  const [year, month, day] = date.split('-')

  // 分割时间的小时、分钟、秒
  const [hour, minute, second] = time.split(':')

  // 赋值给 currentDate.value 和 currentTime.value
  currentDate.value[0] = year
  currentDate.value[1] = month
  currentDate.value[2] = day
  currentTime.value[0] = hour
  currentTime.value[1] = minute
  currentTime.value[2] = second
}

// 判断props.typeDetail.userId === userStore.user.id 才可以修改，否则只能查看
const isCheck = ref(true)

// 判断是否能修改时间
const validateChangeTime = () => {
  if (isCheck.value === true) {
    return
  } else {
    showChangeRecordDate.value = true
  }
}

const onEdit = () => {
  if (props.typeDetail.userId === userStore.user.id) {
    isCheck.value = false
  } else {
    showFailToast('非本人数据，不能修改')
  }
}

const onSave = async () => {
  if (validateToSubmit()) {
    isCheck.value = true
    const toSubmitObj = {
      id: props.typeDetail.id,
      userId: props.typeDetail.userId,
      dosage: dosage.value,
      agentName: agentName.value,
      recordTime: formatedDateTimeToSubmit.value,
      remark: remark.value
    }
    try {
      await recordUpdateAgentService(toSubmitObj)
      showSuccessToast('修改成功')
    } catch (error) {
      showFailToast(error || '未知错误')
    }
  } else {
    showToast('请输入正确信息')
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

onMounted(() => {
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
        <van-field v-model="agentName" type="text" label="药品名" input-align="right" :readonly="isCheck">
          <template #left-icon><medicine-bottle-one theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
        </van-field>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-field v-model="dosage" type="number" label="剂量" input-align="right" :readonly="isCheck">
          <template #left-icon><ruler theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #right-icon> mg </template>
        </van-field>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-cell :is-link="!isCheck" @click="validateChangeTime()" center>
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
          :readonly="isCheck"
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
    <div class="btn-submit" v-if="isCheck"><van-button type="primary" block round plain @click="onEdit()">修改</van-button></div>
    <div class="btn-submit" v-else><van-button type="primary" block round plain @click="onSave()">保存</van-button></div>
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
