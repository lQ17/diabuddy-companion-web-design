<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  food: {
    type: Object,
    default: () => ({})
  }
})
const calText = `热量 ${props.food.cal}千卡 /100克`
const calKeywords = [`${props.food.cal}`, `千卡`, `热量`]
const carbText = `碳水 ${props.food.carb}克 /100克`
const carbKeywords = [`${props.food.carb}`, `碳水`, `克 `]
</script>
<template>
  <div class="food-list-item">
    <van-cell center>
      <template #icon>
        <van-image width="70px" height="70px" fit="cover" position="center" :src="props.food.img" />
      </template>
      <template #title>
        <div class="title-box">{{ props.food.foodName }}</div>
      </template>
      <template #label>
        <van-row>
          <van-col span="12">
            <div class="label-box">
              <van-highlight :keywords="calKeywords" :source-string="calText" />
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
