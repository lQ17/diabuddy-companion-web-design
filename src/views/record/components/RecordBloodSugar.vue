<script setup>
import { ref } from 'vue'
import { WaterLevel as IconWaterLevel } from '@icon-park/vue-next'
const bloodSugar = ref()
</script>
<template>
  <div class="components-container">
    <div class="cell-group">
      <van-cell-group inset>
        <van-field v-model="bloodSugar" type="number" label="血糖" input-align="right">
          <template #left-icon> <icon-water-level theme="filled" size="20" fill="#DC143C" strokeLinecap="square" /> </template>
          <template #right-icon> mmol/L </template>
        </van-field>
      </van-cell-group>
    </div>
  </div>
</template>

<style scoped>
.cell-group {
  padding-top: 10px;
  /* padding-left: 10px; */
  padding-bottom: 0px;
  /* padding-right: 10px; */
}
</style>
