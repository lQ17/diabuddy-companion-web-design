<script setup>
import selectInjectionActions from '@/components/InjectionActions'
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores'
import { showSuccessToast, showFailToast } from '@/components/vantComponents'
import { planUserMedicalInfo, planUserUpdateMedicalInfo } from '@/api/plan'
const userStore = useUserStore()
const onClickLeft = () => history.back()

const onClickRight = () => {
  if (isCheckMode.value) {
    // 编辑
    onEdit()
  } else {
    // 保存
    onSave()
  }
}

const userIdFromApi = ref()

const onEdit = () => {
  if (userIdFromApi.value === userStore.user.id) {
    isCheckMode.value = false
    isShowAgentBox.value = true
  } else {
    showFailToast('非本人数据，不能修改')
  }
}

const onSave = async () => {
  const data = {
    userId: userStore.user.id,
    tdd: userTDD.value,
    icr: userICR.value,
    isf: userISF.value,
    dayEatingEnergy: userTotalEnergy.value,
    dayEatingCarb: userTotalCarb.value,
    dayEatingFat: userTotalFat.value,
    dayEatingProtein: userTotalProtein.value,
    treatmentOption: userTreatmentPlan.value.enText,
    remark: remark.value,
    insulinPump: {
      insulinType: userInsulinTypeAboutPump.value.text,
      breakfastBolus: breakfastBolus.value,
      breakfastSquareWaveRate: breakfastSquareWaveRate.value,
      breakfastSquareWaveTime: breakfastSquareWaveTime.value,
      lunchBolus: lunchBolus.value,
      lunchSquareWaveRate: lunchSquareWaveRate.value,
      lunchSquareWaveTime: lunchSquareWaveTime.value,
      dinnerBolus: dinnerBolus.value,
      dinnerSquareWaveRate: dinnerSquareWaveRate.value,
      dinnerSquareWaveTime: dinnerSquareWaveTime.value
    },
    preMealAndBasal: {
      basalInsulinType: userInsulinTypeAboutBasal.value.text,
      preMealInsulinType: userInsulinTypeAboutPreMeal.value.text,
      basalInsulinDose: basalBolus.value,
      breakfastInsulinDose: breakfastBolus.value,
      lunchInsulinDose: lunchBolus.value,
      dinnerInsulinDose: dinnerBolus.value
    },
    premixed: {
      premixedInsulinType: userInsulinTypeAboutPremixed.value.text,
      breakfastPremixedDose: breakfastBolus.value,
      lunchPremixedDose: lunchBolus.value,
      dinnerPremixedDose: dinnerBolus.value
    }
  }

  if (userAgentName.value || userAgentDosage.value) {
    data.agent = {
      agentName: userAgentName.value,
      agentDosage: userAgentDosage.value
    }
  }

  await planUserUpdateMedicalInfo(data)
  isCheckMode.value = true
  showSuccessToast('已保存')
}

const isCheckMode = ref(true)
const userTDD = ref()
const userICR = ref()
const userISF = ref()
const userTotalEnergy = ref()
const userTotalCarb = ref()
const userTotalProtein = ref()
const userTotalFat = ref()
const userTreatmentPlan = ref({ text: '' })
// 四种方案的胰岛素
const userInsulinTypeAboutPump = ref({ text: '' })
const userInsulinTypeAboutPreMeal = ref({ text: '' })
const userInsulinTypeAboutBasal = ref({ text: '' })
const userInsulinTypeAboutPremixed = ref({ text: '' })

// 四种方案的其他胰岛素
const userOtherInsulinTypeAboutPump = ref('')
// const userOtherInsulinTypeAboutPreMeal = ref('')
// const userOtherInsulinTypeAboutBasal = ref('')
// const userOtherInsulinTypeAboutPremixed = ref('')

// 药名、剂量
const userAgentName = ref()
const userAgentDosage = ref()

// 备注
const remark = ref('')

// 三餐注射方式
const breakfastInjectionWay = ref({ text: '' })
const lunchInjectionWay = ref({ text: '' })
const dinnerInjectionWay = ref({ text: '' })

