<script setup>
import { ref, onMounted, computed } from 'vue'
import { Time as IconTime, SunOne, ChopsticksFork, AppleOne, PictureOne, Chicken, Avocado, MeasuringCup } from '@icon-park/vue-next'
import { useUserStore } from '@/stores'
import { showToast, showSuccessToast, showFailToast } from '@/components/vantComponents'
import { recordUpdateDietService } from '@/api/record'
const props = defineProps({
  typeDetail: {
    type: Object,
    default: () => ({})
  }
})
const userStore = useUserStore()

// 显示控制
const showSelectDietType = ref(false)

// 饮食时间相关
const dietType = ref({ text: '', value: '' })
const selectDietActions = [
  { text: '早餐', value: 'breakfast' },
  { text: '午餐', value: 'lunch' },
  { text: '晚餐', value: 'dinner' },
  { text: '加餐', value: 'snack' }
]
const onConfirm = ({ selectedOptions }) => {
  showSelectDietType.value = false
  dietType.value.text = selectedOptions[0].text
  dietType.value.value = selectedOptions[0].value
}

const formatedDateTimeToSubmit = computed(() => {
  return `${currentDate.value[0]}-${currentDate.value[1]}-${currentDate.value[2]} ${currentTime.value[0]}:${currentTime.value[1]}:${currentTime.value[2]}`
})
// 食物描述相关
const food = ref({ foodDetail: '', foodPic: [{ content: '', file: File }], totalCarb: null, totalFat: null, totalProtein: null, totalEnergy: null })
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

// 校验表单
// 没必要，但我觉得还是留着吧
const validateToSubmit = () => {
  if (dietType.value.text !== '') {
    return true
  } else {
    return false
  }
}

const initDiet = () => {
  food.value.foodDetail = props.typeDetail.foodDetail
  food.value.foodPic[0] = { content: props.typeDetail.foodPic, file: File }

  // 饮食类型赋值
  dietType.value.value = props.typeDetail.mealType
  for (const action of selectDietActions) {
    if (action.value === dietType.value.value) {
      dietType.value.text = action.text
      break
    }
  }

  food.value.totalCarb = props.typeDetail.totalCarb
  food.value.totalProtein = props.typeDetail.totalProtein
  food.value.totalFat = props.typeDetail.totalFat
  food.value.totalEnergy = props.typeDetail.totalEnergy
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

// 判断是否能修改饮食类型
const validateChangeDietType = () => {
  if (isCheck.value === true) {
    return
  } else {
    showSelectDietType.value = true
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
      foodDetail: food.value.foodDetail,
      mealType: dietType.value.value,
      totalCarb: food.value.totalCarb,
      totalProtein: food.value.totalProtein,
      totalFat: food.value.totalFat,
      totalEnergy: food.value.totalEnergy,
      recordTime: formatedDateTimeToSubmit.value,
      remark: remark.value
    }
    if (food.value.foodPic[0]) {
      toSubmitObj.foodPic = food.value.foodPic[0].content
    } else {
      toSubmitObj.foodPic = ''
    }
    try {
      await recordUpdateDietService(toSubmitObj)
      showSuccessToast('修改成功')
    } catch (error) {
      showFailToast(error || '未知错误')
    }
  } else {
    showToast('请输入正确信息')
  }
}

onMounted(() => {
  initDiet()
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
        <van-cell :is-link="!isCheck" @click="validateChangeDietType()" center :value="dietType.text">
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
        <van-field v-model="food.foodDetail" type="textarea" label="食物描述" autosize rows="1" :readonly="isCheck">
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
            <van-uploader v-model="food.foodPic" :max-count="1" preview-size="40" :max-size="1920 * 1080" :readonly="!isCheck" />
          </template>
        </van-field>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-image width="100%" height="100%" fit="contain" position="center" :src="food.foodPic[0].content || ''" />
      </van-cell-group>
    </div>

    <div class="cell-group">
      <van-cell-group inset>
        <van-field v-model="food.totalCarb" type="number" label="总碳水" input-align="right" :readonly="isCheck">
          <template #left-icon><apple-one theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #right-icon> 克 </template>
        </van-field>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-field v-model="food.totalProtein" type="number" label="总蛋白" input-align="right" :readonly="isCheck">
          <template #left-icon><chicken theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #right-icon> 克 </template>
        </van-field>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-field v-model="food.totalFat" type="number" label="总脂肪" input-align="right" :readonly="isCheck">
          <template #left-icon><avocado theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #right-icon> 克 </template>
        </van-field>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-field v-model="food.totalEnergy" type="number" label="总热量" input-align="right" :readonly="isCheck">
          <template #left-icon><measuring-cup theme="outline" size="20" fill="#1989fa" strokeLinecap="square" /></template>
          <template #right-icon> kJ </template>
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
