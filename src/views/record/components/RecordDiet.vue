<script setup>
import { ref, onMounted, computed } from 'vue'
import { Time as IconTime, SunOne, ChopsticksFork, AppleOne, PictureOne, Chicken, Avocado, MeasuringCup } from '@icon-park/vue-next'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { showToast, showSuccessToast } from '@/components/vantComponents'
import { recordAddDietService } from '@/api/record'
import { useCarbCalFoodListStore } from '@/stores'
const carbCalFoodListStore = useCarbCalFoodListStore()
const props = defineProps({
  isFromCarbCal: {
    type: Boolean,
    default: () => false
  }
})
const router = useRouter()
const userStore = useUserStore()
// 显示控制
const showSelectDietType = ref(false)

// 饮食时间相关
const dietType = ref({ text: '' })
const selectDietActions = [
  { text: '早餐', value: 1, enText: 'breakfast' },
  { text: '午餐', value: 2, enText: 'lunch' },
  { text: '晚餐', value: 3, enText: 'dinner' },
  { text: '加餐', value: 4, enText: 'snack' }
]
const onConfirm = ({ selectedOptions }) => {
  showSelectDietType.value = false
  dietType.value.text = selectedOptions[0].text
  dietType.value.value = selectedOptions[0].value
}

// 根据设备时间自动选择餐点
const initDietTime = () => {
  const hour = parseInt(currentTime.value[0])
  const min = parseInt(currentTime.value[1])

  if (hour >= 5 && hour < 10) {
    // 早餐时间
    dietType.value.text = selectDietActions[0].text
    dietType.value.value = selectDietActions[0].value
  } else if (hour >= 11 && hour < 14) {
    // 午餐时间
    dietType.value.text = selectDietActions[1].text
    dietType.value.value = selectDietActions[1].value
  } else if (hour >= 17 && (hour < 20 || (hour === 20 && min <= 30))) {
    // 晚餐时间
    dietType.value.text = selectDietActions[2].text
    dietType.value.value = selectDietActions[2].value
  } else {
    // 其他时间，视为加餐
    dietType.value.text = selectDietActions[3].text
    dietType.value.value = selectDietActions[3].value
  }
}

const formatedDateTimeToSubmit = computed(() => {
  return `${currentDate.value[0]}-${currentDate.value[1]}-${currentDate.value[2]} ${currentTime.value[0]}:${currentTime.value[1]}:${currentTime.value[2]}`
})
// 食物描述相关
const food = ref({ foodDetail: '', foodPic: [], totalCarb: null, totalFat: null, totalProtein: null, totalEnergy: null })
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

// 校验表单
// 没必要，但我觉得还是留着吧
const validateToSubmit = () => {
  if (dietType.value.text !== '') {
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
    foodDetail: food.value.foodDetail,
    mealType: dietType.value.enText,
    totalCarb: food.value.totalCarb,
    totalProtein: food.value.totalProtein,
    totalFat: food.value.totalFat,
    totalEnergy: food.value.totalEnergy,
    recordTime: formatedDateTimeToSubmit.value,
    remark: remark.value
  }
  if (food.value.foodPic[0]) {
    toAddObj.foodPic = food.value.foodPic[0].content
  } else {
    toAddObj.foodPic = ''
  }
  await recordAddDietService(toAddObj)
}

// 重置数据
const resetForm = () => {
  formatDateTime()
  remark.value = ''
  food.value = { foodDetail: '', foodPic: [], totalCarb: null, totalFat: null, totalProtein: null, totalEnergy: null }

  // 清除碳水快算的list
  if (props.isFromCarbCal) {
    carbCalFoodListStore.resetFoodList()
  }
}

const initCarbCalData = () => {
  const foodDetail = ref('')
  carbCalFoodListStore.foodList.forEach((element, index) => {
    const acc =
      (index + 1).toString() + ': ' + element.foodName + '[' + element.foodCarbPer100 + '克/100克] ' + ' 吃了' + element.foodWeight + '克。\n'
    foodDetail.value = foodDetail.value + acc
  })
  food.value.foodDetail = foodDetail.value
  food.value.totalCarb = parseFloat(carbCalFoodListStore.totalCarb)
  remark.value = '来自碳水快算'
}

onMounted(() => {
  formatDateTime()
  initDietTime()
  if (props.isFromCarbCal) {
    initCarbCalData()
  }
})
</script>
<template>
  <div class="components-container">
    <van-row justify="space-between" class="group-head">
      <van-col span="24">
        <h2>记录饮食</h2>
      </van-col>
    </van-row>
    <div class="cell-group">
      <van-cell-group inset>
        <van-cell is-link @click="showSelectDietType = true" center :value="dietType.text">
          <template #icon><sun-one theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #title>
            <div class="title-in-cell">饮食类型</div>
          </template>
        </van-cell>
        <van-popup v-model:show="showSelectDietType" round position="bottom">
          <van-picker :columns="selectDietActions" @cancel="showSelectDietType = false" @confirm="onConfirm" />
        </van-popup>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-field v-model="food.foodDetail" type="textarea" label="食物描述" autosize rows="1">
          <template #left-icon><chopsticks-fork theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
        </van-field>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-field name="uploader" input-align="right" label="上传图片">
          <template #left-icon>
            <picture-one theme="outline" size="20" fill="#1989fa" strokeLinecap="square" />
          </template>
          <template #input>
            <van-uploader v-model="food.foodPic" :max-count="1" preview-size="40" :max-size="1920 * 1080" />
          </template>
        </van-field>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-field v-model="food.totalCarb" type="number" label="总碳水" input-align="right">
          <template #left-icon><apple-one theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #right-icon> 克 </template>
        </van-field>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-field v-model="food.totalProtein" type="number" label="总蛋白" input-align="right">
          <template #left-icon><chicken theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #right-icon> 克 </template>
        </van-field>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-field v-model="food.totalFat" type="number" label="总脂肪" input-align="right">
          <template #left-icon><avocado theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #right-icon> 克 </template>
        </van-field>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-field v-model="food.totalEnergy" type="number" label="总热量" input-align="right">
          <template #left-icon><measuring-cup theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #right-icon> kJ </template>
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