// 大剂量单位
const breakfastBolus = ref()
const lunchBolus = ref()
const dinnerBolus = ref()
const basalBolus = ref()
// 方波持续时间
const breakfastSquareWaveTime = ref()
const lunchSquareWaveTime = ref()
const dinnerSquareWaveTime = ref()
// 方波速率
const breakfastSquareWaveRate = ref()
const lunchSquareWaveRate = ref()
const dinnerSquareWaveRate = ref()
// 基础率总胰岛素量，从后端计算返回
const userTotalBasalInsulin = ref(0)
// 胰岛素泵三餐注射方式控件和胰岛素类型控件
const showOtherInsulinInput = ref(false)
const showBreakfastSelectInjectionWay = ref(false)
const showLunchSelectInjectionWay = ref(false)
const showDinnerSelectInjectionWay = ref(false)
const selectInjectionWayActions = [
  { text: '大剂量', value: 1 },
  { text: '方波', value: 2 },
  { text: '双波', value: 3 }
]
const onConfirmBreakfastInjectionWay = (selectedOptions) => {
  showBreakfastSelectInjectionWay.value = false
  breakfastInjectionWay.value.text = selectedOptions.selectedOptions[0].text
  breakfastInjectionWay.value.value = selectedOptions.selectedOptions[0].value
  // if (selectedOptions.selectedOptions[0].text == '大剂量') {
  //   breakfastSquareWaveRate.value = null
  //   breakfastSquareWaveTime.value = null
  // } else if (selectedOptions.selectedOptions[0].text == '方波') {
  //   breakfastBolus.value = null
  // }
  breakfastBolus.value = null
  breakfastSquareWaveRate.value = null
  breakfastSquareWaveTime.value = null
}
const onConfirmLunchInjectionWay = (selectedOptions) => {
  showLunchSelectInjectionWay.value = false
  lunchInjectionWay.value.text = selectedOptions.selectedOptions[0].text
  lunchInjectionWay.value.value = selectedOptions.selectedOptions[0].value
  // if (selectedOptions.selectedOptions[0].text == '大剂量') {
  //   lunchSquareWaveRate.value = null
  //   lunchSquareWaveTime.value = null
  // } else if (selectedOptions.selectedOptions[0].text == '方波') {
  //   lunchBolus.value = null
  // }
  lunchSquareWaveRate.value = null
  lunchSquareWaveTime.value = null
  lunchBolus.value = null
}
const onConfirmDinnerInjectionWay = (selectedOptions) => {
  showDinnerSelectInjectionWay.value = false
  dinnerInjectionWay.value.text = selectedOptions.selectedOptions[0].text
  dinnerInjectionWay.value.value = selectedOptions.selectedOptions[0].value
  // if (selectedOptions.selectedOptions[0].text == '大剂量') {
  //   dinnerSquareWaveRate.value = null
  //   dinnerSquareWaveTime.value = null
  // } else if (selectedOptions.selectedOptions[0].text == '方波') {
  //   dinnerBolus.value = null
  // }
  dinnerBolus.value = null
  dinnerSquareWaveRate.value = null
  dinnerSquareWaveTime.value = null
}
// 胰岛素泵 所有输入框显示控件
const showPumpInputs = computed(() => {
  if (userTreatmentPlan.value.value === 1) {
    return true
  } else {
    return false
  }
})
// 餐前+基础 所有输入框显示控件
const showPreMealAndBasal = computed(() => {
  if (userTreatmentPlan.value.value === 2) {
    return true
  } else {
    return false
  }
})
// 预混 所有输入框显示控件
const showPremixed = computed(() => {
  if (userTreatmentPlan.value.value === 3) {
    return true
  } else {
    return false
  }
})
// 药物 所有输入框显示控件
const isShowAgentBox = ref(false)
const showAgent = computed(() => {
  if (userTreatmentPlan.value.value < 5 && isShowAgentBox.value) {
    return true
  } else {
    return false
  }
})
// 无胰岛素警告 显示控件
const showNoInsulinWarning = computed(() => {
  if (userTreatmentPlan.value.value > 3) {
    return true
  } else {
    return false
  }
})
// 备注 显示控件
const showRemark = computed(() => {
  if (userTreatmentPlan.value.text === '') {
    return false
  } else {
    return true
  }
})
// 胰岛素泵三餐注射方式-所有输入框显示控件
const showBreakfastInput = computed(() => {
  if (breakfastInjectionWay.value.text === '') {
    return false
  } else {
    return true
  }
})
const showLunchInput = computed(() => {
  if (lunchInjectionWay.value.text === '') {
    return false
  } else {
    return true
  }
})
const showDinnerInput = computed(() => {
  if (dinnerInjectionWay.value.text === '') {
    return false
  } else {
    return true
  }
})
// 早餐输入框显示控件（选择大剂量，只显示大剂量输入框……）
const showBreakfastBolusInput = computed(() => {
  if (breakfastInjectionWay.value.value === 1 || breakfastInjectionWay.value.value === 3) {
    return true
  } else {
    return false
  }
})
const showBreakfastSquareWaveInput = computed(() => {
  if (breakfastInjectionWay.value.value === 2 || breakfastInjectionWay.value.value === 3) {
    return true
  } else {
    return false
  }
})
// 午餐输入框显示控件（选择大剂量，只显示大剂量输入框……）
const showLunchBolusInput = computed(() => {
  if (lunchInjectionWay.value.value === 1 || lunchInjectionWay.value.value === 3) {
    return true
  } else {
    return false
  }
})
const showLunchSquareWaveInput = computed(() => {
  if (lunchInjectionWay.value.value === 2 || lunchInjectionWay.value.value === 3) {
    return true
  } else {
    return false
  }
})
// 晚餐输入框显示控件（选择大剂量，只显示大剂量输入框……）
const showDinnerBolusInput = computed(() => {
  if (dinnerInjectionWay.value.value === 1 || dinnerInjectionWay.value.value === 3) {
    return true
  } else {
    return false
  }
})
const showDinnerSquareWaveInput = computed(() => {
  if (dinnerInjectionWay.value.value === 2 || dinnerInjectionWay.value.value === 3) {
    return true
  } else {
    return false
  }
})
// 效果控件
const showSelectInjectionTypeAboutPump = ref(false)
const showSelectInjectionTypeAboutPreMeal = ref(false)
const showSelectInjectionTypeAboutBasal = ref(false)
const showSelectInjectionTypeAboutPremixed = ref(false)

