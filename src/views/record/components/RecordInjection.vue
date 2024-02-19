<script setup>
import { AllApplication, Fork, Time as IconTime, Needle, SpeedOne, HourglassFull as IconHourglassFull } from '@icon-park/vue-next'
import { ref, onMounted, computed } from 'vue'
import selectInjectionActions from '@/components/InjectionActions'
import { recordCheckUserLastInjetcioService, recordAddInjectionService } from '@/api/record'
import { showToast, showSuccessToast } from '@/components/vantComponents'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()

// 表单数据
// 胰岛素类型
const insulinType = ref({ text: '', otherText: '' })
// 胰岛素注射方式
const injetcionType = ref({ text: '' })
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
const showSelectinjetcionType = ref(false)
const showBolus = computed(() => {
  if (injetcionType.value.value === 1 || injetcionType.value.value === 3) {
    return true
  } else {
    return false
  }
})
const showSquareWave = computed(() => {
  if (injetcionType.value.value === 2 || injetcionType.value.value === 3) {
    return true
  } else {
    return false
  }
})
const showtips = computed(() => {
  if (injetcionType.value.value === 3) {
    return true
  } else {
    return false
  }
})

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
const selectinjetcionTypeActions = [
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
  showSelectinjetcionType.value = false
  injetcionType.value.text = selectedOptions[0].text
  injetcionType.value.value = selectedOptions[0].value
}

const formatedDateTimeToSubmit = computed(() => {
  return `${currentDate.value[0]}-${currentDate.value[1]}-${currentDate.value[2]} ${currentTime.value[0]}-${currentTime.value[1]}-${currentTime.value[2]}`
})

// 后续改成按用户设定获取
// 默认选择上次胰岛素类型、胰岛素注射方式
// 胰岛素类没有上次就空着
// 胰岛素注射方式没有上次就默认大剂量
const initInjectionType = async () => {
  const res = await recordCheckUserLastInjetcioService(userStore.user.id)
  console.log(res.data.data)
  injetcionType.value.text = res.data.data.lastInjectionType || '大剂量'
  if (injetcionType.value.text === '大剂量') {
    injetcionType.value.value = 1
  } else if (injetcionType.value.text === '方波') {
    injetcionType.value.value = 2
  } else if (injetcionType.value.text === '双波') {
    injetcionType.value.value = 3
  }
  insulinType.value.text = res.data.data.lastInsulinType || ''
}

// 校验表单
const validateToSubmit = () => {
  if (injetcionType.value.text === '大剂量') {
    squareWaveRate.value = null
    squareWaveTime.value = null
    if (bolus.value > 0) {
      return true
    } else {
      return false
    }
  } else if (injetcionType.value.text === '方波') {
    bolus.value = null
    if (squareWaveRate.value > 0 && squareWaveTime.value > 0) {
      return true
    } else {
      return false
    }
  } else if (injetcionType.value.text === '双波') {
    if (squareWaveRate.value > 0 && squareWaveTime.value > 0 && bolus.value > 0) {
      return true
    } else {
      return false
    }
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
    injetcionType: injetcionType.value.text,
    insulinType: insulinType.value.text,
    bolus: bolus.value,
    recordTime: formatedDateTimeToSubmit.value,
    remark: remark.value,
    squareWaveRate: squareWaveRate.value,
    squareWaveTime: squareWaveTime.value
  }
  await recordAddInjectionService(toAddObj)
}

// 重置数据
const resetForm = () => {
  formatDateTime()
  bolus.value = null
  squareWaveRate.value = null
  squareWaveTime.value = null
  remark.value = ''
  injetcionType.value.text = ''
  insulinType.value.text = ''
}

onMounted(() => {
  initInjectionType()
  formatDateTime()
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
        <van-cell is-link @click="showSelectInjectionType = true" center :value="insulinType.text">
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
        <van-cell is-link @click="showSelectinjetcionType = true" center :value="injetcionType.text">
          <template #icon><fork theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #title>
            <div class="title-in-cell">注射方式</div>
          </template>
        </van-cell>
        <van-popup v-model:show="showSelectinjetcionType" round position="bottom">
          <van-picker :columns="selectinjetcionTypeActions" @cancel="showSelectinjetcionType = false" @confirm="onConfirmWay" />
        </van-popup>
      </van-cell-group>
    </div>
    <div class="cell-group" v-if="showBolus">
      <van-cell-group inset>
        <van-field v-model="bolus" type="number" label="大剂量" input-align="right">
          <template #left-icon><needle theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #right-icon> U </template>
        </van-field>
      </van-cell-group>
    </div>
    <div class="cell-group" v-if="showSquareWave">
      <van-cell-group inset>
        <van-field v-model="squareWaveRate" type="number" label="方波速率" input-align="right">
          <template #left-icon><speed-one theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #right-icon> U/H </template>
        </van-field>
      </van-cell-group>
    </div>
    <div class="cell-group" v-if="showSquareWave">
      <van-cell-group inset>
        <van-field v-model="squareWaveTime" type="number" label="方波持续时间" input-align="right">
          <template #left-icon><icon-hourglass-full theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #right-icon> 分钟 </template>
        </van-field>
      </van-cell-group>
    </div>
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
      <van-field v-model="remark" rows="2" autosize label="备注" type="textarea" maxlength="100" placeholder="说点什么吧，不说也行……" show-word-limit>
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
  <div class="btn-submit"><van-button type="primary" block round plain @click="onSubmit()">提交</van-button></div>
  <div class="btn-submit"><van-button type="success" block round plain @click="onSubmitAndRecordNext()">提交并记录下一条</van-button></div>
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
