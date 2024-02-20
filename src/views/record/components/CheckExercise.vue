<script setup>
import { ref, onMounted, computed } from 'vue'
import { Sport, Time as IconTime, HourglassFull as IconHourglassFull } from '@icon-park/vue-next'
import { recordUpdateExerciseService } from '@/api/record'
import { showSuccessToast, showToast, showFailToast } from '@/components/vantComponents'
import { useUserStore } from '@/stores'
const props = defineProps({
  typeDetail: {
    type: Object,
    default: () => ({})
  }
})
const userStore = useUserStore()
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

const showSelectExerciseType = ref(false)
// 运动类型
const exerciseType = ref({ text: '' })
// 持续时间
const duration = ref()
const remark = ref('')
// 可选的运动
const selectExerciseActions = [
  { text: '散步', value: 1 },
  { text: '快走', value: 2 },
  { text: '跑步', value: 3 },
  { text: '跳舞', value: 4 },
  { text: '游泳', value: 5 },
  { text: '瑜伽', value: 6 },
  { text: '爬山', value: 7 },
  { text: '爬楼梯', value: 8 },
  { text: '无氧运动', value: 9 },
  { text: '羽毛球', value: 10 },
  { text: '自行车', value: 11 },
  { text: '做家务', value: 12 },
  { text: '乒乓球', value: 13 },
  { text: '网球', value: 14 },
  { text: '排球', value: 15 },
  { text: '足球', value: 16 },
  { text: '篮球', value: 17 },
  { text: '滑旱冰', value: 18 },
  { text: '滑雪', value: 19 },
  { text: '划船', value: 20 },
  { text: '其他', value: 21 }
]

const onConfirm = ({ selectedOptions }) => {
  showSelectExerciseType.value = false
  exerciseType.value.text = selectedOptions[0].text
  exerciseType.value.value = selectedOptions[0].value
}
const formatedDateTimeToSubmit = computed(() => {
  return `${currentDate.value[0]}-${currentDate.value[1]}-${currentDate.value[2]} ${currentTime.value[0]}:${currentTime.value[1]}:${currentTime.value[2]}`
})
const initExercise = () => {
  exerciseType.value.text = props.typeDetail.exerciseType
  duration.value = props.typeDetail.duration
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

// 判断是否能修改测量节点
const validateChangeExerciseType = () => {
  if (isCheck.value === true) {
    return
  } else {
    showSelectExerciseType.value = true
  }
}

const onEdit = () => {
  if (props.typeDetail.userId === userStore.user.id) {
    isCheck.value = false
  } else {
    showFailToast('非本人数据，不能修改')
  }
  isCheck.value = false
}

const onSave = async () => {
  if (validateToSubmit()) {
    isCheck.value = true
    const toSubmitObj = {
      id: props.typeDetail.id,
      userId: props.typeDetail.userId,
      exerciseType: exerciseType.value.text,
      duration: duration.value,
      recordTime: formatedDateTimeToSubmit.value,
      remark: remark.value
    }
    try {
      await recordUpdateExerciseService(toSubmitObj)
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
  if (duration.value > 0) {
    return true
  } else {
    return false
  }
}

onMounted(() => {
  initExercise()
})
</script>

<template>
  <div class="components-container">
    <van-row justify="space-between" class="group-head">
      <van-col span="24">
        <h2>记录运动</h2>
      </van-col>
    </van-row>
    <div class="cell-group">
      <van-cell-group inset>
        <van-cell :is-link="!isCheck" @click="validateChangeExerciseType()" center :value="exerciseType.text">
          <template #icon><sport theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #title>
            <div class="title-in-cell">运动类型</div>
          </template>
        </van-cell>
        <van-popup v-model:show="showSelectExerciseType" round position="bottom">
          <van-picker :columns="selectExerciseActions" @cancel="showSelectExerciseType = false" @confirm="onConfirm" />
        </van-popup>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-field v-model="duration" type="number" label="持续时间" input-align="right" :readonly="isCheck">
          <template #left-icon><icon-hourglass-full theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #right-icon> 分钟 </template>
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