// 选择胰岛素泵胰岛素类型的方法
const onConfirmInsulinTypeAboutPump = ({ selectedOptions }) => {
  showSelectInjectionTypeAboutPump.value = false
  userInsulinTypeAboutPump.value.text = selectedOptions[0].text
  userInsulinTypeAboutPump.value.value = selectedOptions[0].value
  if (userInsulinTypeAboutPump.value.text === '其他(可自己输入)') {
    showOtherInsulinInput.value = true
  } else {
    showOtherInsulinInput.value = false
    userOtherInsulinTypeAboutPump.value = ''
  }
}
// 选择餐前胰岛素类型的方法
const onConfirmInsulinTypeAboutPreMeal = ({ selectedOptions }) => {
  showSelectInjectionTypeAboutPreMeal.value = false
  userInsulinTypeAboutPreMeal.value.text = selectedOptions[0].text
  userInsulinTypeAboutPreMeal.value.value = selectedOptions[0].value
}
// 选择基础胰岛素类型的方法
const onConfirmInsulinTypeAboutBasal = ({ selectedOptions }) => {
  showSelectInjectionTypeAboutBasal.value = false
  userInsulinTypeAboutBasal.value.text = selectedOptions[0].text
  userInsulinTypeAboutBasal.value.value = selectedOptions[0].value
}
// 选择预混胰岛素类型的方法
const onConfirmInsulinTypeAboutPremixed = ({ selectedOptions }) => {
  showSelectInjectionTypeAboutPremixed.value = false
  userInsulinTypeAboutPremixed.value.text = selectedOptions[0].text
  userInsulinTypeAboutPremixed.value.value = selectedOptions[0].value
}

const showSelectTreatmentPlan = ref(false)
const selectTreatmentPlanActions = [
  { text: '胰岛素泵', enText: 'plan_insulin_pump', value: 1 },
  { text: '餐前＋基础', enText: 'plan_pre_meal_and_basal', value: 2 },
  { text: '预混', enText: 'plan_premixed', value: 3 },
  { text: '降糖药物治疗', enText: 'plan_agent', value: 4 },
  { text: '饮食运动', enText: 'plan_diet_and_exercise', value: 5 }
]
const onConfirm = ({ selectedOptions }) => {
  showSelectTreatmentPlan.value = false
  userTreatmentPlan.value.text = selectedOptions[0].text
  userTreatmentPlan.value.enText = selectedOptions[0].enText
  userTreatmentPlan.value.value = selectedOptions[0].value
}

// 初始化参数
const initUserMedicalData = async () => {
  const res = await planUserMedicalInfo(userStore.user.id)
  const totalInfo = res.data.data
  userIdFromApi.value = totalInfo.id
  initPageData(totalInfo)
}

