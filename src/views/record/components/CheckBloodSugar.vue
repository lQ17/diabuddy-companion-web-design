<script setup>
import { ref, onMounted, computed } from 'vue'
import { WaterLevel as IconWaterLevel, Time as IconTime, SpeedOne as IconSpeedOne } from '@icon-park/vue-next'
import changeMeasureActions from './MeasureActions'
import { useUserStore } from '@/stores'
import { showSuccessToast, showToast, showFailToast } from '@/components/vantComponents'
import { recordUpdateBloodSugarService } from '@/api/record'
const props = defineProps({
  typeDetail: {
    type: Object,
    default: () => ({})
  }
})
const userStore = useUserStore()
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

const bloodSugar = ref()
const remark = ref('')
const formatedDateTimeToSubmit = computed(() => {
  return `${currentDate.value[0]}-${currentDate.value[1]}-${currentDate.value[2]} ${currentTime.value[0]}:${currentTime.value[1]}:${currentTime.value[2]}`
})

const initBloodSugar = () => {
  bloodSugar.value = props.typeDetail.bloodSugarValue
  remark.value = props.typeDetail.remark

  // 测量节点初始化赋值
  measureTime.value.value = props.typeDetail.measureTime
  for (const action of changeMeasureActions) {
    if (action.value === measureTime.value.value) {
      measureTime.value.text = action.text
      break
    }
  }

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

// 判断是否能修改测量节点
const validateChangeMeasureTime = () => {
  if (isCheck.value === true) {
    return
  } else {
    showChangeMeasure.value = true
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
      bloodSugarValue: bloodSugar.value,
      measureTime: measureTime.value.value,
      recordTime: formatedDateTimeToSubmit.value,
      remark: remark.value
    }
    try {
      await recordUpdateBloodSugarService(toSubmitObj)
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
  if (bloodSugar.value > 0) {
    return true
  } else {
    return false
  }
}

onMounted(() => {
  initBloodSugar()
})
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
          <template #left-icon> <icon-water-level theme="filled" size="20" fill="#DC143C" strokeLinecap="square" :readonly="isCheck" /> </template>
          <template #right-icon> mmol/L </template>
        </van-field>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-cell :is-link="!isCheck" @click="validateChangeMeasureTime()" center :value="measureTime.text">
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
