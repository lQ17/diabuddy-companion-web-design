<script setup>
import { computed } from 'vue'
import { defineProps } from 'vue'
const props = defineProps({
  food: {
    type: Object,
    default: () => ({})
  }
})
const energyText = computed(() => {
  // 确保 food.energy 是一个数字
  const energy = parseFloat(props.food.energy)
  return `热量 ${energy.toFixed(2)}千卡 /100克`
})

const energyKeywords = computed(() => [`${props.food.energy.toFixed(2)}`, `千卡`, `热量`])

const carbText = computed(() => {
  // 确保 food.carb 是一个数字
  const carb = parseFloat(props.food.carb)
  return `碳水 ${carb.toFixed(2)}克 /100克`
})

const carbKeywords = computed(() => [`${props.food.carb.toFixed(2)}`, `碳水`, `克 `])
</script>
<template>
  <div class="food-list-item">
    <van-cell center>
      <template #icon>
        <van-image width="70px" height="70px" fit="cover" position="center" :src="props.food.foodPic" />
      </template>
      <template #title>
        <div class="title-box">{{ props.food.foodName }}</div>
      </template>
      <template #label>
        <van-row>
          <van-col span="12">
            <div class="label-box">
              <van-highlight :keywords="energyKeywords" :source-string="energyText" />
            </div>
          </van-col>
          <van-col span="12">
            <div class="label-box">
              <van-highlight :keywords="carbKeywords" :source-string="carbText" />
            </div>
          </van-col>
        </van-row>
      </template>
    </van-cell>
    <div class="van-hairline--top"></div>
  </div>
</template>

<style scoped>
.label-box {
  margin-left: 10px;
}
.title-box {
  margin-left: 10px;
  font-size: 15px;
  font-weight: bold;
}
</style>
