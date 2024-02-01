<script setup>
import { useUploadFoodStore } from '@/stores'
// import { useRouter } from 'vue-router'
// const router = useRouter()
const onClickLeft = () => history.back()
const onClickBtn = () => history.back()
// 存储食物数据
const uploadFoodStore = useUploadFoodStore()
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="更多营养信息" left-text="返回" left-arrow @click-left="onClickLeft" />
    <h3>更多营养信息</h3>
    <!-- 血糖指数 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.glycemicIndex" label="血糖指数" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 血糖负荷 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.glycemicLoad" label="血糖负荷" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 可食用部分 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.ediblePart" label="可食用部分" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 水分 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.water" label="水分" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 灰分 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.ash" label="灰分" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 碳水化合物 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.carbohydrates" label="碳水化合物" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 膳食纤维 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.dietaryFiber" label="膳食纤维" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 胡萝卜素 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.carotene" label="胡萝卜素" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 维生素A -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.vitaminA" label="维生素A" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- α-生育酚 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.alphaTe" label="α-生育酚" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 硫胺素 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.thiamin" label="硫胺素" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 核黄素 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.riboflavin" label="核黄素" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 烟酸 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.niacin" label="烟酸" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 维生素C -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.vitaminC" label="维生素C" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 钙 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.calcium" label="钙" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 磷 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.phosphorus" label="磷" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 钾 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.potassium" label="钾" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 镁 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.magnesium" label="镁" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 铁 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.iron" label="铁" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 锌 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.zinc" label="锌" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 硒 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.selenium" label="硒" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 铜 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.copper" label="铜" input-align="right" type="number" />
      </van-cell-group>
    </div>
    <!-- 锰 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.manganese" label="锰" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 碘 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.iodine" label="碘" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 饱和脂肪酸 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.saturatedFattyAcids" label="饱和脂肪酸" input-align="right" type="number" />
      </van-cell-group>
    </div>

    <!-- 单不饱和脂肪酸 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field
          v-model="uploadFoodStore.monounsaturatedFattyAcids"
          label="单不饱和脂肪酸"
          input-align="right"
          type="number"
          class="set-width-field"
        />
      </van-cell-group>
    </div>

    <!-- 多不饱和脂肪酸 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field
          v-model="uploadFoodStore.polyunsaturatedFattyAcids"
          label="多不饱和脂肪酸"
          input-align="right"
          type="number"
          class="set-width-field"
        />
      </van-cell-group>
    </div>

    <!-- 总脂肪酸 -->
    <div class="input-box">
      <van-cell-group inset>
        <van-field v-model="uploadFoodStore.totalFattyAcids" label="总脂肪酸" input-align="right" type="number" />
      </van-cell-group>
    </div>
    <div class="btn">
      <van-button type="primary" round block @click="onClickBtn">保存</van-button>
    </div>
  </div>
</template>
<style scoped>
.btn {
  margin: 20px;
}
.set-width-field {
  --van-field-label-width: 200px;
}
.input-box {
  margin-bottom: 10px;
}
h3 {
  margin: 20px;
  margin-left: 30px;
}
.page-container {
  min-height: 100vh;
  background: #f6f7fb;
}
</style>
