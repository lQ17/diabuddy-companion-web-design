<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { recordGetUserTodayLastBloodSugar } from '@/api/record'
const userStore = useUserStore()
const initLastTodayBloodSugar = async () => {
  const res = await recordGetUserTodayLastBloodSugar(userStore.user.id)
  bloodSugarValue.value = res.data.data.bloodSugarValue * 10 || 85
}
const router = useRouter()
const onClickLeft = () => history.back()
const themeVars = reactive({
  cellBackground: '#B3EFFF',
  //cell-value-color
  cellValueColor: '#000000'
})
// 滑块组件是整数，所以bloodSugarValue为血糖值的十倍
// 5.5mmol/L = 55
const bloodSugarValue = ref(85)
const targetBloodSugarValue = ref(78)
// 用户胰岛素敏感系数 （十倍）
const userISF = ref(30)
//纠正计量
const correctDose = computed(() => {
  return ((bloodSugarValue.value - targetBloodSugarValue.value) / userISF.value).toFixed(3)
})

onMounted(() => {
  initLastTodayBloodSugar()
})
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="胰岛素纠正量" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <!-- 纠正计量蓝色盒子 -->
    <van-config-provider :theme-vars="themeVars">
      <van-cell-group inset title="纠正计量">
        <van-cell center>
          <template #title> ({{ bloodSugarValue / 10 }} - {{ targetBloodSugarValue / 10 }}) / {{ userISF }} = </template>
          <template #value>
            <div v-if="correctDose >= 0">{{ correctDose }} U</div>
            <div v-if="!(correctDose >= 0)">无需补针</div>
          </template>
        </van-cell>
      </van-cell-group>
    </van-config-provider>
    <van-divider :style="{ color: '#808080', borderColor: '#808080', padding: '0 16px' }" class="divider-2"></van-divider>
    <div class="blood-sugar-slider-box">
      <div class="show-msg">当前血糖值：{{ bloodSugarValue / 10 }} mmol/L</div>
      <div class="show-msg-tiny-1">*自动获取今天最后的血糖值，可手动修改</div>
      <div class="show-msg-tiny-2">滑块修改</div>
      <van-slider v-model="bloodSugarValue" :min="20" :max="250" />
      <div class="stepper-btn-box">
        <van-space>
          <van-button type="primary" size="small" plain class="stepper-btn" @click="bloodSugarValue += 10">+1</van-button>
          <van-button type="primary" size="small" plain class="stepper-btn" @click="bloodSugarValue += 5">+0.5</van-button>
          <van-button type="primary" size="small" plain class="stepper-btn" @click="bloodSugarValue += 1">+0.1</van-button>
          <van-button type="primary" size="small" plain class="stepper-btn" @click="bloodSugarValue -= 10">-1</van-button>
          <van-button type="primary" size="small" plain class="stepper-btn" @click="bloodSugarValue -= 5">-0.5</van-button>
          <van-button type="primary" size="small" plain class="stepper-btn" @click="bloodSugarValue -= 1">-0.1</van-button>
        </van-space>
      </div>
    </div>
    <van-divider :style="{ color: '#808080', borderColor: '#808080', padding: '0 16px' }"></van-divider>
    <div class="target-blood-sugar-box blood-sugar-slider-box">
      <div class="show-msg">目标血糖值：{{ targetBloodSugarValue / 10 }} mmol/L</div>
      <div class="show-msg-tiny-1">*血糖低于7.8 则没有纠正的必要 有低血糖的风险</div>
      <div class="show-msg-tiny-2">滑块修改</div>
      <van-slider v-model="targetBloodSugarValue" :min="60" :max="100" />
      <div class="stepper-btn-box">
        <van-space>
          <van-button type="primary" size="small" plain class="stepper-btn" @click="targetBloodSugarValue += 10">+1</van-button>
          <van-button type="primary" size="small" plain class="stepper-btn" @click="targetBloodSugarValue += 5">+0.5</van-button>
          <van-button type="primary" size="small" plain class="stepper-btn" @click="targetBloodSugarValue += 1">+0.1</van-button>
          <van-button type="primary" size="small" plain class="stepper-btn" @click="targetBloodSugarValue -= 10">-1</van-button>
          <van-button type="primary" size="small" plain class="stepper-btn" @click="targetBloodSugarValue -= 5">-0.5</van-button>
          <van-button type="primary" size="small" plain class="stepper-btn" @click="targetBloodSugarValue -= 1">-0.1</van-button>
        </van-space>
      </div>
    </div>
    <van-divider :style="{ color: '#808080', borderColor: '#808080', padding: '0 16px' }" class="divider-2"></van-divider>
    <div class="user-ISF blood-sugar-slider-box">
      <div class="show-msg">胰岛素敏感系数：{{ userISF / 10 }} mmol/L</div>
      <div class="show-msg-tiny" @click="router.push('/')">还未计算？</div>
      <div class="show-msg-tiny-2">滑块修改</div>
      <van-slider v-model="userISF" :min="1" :max="300" />
      <div class="stepper-btn-box">
        <van-space>
          <van-button type="primary" size="small" plain class="stepper-btn" @click="userISF += 10">+1</van-button>
          <van-button type="primary" size="small" plain class="stepper-btn" @click="userISF += 5">+0.5</van-button>
          <van-button type="primary" size="small" plain class="stepper-btn" @click="userISF += 1">+0.1</van-button>
          <van-button type="primary" size="small" plain class="stepper-btn" @click="userISF -= 10">-1</van-button>
          <van-button type="primary" size="small" plain class="stepper-btn" @click="userISF -= 5">-0.5</van-button>
          <van-button type="primary" size="small" plain class="stepper-btn" @click="userISF -= 1">-0.1</van-button>
        </van-space>
      </div>
    </div>
    <div class="warning-box">
      <div class="warning-font-box">
        温馨提示： 由于各个胰岛素作用时间、作用峰值不同，体内可能还有部分残留的胰岛素仍然在发挥作用。
        请等胰岛素作用时间结束后，再根据当时血糖值，注射纠正
      </div>
    </div>
  </div>
</template>

<style scoped>
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
.user-ISF .show-msg-tiny {
  color: #1989fa;
  text-align: center;
  font-size: 15px;
}
.my-cell-group {
  margin: 0px;
}
.input-box {
  margin-top: 30px;
}
.stepper-btn {
  font-weight: bold;
  width: 42px;
}
.stepper-btn-box {
  margin-top: 30px;
}
.blood-sugar-slider-box .show-msg-tiny-1 {
  font-size: 10px;
  text-align: center;
  color: #808080;

  margin-bottom: 20px;
}
.blood-sugar-slider-box .show-msg-tiny-2 {
  margin-bottom: 10px;
  font-size: 15px;
  text-align: left;
  color: #808080;
}
.blood-sugar-slider-box .show-msg {
  text-align: center;
}
.blood-sugar-slider-box {
  margin: 25px;
  margin-bottom: 50px;
  margin-top: 0px;
}
.page-container {
  min-height: 100vh;
  height: auto;
  background: #f6f7fb;
}
</style>