const initPageData = (totalInfo) => {
  if (totalInfo) {
    validateIninitPageData(totalInfo, 'tdd', userTDD)
    validateIninitPageData(totalInfo, 'icr', userICR)
    validateIninitPageData(totalInfo, 'isf', userISF)
    validateIninitPageData(totalInfo, 'dayEatingEnergy', userTotalEnergy)
    validateIninitPageData(totalInfo, 'dayEatingCarb', userTotalCarb)
    validateIninitPageData(totalInfo, 'dayEatingProtein', userTotalProtein)
    validateIninitPageData(totalInfo, 'dayEatingFat', userTotalFat)
    validateIninitPageData(totalInfo, 'treatmentOption', userTreatmentPlan)
    validateIninitPageData(totalInfo, 'remark', remark)

    // 胰岛素泵
    if (totalInfo.treatmentOption === 'plan_insulin_pump') {
      userInsulinTypeAboutPump.value.text = totalInfo.insulinPump.insulinType
      userTotalBasalInsulin.value = totalInfo.insulinPump.totalInsulinPumpBasal
      breakfastBolus.value = totalInfo.insulinPump.breakfastBolus
      breakfastSquareWaveRate.value = totalInfo.insulinPump.breakfastSquareWaveRate
      breakfastSquareWaveTime.value = totalInfo.insulinPump.breakfastSquareWaveTime
      breakfastInjectionWay.value.text = checkInjectionWay(breakfastBolus.value, breakfastSquareWaveRate.value, breakfastSquareWaveTime.value)
      setmealInjectionWayValue(breakfastInjectionWay)
      lunchBolus.value = totalInfo.insulinPump.lunchBolus
      lunchSquareWaveRate.value = totalInfo.insulinPump.lunchSquareWaveRate
      lunchSquareWaveTime.value = totalInfo.insulinPump.lunchSquareWaveTime
      lunchInjectionWay.value.text = checkInjectionWay(lunchBolus.value, lunchSquareWaveRate.value, lunchSquareWaveTime.value)
      setmealInjectionWayValue(lunchInjectionWay)
      dinnerBolus.value = totalInfo.insulinPump.dinnerBolus
      dinnerSquareWaveRate.value = totalInfo.insulinPump.dinnerSquareWaveRate
      dinnerSquareWaveTime.value = totalInfo.insulinPump.dinnerSquareWaveTime
      dinnerInjectionWay.value.text = checkInjectionWay(dinnerBolus.value, dinnerSquareWaveRate.value, dinnerSquareWaveTime.value)
      setmealInjectionWayValue(dinnerInjectionWay)
    }

    // 餐前+长效
    if (totalInfo.treatmentOption === 'plan_pre_meal_and_basal') {
      userInsulinTypeAboutPreMeal.value.text = totalInfo.preMealAndBasal.preMealInsulinType
      userInsulinTypeAboutBasal.value.text = totalInfo.preMealAndBasal.basalInsulinType
      basalBolus.value = totalInfo.preMealAndBasal.basalInsulinDose
      breakfastBolus.value = totalInfo.preMealAndBasal.breakfastInsulinDose
      lunchBolus.value = totalInfo.preMealAndBasal.lunchInsulinDose
      dinnerBolus.value = totalInfo.preMealAndBasal.dinnerInsulinDose
    }

    // 预混
    if (totalInfo.treatmentOption === 'plan_premixed') {
      userInsulinTypeAboutPremixed.value.text = totalInfo.premixed.premixedInsulinType
      breakfastBolus.value = totalInfo.premixed.breakfastPremixedDose
      lunchBolus.value = totalInfo.premixed.lunchPremixedDose
      dinnerBolus.value = totalInfo.premixed.dinnerPremixedDose
    }

    // 用药 , 没有的话，不显示框，‘编辑时显示’
    if (totalInfo.agent) {
      userAgentName.value = totalInfo.agent.agentName
      userAgentDosage.value = totalInfo.agent.agentDosage
      isShowAgentBox.value = true
    }
  } else {
    // 该用户没有信息
    isCheckMode.value = false
  }
}

const validateIninitPageData = (totalInfo, key, userValue) => {
  if (key in totalInfo && totalInfo[key] !== '' && totalInfo[key] !== undefined && totalInfo[key] !== null) {
    if (key === 'treatmentOption') {
      const selectedOption = selectTreatmentPlanActions.find((option) => option.enText === totalInfo[key])
      if (selectedOption) {
        userValue.value.text = selectedOption.text
        userValue.value.enText = selectedOption.enText
        userValue.value.value = selectedOption.value
      }
    } else {
      userValue.value = totalInfo[key]
    }
  }
}

