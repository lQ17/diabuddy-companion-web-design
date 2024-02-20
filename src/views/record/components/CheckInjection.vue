<script setup>
import { AllApplication, Fork, Time as IconTime, Needle, SpeedOne, HourglassFull as IconHourglassFull } from '@icon-park/vue-next'
import { ref, onMounted, computed } from 'vue'
import selectInjectionActions from '@/components/InjectionActions'
import { recordUpdateInjectionService } from '@/api/record'
import { showToast, showSuccessToast, showFailToast } from '@/components/vantComponents'
import { useUserStore } from '@/stores'

const props = defineProps({
  typeDetail: {
    type: Object,
    default: () => ({})
  }
})

const userStore = useUserStore()

// 表单数据
// 胰岛素类型
const insulinType = ref({ text: '', otherText: '' })
// 胰岛素注射方式
const injectionType = ref({ text: '' })
// 大剂量单位
const bolus = ref()
// 方波持续时间
const squareWaveTime = ref()
// 方波速率
const squareWaveRate = ref()
const remark = ref('')

// 显示控件
const showIsOtherType = computed(() => {
  if (insulinType.value.text === '其他(可自己输入)') {
    return true
  } else {
    return false
  }
})
const showSelectInjectionType = ref(false)
const showSelectinjectionType = ref(false)
const showBolus = computed(() => {
  if (injectionType.value.text === '大剂量' || injectionType.value.text === '双波') {
    return true
  } else {
    return false
  }
})
const showSquareWave = computed(() => {
  if (injectionType.value.text === '方波' || injectionType.value.text === '双波') {
    return true
  } else {
    return false
  }
})
const showtips = computed(() => {
  if (injectionType.value.text === '双波') {
    return true
  } else {
    return false
  }
})

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

const selectinjectionTypeActions = [
  { text: '大剂量', value: 1 },
  { text: '方波', value: 2 },
  { text: '双波', value: 3 }
]

const onConfirm = ({ selectedOptions }) => {
  showSelectInjectionType.value = false
  insulinType.value.text = selectedOptions[0].text
  insulinType.value.value = selectedOptions[0].value
}
const onConfirmWay = ({ selectedOptions }) => {
  showSelectinjectionType.value = false
  injectionType.value.text = selectedOptions[0].text
  injectionType.value.value = selectedOptions[0].value
}

const formatedDateTimeToSubmit = computed(() => {
  return `${currentDate.value[0]}-${currentDate.value[1]}-${currentDate.value[2]} ${currentTime.value[0]}:${currentTime.value[1]}:${currentTime.value[2]}`
})

const initInjectionType = () => {
  injectionType.value.text = props.typeDetail.injectionType
  insulinType.value.text = props.typeDetail.insulinType
  bolus.value = props.typeDetail.bolus
  squareWaveRate.value = props.typeDetail.squareWaveRate
  squareWaveTime.value = props.typeDetail.squareWaveTime
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

// 判断是否能修改注射方式
const validateChangeInjectionType = () => {
  if (isCheck.value === true) {
    return
  } else {
    showSelectinjectionType.value = true
  }
}

// 判断是否能修改胰岛素类型
const validateChangeInsulinType = () => {
  if (isCheck.value === true) {
    return
  } else {
    showSelectInjectionType.value = true
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
      injectionType: injectionType.value.text,
      insulinType: insulinType.value.text,
      bolus: bolus.value,
      squareWaveRate: squareWaveRate.value,
      squareWaveTime: squareWaveTime.value,
      recordTime: formatedDateTimeToSubmit.value,
      remark: remark.value
    }
    try {
      await recordUpdateInjectionService(toSubmitObj)
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
  if (injectionType.value.text === '大剂量') {
    squareWaveRate.value = null
    squareWaveTime.value = null
    if (bolus.value > 0) {
      return true
    } else {
      return false
    }
  } else if (injectionType.value.text === '方波') {
    bolus.value = null
    if (squareWaveRate.value > 0 && squareWaveTime.value > 0) {
      return true
    } else {
      return false
    }
  } else if (injectionType.value.text === '双波') {
    if (squareWaveRate.value > 0 && squareWaveTime.value > 0 && bolus.value > 0) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

onMounted(() => {
  initInjectionType()
})
</script>
<template>
  <div class="components-container">
    <van-row justify="space-between" class="group-head">
      <van-col span="24">
        <h2>记录注射</h2>
      </van-col>
    </van-row>
    <div class="cell-group">
      <van-cell-group inset>
        <van-cell :is-link="!isCheck" @click="validateChangeInsulinType()" center :value="insulinType.text">
          <template #icon><all-application theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #title>
            <div class="title-in-cell">胰岛素类型</div>
          </template>
        </van-cell>
        <van-field v-model="insulinType.otherText" label="请输入" input-align="right" v-if="showIsOtherType">
          <template #left-icon><all-application theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
        </van-field>
        <van-popup v-model:show="showSelectInjectionType" round position="bottom">
          <van-picker :columns="selectInjectionActions" @cancel="showSelectInjectionType = false" @confirm="onConfirm" />
        </van-popup>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-cell :is-link="!isCheck" @click="validateChangeInjectionType()" center :value="injectionType.text">
          <template #icon><fork theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #title>
            <div class="title-in-cell">注射方式</div>
          </template>
        </van-cell>
        <van-popup v-model:show="showSelectinjectionType" round position="bottom">
          <van-picker :columns="selectinjectionTypeActions" @cancel="showSelectinjectionType = false" @confirm="onConfirmWay" />
        </van-popup>
      </van-cell-group>
    </div>
    <div class="cell-group" v-if="showBolus">
      <van-cell-group inset>
        <van-field v-model="bolus" type="number" label="大剂量" input-align="right" :readonly="isCheck">
          <template #left-icon><needle theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #right-icon> U </template>
        </van-field>
      </van-cell-group>
    </div>
    <div class="cell-group" v-if="showSquareWave">
      <van-cell-group inset>
        <van-field v-model="squareWaveRate" type="number" label="方波速率" input-align="right" :readonly="isCheck">
          <template #left-icon><speed-one theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #right-icon> U/H </template>
        </van-field>
      </van-cell-group>
    </div>
    <div class="cell-group" v-if="showSquareWave">
      <van-cell-group inset>
        <van-field v-model="squareWaveTime" type="number" label="方波持续时间" input-align="right" :readonly="isCheck">
          <template #left-icon><icon-hourglass-full theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #right-icon> 分钟 </template>
        </van-field>
      </van-cell-group>
    </div>
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
  <div id="tip-box" v-if="showtips">*双波可理解为：大剂量+方波</div>
  <div class="btn-submit" v-if="isCheck"><van-button type="primary" block round plain @click="onEdit()">修改</van-button></div>
  <div class="btn-submit" v-else><van-button type="primary" block round plain @click="onSave()">保存</van-button></div>
</template>

<style scoped>
#tip-box {
  margin-top: 10px;
  text-align: center;
  color: #808080;
  font-size: 15px;
}
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
