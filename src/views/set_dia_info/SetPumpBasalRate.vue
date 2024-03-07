<script setup>
import { ref, onMounted } from 'vue'
import { showConfirmDialog } from '@/components/vantComponents'
import { planUserCheckPumpBasalRateService, planUserAddPumpBasalRateManualService } from '@/api/plan'
import { showSuccessToast, showFailToast } from '@/components/vantComponents'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
const route = useRoute()
const checkId = route.query.checkId
const userStore = useUserStore()
const onClickLeft = () => {
  // 未保存，并且是本人
  if (!isSaved.value && checkId == userStore.user.id) {
    showConfirmDialog({
      title: '您还没保存，确认退出吗？'
    })
      .then(() => {
        // on confirm
        history.back()
      })
      .catch(() => {
        // on cancel
      })
  } else {
    history.back()
  }
}

const isSaved = ref(false)

const onClickRight = async () => {
  // 判断是否是用户本人
  if (checkId == userStore.user.id) {
    isSaved.value = true
    await planUserAddPumpBasalRateManualService(updateDataWithRates())
    showSuccessToast('已保存')
  } else {
    showFailToast('非本人禁止修改')
  }
}

const updateDataWithRates = () => {
  const data = {
    userId: userStore.user.id
  }

  pumpBasalRate.value.forEach((item) => {
    data[item.name] = item.value
  })

  return data
}

// “同上”按钮
const updateValues = (index) => {
  if (index < 0 || index >= pumpBasalRate.value.length) {
    // 索引超出范围
    return
  }

  // 定义一个递归函数来向上查找第一个非空的value
  const findValidValue = (currentIndex) => {
    if (currentIndex < 0) {
      return '' // 达到数组开头仍未找到，返回空字符串
    }
    if (pumpBasalRate.value[currentIndex].value !== '') {
      return pumpBasalRate.value[currentIndex].value // 找到非空值，返回它
    }
    return findValidValue(currentIndex - 1) // 否则，继续向上查找
  }

  const newValue = findValidValue(index - 1)

  // 如果找到了有效值，则更新当前索引及其之前的所有空值
  if (newValue !== '') {
    for (let i = index; i >= 0; i--) {
      if (pumpBasalRate.value[i].value === '') {
        pumpBasalRate.value[i].value = newValue
      } else {
        pumpBasalRate.value[i].value = newValue
        break // 遇到非空值，停止更新
      }
    }
  }
}

const pumpBasalRate = ref([
  { name: 'rate0000', value: null },
  { name: 'rate0030', value: null },
  { name: 'rate0100', value: null },
  { name: 'rate0130', value: null },
  { name: 'rate0200', value: null },
  { name: 'rate0230', value: null },
  { name: 'rate0300', value: null },
  { name: 'rate0330', value: null },
  { name: 'rate0400', value: null },
  { name: 'rate0430', value: null },
  { name: 'rate0500', value: null },
  { name: 'rate0530', value: null },
  { name: 'rate0600', value: null },
  { name: 'rate0630', value: null },
  { name: 'rate0700', value: null },
  { name: 'rate0730', value: null },
  { name: 'rate0800', value: null },
  { name: 'rate0830', value: null },
  { name: 'rate0900', value: null },
  { name: 'rate0930', value: null },
  { name: 'rate1000', value: null },
  { name: 'rate1030', value: null },
  { name: 'rate1100', value: null },
  { name: 'rate1130', value: null },
  { name: 'rate1200', value: null },
  { name: 'rate1230', value: null },
  { name: 'rate1300', value: null },
  { name: 'rate1330', value: null },
  { name: 'rate1400', value: null },
  { name: 'rate1430', value: null },
  { name: 'rate1500', value: null },
  { name: 'rate1530', value: null },
  { name: 'rate1600', value: null },
  { name: 'rate1630', value: null },
  { name: 'rate1700', value: null },
  { name: 'rate1730', value: null },
  { name: 'rate1800', value: null },
  { name: 'rate1830', value: null },
  { name: 'rate1900', value: null },
  { name: 'rate1930', value: null },
  { name: 'rate2000', value: null },
  { name: 'rate2030', value: null },
  { name: 'rate2100', value: null },
  { name: 'rate2130', value: null },
  { name: 'rate2200', value: null },
  { name: 'rate2230', value: null },
  { name: 'rate2300', value: null },
  { name: 'rate2330', value: null }
])

// 格式化时间
// const formatTimeRange = (rateString) => {
//   // 从 rate 字符串中提取小时和分钟
//   const matches = rateString.match(/rate_(\d{2})_(\d{2})/)
//   if (matches) {
//     const startHour = matches[1]
//     const startMinute = matches[2]
//     // 通过添加30分钟来计算结束时间
//     const endHour = ref(parseInt(startHour))
//     const endMinute = ref(parseInt(startMinute) + 30)
//     if (endMinute.value === 60) {
//       endHour.value = (endHour.value + 1) % 24
//       endMinute.value = '00'
//     }
//     // 格式化结束时间小时
//     if (endHour.value < 10) {
//       endHour.value = '0' + endHour.value
//     }
//     // 特殊情况处理最后一个时间段
//     if (rateString === 'rate_23_30') {
//       return `23:30 - 24:00`
//     }
//     return `${startHour}:${startMinute} - ${endHour.value}:${endMinute.value}`
//   }
//   return '' // 如果格式不匹配，返回空字符串
// }