// 返回注射方式
const checkInjectionWay = (bolus, rate, time) => {
  if (bolus && !rate && !time) {
    return '大剂量'
  } else if (bolus && rate && time) {
    return '双波'
  } else if (!bolus && rate && time) {
    return '方波'
  }
}

const setmealInjectionWayValue = (keyValue) => {
  if (keyValue.value.text === '大剂量') {
    keyValue.value.value = 1
  }
  if (keyValue.value.text === '方波') {
    keyValue.value.value = 2
  }
  if (keyValue.value.text === '双波') {
    keyValue.value.value = 3
  }
}

onMounted(() => {
  initUserMedicalData()
})
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="控糖方案" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight" fixed placeholder>
      <template #right>
        <div class="set-color" v-if="isCheckMode">编辑</div>
        <div class="set-color" v-else>保存</div>
      </template>
    </van-nav-bar>
    <div class="warning-box">
      <div class="warning-font-box">个性化的控糖参数可以帮助我们更科学地控制血糖。 未计算过控糖参数的糖友请先计算控糖参数。</div>
    </div>
    <van-row justify="space-between" class="group-head">
      <van-col span="24">
        <h2>控糖参数</h2>
      </van-col>
    </van-row>
    <div id="sugar-control-parameters">
      <div class="cell-group">
        <van-cell-group inset>
          <van-field v-model="userTDD" type="number" label="TDD" input-align="right" :readonly="isCheckMode">
            <template #right-icon> U</template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="cell-group">
        <van-cell-group inset>
          <van-field v-model="userICR" type="number" label="ICR" input-align="right" :readonly="isCheckMode">
            <template #right-icon> 克/U</template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="cell-group">
        <van-cell-group inset>
          <van-field v-model="userISF" type="number" label="ISF" input-align="right" :readonly="isCheckMode">
            <template #right-icon> mmol/U</template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="cell-group">
        <van-cell-group inset>
          <van-field v-model="userTotalEnergy" type="number" label="总摄入能量" input-align="right" :readonly="isCheckMode">
            <template #right-icon> kJ</template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="cell-group">
        <van-cell-group inset>
          <van-field v-model="userTotalCarb" type="number" label="总摄入碳水" input-align="right" :readonly="isCheckMode">
            <template #right-icon> 克</template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="cell-group">
        <van-cell-group inset>
          <van-field v-model="userTotalProtein" type="number" label="总摄入蛋白质" input-align="right" :readonly="isCheckMode">
            <template #right-icon> 克</template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="cell-group">
        <van-cell-group inset>
          <van-field v-model="userTotalFat" type="number" label="总摄入脂肪" input-align="right" :readonly="isCheckMode">
            <template #right-icon> 克</template>
          </van-field>
        </van-cell-group>
      </div>
    </div>
    <van-row justify="space-between" class="group-head">
      <van-col span="24">
        <h2>治疗方案</h2>
      </van-col>
    </van-row>
    <div class="treatment-plan">
      <div class="cell-group">
        <van-cell-group inset>
          <van-cell
            :is-link="!isCheckMode"
            @click="!isCheckMode ? (showSelectTreatmentPlan = true) : (showSelectTreatmentPlan = false)"
            center
            :value="userTreatmentPlan.text"
          >
            <template #title>
              <div class="title-in-cell">胰岛素方案</div>
            </template>
          </van-cell>
          <van-popup v-model:show="showSelectTreatmentPlan" round position="bottom">
            <van-picker :columns="selectTreatmentPlanActions" @cancel="showSelectTreatmentPlan = false" @confirm="onConfirm" />
          </van-popup>
        </van-cell-group>
      </div>
      <!-- 胰岛素泵的所有输入框 -->
      <div class="plan-about-pump" v-if="showPumpInputs">
        <div class="cell-group">
          <van-cell-group inset>
            <van-cell
              :is-link="!isCheckMode"
              @click="!isCheckMode ? (showSelectInjectionTypeAboutPump = true) : (showSelectInjectionTypeAboutPump = false)"
              center
              :value="userInsulinTypeAboutPump.text"
            >
              <template #title>
                <div class="title-in-cell">胰岛素类型</div>
              </template>
            </van-cell>
            <van-popup v-model:show="showSelectInjectionTypeAboutPump" round position="bottom">
              <van-picker
                :columns="selectInjectionActions"
                @cancel="showSelectInjectionTypeAboutPump = false"
                @confirm="onConfirmInsulinTypeAboutPump"
              />
            </van-popup>
            <van-field
              v-model="userOtherInsulinTypeAboutPump"
              v-if="showOtherInsulinInput"
              input-align="right"
              placeholder="请输入您的胰岛素类型"
            ></van-field>
          </van-cell-group>
        </div>
        <div class="cell-group">
          <van-cell-group inset>
            <van-cell title="基础率" is-link :to="`/set-pump-basal-rate?checkId=${userIdFromApi}`">
              <template #value> {{ userTotalBasalInsulin }} U </template>
            </van-cell>
          </van-cell-group>
        </div>
        <!-- 早餐注射方式 -->
        <div class="cell-group">
          <van-cell-group inset>
            <van-cell
              :is-link="!isCheckMode"
              @click="!isCheckMode ? (showBreakfastSelectInjectionWay = true) : (showBreakfastSelectInjectionWay = false)"
              center
              :value="breakfastInjectionWay.text"
            >
              <template #title>
                <div class="title-in-cell">早餐注射方式</div>
              </template>
            </van-cell>
            <van-popup v-model:show="showBreakfastSelectInjectionWay" round position="bottom">
              <van-picker
                :columns="selectInjectionWayActions"
                @cancel="showBreakfastSelectInjectionWay = false"
                @confirm="onConfirmBreakfastInjectionWay"
              />
            </van-popup>
          </van-cell-group>
        </div>
        <!-- 午餐注射方式 -->
        <div class="cell-group">
          <van-cell-group inset>
            <van-cell
              :is-link="!isCheckMode"
              @click="!isCheckMode ? (showLunchSelectInjectionWay = true) : (showLunchSelectInjectionWay = false)"
              center
              :value="lunchInjectionWay.text"
            >
              <template #title>
                <div class="title-in-cell">午餐注射方式</div>
              </template>
            </van-cell>
            <van-popup v-model:show="showLunchSelectInjectionWay" round position="bottom">
              <van-picker :columns="selectInjectionWayActions" @cancel="showLunchSelectInjectionWay = false" @confirm="onConfirmLunchInjectionWay" />
            </van-popup>
          </van-cell-group>
        </div>
        <!-- 晚餐注射方式 -->
        <div class="cell-group">
          <van-cell-group inset>
            <van-cell
              :is-link="!isCheckMode"
              @click="!isCheckMode ? (showDinnerSelectInjectionWay = true) : (showDinnerSelectInjectionWay = false)"
              center
              :value="dinnerInjectionWay.text"
            >
              <template #title>
                <div class="title-in-cell">晚餐注射方式</div>
              </template>
            </van-cell>
            <van-popup v-model:show="showDinnerSelectInjectionWay" round position="bottom">
              <van-picker
                :columns="selectInjectionWayActions"
                @cancel="showDinnerSelectInjectionWay = false"
                @confirm="onConfirmDinnerInjectionWay"
              />
            </van-popup>
          </van-cell-group>
        </div>
        <!-- 早餐表单 -->
        <div class="breakfast-box" v-if="showBreakfastInput">
          <div class="cell-group" v-if="showBreakfastBolusInput">
            <van-cell-group inset>
              <van-field v-model="breakfastBolus" type="number" label="早餐大剂量" input-align="right" :readonly="isCheckMode">
                <template #right-icon> U </template>
              </van-field>
            </van-cell-group>
          </div>
          <div class="cell-group" v-if="showBreakfastSquareWaveInput">
            <van-cell-group inset>
              <van-field v-model="breakfastSquareWaveRate" type="number" label="早餐方波速率" input-align="right" :readonly="isCheckMode">
                <template #right-icon> U/H </template>
              </van-field>
            </van-cell-group>
          </div>
          <div class="cell-group" v-if="showBreakfastSquareWaveInput">
            <van-cell-group inset>
              <van-field
                v-model="breakfastSquareWaveTime"
                type="number"
                label="早餐方波持续时间"
                input-align="right"
                class="set-field-width"
                :readonly="isCheckMode"
              >
                <template #right-icon> 分钟 </template>
              </van-field>
            </van-cell-group>
          </div>
        </div>
        <!-- 午餐表单 -->
        <div class="lunch-box" v-if="showLunchInput">
          <div class="cell-group" v-if="showLunchBolusInput">
            <van-cell-group inset>
              <van-field v-model="lunchBolus" type="number" label="午餐大剂量" input-align="right" :readonly="isCheckMode">
                <template #right-icon> U </template>
              </van-field>
            </van-cell-group>
          </div>
          <div class="cell-group" v-if="showLunchSquareWaveInput">
            <van-cell-group inset>
              <van-field v-model="lunchSquareWaveRate" type="number" label="午餐方波速率" input-align="right" :readonly="isCheckMode">
                <template #right-icon> U/H </template>
              </van-field>
            </van-cell-group>
          </div>
          <div class="cell-group" v-if="showLunchSquareWaveInput">
            <van-cell-group inset>
              <van-field
                v-model="lunchSquareWaveTime"
                type="number"
                label="午餐方波持续时间"
                input-align="right"
                class="set-field-width"
                :readonly="isCheckMode"
              >
                <template #right-icon> 分钟 </template>
              </van-field>
            </van-cell-group>
          </div>
        </div>
        <!-- 晚餐表单 -->
        <div class="breakfast-box" v-if="showDinnerInput">
          <div class="cell-group" v-if="showDinnerBolusInput">
            <van-cell-group inset>
              <van-field v-model="dinnerBolus" type="number" label="晚餐大剂量" input-align="right" :readonly="isCheckMode">
                <template #right-icon> U </template>
              </van-field>
            </van-cell-group>
          </div>
          <div class="cell-group" v-if="showDinnerSquareWaveInput">
            <van-cell-group inset>
              <van-field v-model="dinnerSquareWaveRate" type="number" label="晚餐方波速率" input-align="right" :readonly="isCheckMode">
                <template #right-icon> U/H </template>
              </van-field>
            </van-cell-group>
          </div>
          <div class="cell-group" v-if="showDinnerSquareWaveInput">
            <van-cell-group inset>
              <van-field
                v-model="dinnerSquareWaveTime"
                type="number"
                label="晚餐方波持续时间"
                input-align="right"
                class="set-field-width"
                :readonly="isCheckMode"
              >
                <template #right-icon> 分钟 </template>
              </van-field>
            </van-cell-group>
          </div>
        </div>
      </div>
      <!-- 餐前+基础 -->
      <div class="plan-about-pre-meal-and-basal" v-if="showPreMealAndBasal">
        <div class="cell-group">
          <van-cell-group inset>
            <van-cell
              :is-link="!isCheckMode"
              @click="!isCheckMode ? (showSelectInjectionTypeAboutPreMeal = true) : (showSelectInjectionTypeAboutPreMeal = false)"
              center
              :value="userInsulinTypeAboutPreMeal.text"
            >
              <template #title>
                <div class="title-in-cell">餐前胰岛素类型</div>
              </template>
            </van-cell>
            <van-popup v-model:show="showSelectInjectionTypeAboutPreMeal" round position="bottom">
              <van-picker
                :columns="selectInjectionActions"
                @cancel="showSelectInjectionTypeAboutPreMeal = false"
                @confirm="onConfirmInsulinTypeAboutPreMeal"
              />
            </van-popup>
          </van-cell-group>
        </div>
        <div class="cell-group">
          <van-cell-group inset>
            <van-cell
              :is-link="!isCheckMode"
              @click="!isCheckMode ? (showSelectInjectionTypeAboutBasal = true) : (showSelectInjectionTypeAboutBasal = false)"
              center
              :value="userInsulinTypeAboutBasal.text"
            >
              <template #title>
                <div class="title-in-cell">基础胰岛素类型</div>
              </template>
            </van-cell>
            <van-popup v-model:show="showSelectInjectionTypeAboutBasal" round position="bottom">
              <van-picker
                :columns="selectInjectionActions"
                @cancel="showSelectInjectionTypeAboutBasal = false"
                @confirm="onConfirmInsulinTypeAboutBasal"
              />
            </van-popup>
          </van-cell-group>
        </div>
        <div class="cell-group">
          <van-cell-group inset>
            <van-field v-model="breakfastBolus" type="number" label="早餐大剂量" input-align="right" :readonly="isCheckMode">
              <template #right-icon> U </template>
            </van-field>
          </van-cell-group>
        </div>
        <div class="cell-group">
          <van-cell-group inset>
            <van-field v-model="lunchBolus" type="number" label="午餐大剂量" input-align="right" :readonly="isCheckMode">
              <template #right-icon> U </template>
            </van-field>
          </van-cell-group>
        </div>
        <div class="cell-group">
          <van-cell-group inset>
            <van-field v-model="dinnerBolus" type="number" label="晚餐大剂量" input-align="right" :readonly="isCheckMode">
              <template #right-icon> U </template>
            </van-field>
          </van-cell-group>
        </div>
        <div class="cell-group">
          <van-cell-group inset>
            <van-field v-model="basalBolus" type="number" label="基础胰岛素剂量" input-align="right" class="set-field-width" :readonly="isCheckMode">
              <template #right-icon> U </template>
            </van-field>
          </van-cell-group>
        </div>
      </div>
      <!-- 预混 -->
      <div class="premixed" v-if="showPremixed">
        <div class="warning-box">
          <div class="warning-font-box">
            *由于预混胰岛素剂量配比固定，剂量调整缺乏弹性，且存在更高的低血糖发生风险，因此不优先推荐
            T1DM使用预混胰岛素。但对于部分不愿佩戴胰岛素泵或希望减少每日胰岛素注射次数，或是处于胰岛素蜜月期的糖友，也可以谨慎考虑使用。
          </div>
        </div>
        <div class="cell-group">
          <van-cell-group inset>
            <van-cell
              :is-link="!isCheckMode"
              @click="!isCheckMode ? (showSelectInjectionTypeAboutPremixed = true) : (showSelectInjectionTypeAboutPremixed = false)"
              center
              :value="userInsulinTypeAboutPremixed.text"
            >
              <template #title>
                <div class="title-in-cell">预混胰岛素</div>
              </template>
            </van-cell>
            <van-popup v-model:show="showSelectInjectionTypeAboutPremixed" round position="bottom">
              <van-picker
                :columns="selectInjectionActions"
                @cancel="showSelectInjectionTypeAboutPremixed = false"
                @confirm="onConfirmInsulinTypeAboutPremixed"
              />
            </van-popup>
          </van-cell-group>
        </div>
        <div class="cell-group">
          <van-cell-group inset>
            <van-field v-model="breakfastBolus" type="number" label="早餐大剂量" input-align="right" :readonly="isCheckMode">
              <template #right-icon> U </template>
            </van-field>
          </van-cell-group>
        </div>
        <div class="cell-group">
          <van-cell-group inset>
            <van-field v-model="lunchBolus" type="number" label="午餐大剂量" input-align="right" :readonly="isCheckMode">
              <template #right-icon> U </template>
            </van-field>
          </van-cell-group>
        </div>
        <div class="cell-group">
          <van-cell-group inset>
            <van-field v-model="dinnerBolus" type="number" label="晚餐大剂量" input-align="right" :readonly="isCheckMode">
              <template #right-icon> U </template>
            </van-field>
          </van-cell-group>
        </div>
      </div>
      <!-- 药物 -->
      <div class="agent" v-if="showAgent">
        <div class="cell-group">
          <van-cell-group inset title="降糖药物">
            <van-field v-model="userAgentName" type="text" label="药品名" input-align="right"> </van-field>
            <van-field v-model="userAgentDosage" type="number" label="剂量" input-align="right">
              <template #right-icon> mg </template>
            </van-field>
          </van-cell-group>
        </div>
        <div class="cell-group">
          <van-cell-group inset> </van-cell-group>
        </div>
      </div>
      <!-- 不用胰岛素 -->
      <div class="diet" v-if="showNoInsulinWarning">
        <div class="warning-box">
          <div class="warning-font-box">*不推荐处于蜜月期的一型糖友停止注射外源胰岛素。严重者会导致酮症酸中毒，危及生命！</div>
        </div>
      </div>
      <!-- 备注 -->
      <div class="cell-group last-box" v-if="showRemark">
        <van-cell-group inset title="方案备注">
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
          </van-field>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<style scoped>
.last-box {
  margin-bottom: 15px;
}
.set-color {
  color: #1989fa;
}
.set-field-width {
  --van-field-label-width: 120px;
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
.warning-font-box {
  font-size: 15px;
  font-weight: bold;
}
.warning-box {
  text-align: left;
  background-color: #b3efff;
  color: #046b99;
  display: flex; /* 使用Flex布局 */
  justify-content: center; /* 水平居中对齐 */
  align-items: center; /* 垂直居中对齐 */
  border-radius: 10px;
  margin: 20px;
  padding: 10px;
}
.page-container {
  min-height: 100vh;
  background: #f6f7fb;
}
</style>