const init = async () => {
  try {
    const res = await planUserCheckPumpBasalRateService(checkId)
    const data = res.data.data

    pumpBasalRate.value.forEach((item) => {
      // 使用对象的属性名来获取对应的值
      if (data[item.name] !== undefined) {
        item.value = data[item.name]
      }
    })
  } catch (error) {
    console.error('未找到您的基础率：', error)
  }
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="page-container">
    <van-nav-bar
      title="基础率设置"
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      fixed
      placeholder
    />
    <van-list>
      <!-- <van-field
        v-for="(item, index) in pumpBasalRate"
        :key="index"
        class="my-cell"
        center
        v-model.lazy="item.value"
        input-align="right"
        type="number"
      >
        <template #label> {{ formatTimeRange(item.name) }}</template>
        <template #right-icon> U/H </template>
        <template #button v-if="item.name !== 'rate_00_00'">
          <van-button plain type="primary" size="small" @click="updateValues(index)">同上</van-button>
        </template>
        <template #button v-else>
          <van-button plain type="primary" size="small" disabled id="first_cell">同上</van-button>
        </template>
      </van-field> -->

      <!-- 空间换时间，真是一场酣畅淋漓的劳动 -->
      <van-field class="my-cell" center v-model="pumpBasalRate[0].value" input-align="right" type="number">
        <template #label>00:00 - 00:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" disabled id="first_cell">同上</van-button>
        </template>
      </van-field>

      <van-field class="my-cell" center v-model="pumpBasalRate[1].value" input-align="right" type="number">
        <template #label>00:30 - 01:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(1)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[2].value" input-align="right" type="number">
        <template #label>01:00 - 01:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(2)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[3].value" input-align="right" type="number">
        <template #label>01:30 - 02:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(3)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[4].value" input-align="right" type="number">
        <template #label>02:00 - 02:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(4)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[5].value" input-align="right" type="number">
        <template #label>02:30 - 03:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(5)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[6].value" input-align="right" type="number">
        <template #label>03:00 - 03:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(6)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[7].value" input-align="right" type="number">
        <template #label>03:30 - 04:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(7)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[8].value" input-align="right" type="number">
        <template #label>04:00 - 04:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(8)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[9].value" input-align="right" type="number">
        <template #label>04:30 - 05:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(9)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[10].value" input-align="right" type="number">
        <template #label>05:00 - 05:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(10)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[11].value" input-align="right" type="number">
        <template #label>05:30 - 06:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(11)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[12].value" input-align="right" type="number">
        <template #label>06:00 - 06:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(12)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[13].value" input-align="right" type="number">
        <template #label>06:30 - 07:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(13)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[14].value" input-align="right" type="number">
        <template #label>07:00 - 07:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(14)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[15].value" input-align="right" type="number">
        <template #label>07:30 - 08:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(15)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[16].value" input-align="right" type="number">
        <template #label>08:00 - 08:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(16)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[17].value" input-align="right" type="number">
        <template #label>08:30 - 09:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(17)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[18].value" input-align="right" type="number">
        <template #label>09:00 - 09:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(18)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[19].value" input-align="right" type="number">
        <template #label>09:30 - 10:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(19)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[20].value" input-align="right" type="number">
        <template #label>10:00 - 10:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(20)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[21].value" input-align="right" type="number">
        <template #label>10:30 - 11:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(21)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[22].value" input-align="right" type="number">
        <template #label>11:00 - 11:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(22)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[23].value" input-align="right" type="number">
        <template #label>11:30 - 12:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(23)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[24].value" input-align="right" type="number">
        <template #label>12:00 - 12:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(24)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[25].value" input-align="right" type="number">
        <template #label>12:30 - 13:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(25)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[26].value" input-align="right" type="number">
        <template #label>13:00 - 13:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(26)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[27].value" input-align="right" type="number">
        <template #label>13:30 - 14:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(27)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[28].value" input-align="right" type="number">
        <template #label>14:00 - 14:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(28)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[29].value" input-align="right" type="number">
        <template #label>14:30 - 15:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(29)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[30].value" input-align="right" type="number">
        <template #label>15:00 - 15:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(30)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[31].value" input-align="right" type="number">
        <template #label>15:30 - 16:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(31)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[32].value" input-align="right" type="number">
        <template #label>16:00 - 16:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(32)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[33].value" input-align="right" type="number">
        <template #label>16:30 - 17:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(33)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[34].value" input-align="right" type="number">
        <template #label>17:00 - 17:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(34)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[35].value" input-align="right" type="number">
        <template #label>17:30 - 18:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(35)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[36].value" input-align="right" type="number">
        <template #label>18:00 - 18:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(36)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[37].value" input-align="right" type="number">
        <template #label>18:30 - 19:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(37)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[38].value" input-align="right" type="number">
        <template #label>19:00 - 19:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(38)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[39].value" input-align="right" type="number">
        <template #label>19:30 - 20:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(39)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[40].value" input-align="right" type="number">
        <template #label>20:00 - 20:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(40)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[41].value" input-align="right" type="number">
        <template #label>20:30 - 21:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(41)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[42].value" input-align="right" type="number">
        <template #label>21:00 - 21:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(42)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[43].value" input-align="right" type="number">
        <template #label>21:30 - 22:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(43)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[44].value" input-align="right" type="number">
        <template #label>22:00 - 22:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(44)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[45].value" input-align="right" type="number">
        <template #label>22:30 - 23:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(45)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[46].value" input-align="right" type="number">
        <template #label>23:00 - 23:30</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(46)">同上</van-button>
        </template>
      </van-field>
      <van-field class="my-cell" center v-model="pumpBasalRate[47].value" input-align="right" type="number">
        <template #label>23:30 - 24:00</template>
        <template #right-icon> U/H </template>
        <template #button>
          <van-button plain type="primary" size="small" @click="updateValues(47)">同上</van-button>
        </template>
      </van-field>
    </van-list>
  </div>
</template>

<style scoped>
#first_cell {
  opacity: 0;
}
.cell-value {
  text-align: center;
}
.my-cell {
  --van-field-label-width: 120px;
}
</style>
