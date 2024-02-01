<script setup>
import { ref } from 'vue'
import foodCategoryColumns from '@/components/FoodCategoryColumns.js'
import { useUploadFoodStore } from '@/stores'
// import { useRouter } from 'vue-router'
// const router = useRouter()
const onClickLeft = () => history.back()
// 存储食物数据
const uploadFoodStore = useUploadFoodStore()

// 显示、交互控制
const showFoodCategoryPicker = ref(false)
const onFoodCategoryPickerConfirm = ({ selectedOptions }) => {
  showFoodCategoryPicker.value = false
  const selectedOption1 = selectedOptions[0] // 第一列选中项
  const selectedOption2 = selectedOptions[1] // 第二列选中项
  // 将两列选中项的 text 拼接起来作为 foodCategory 的值
  uploadFoodStore.updateField('foodCategory', `${selectedOption1.text},${selectedOption2.text}`)
}

const comfirmUpload = () => {
  console.log('通过api存入数据库')
  uploadFoodStore.resetData()
}
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="食物预设" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="warning-box">
      <div class="warning-font-box">
        你可以在这里上传包装食物、自制的食物。也可以选择仅自己可见，或所有人可见。如上传所有人可见的公共食物，则需要经过审核。
      </div>
    </div>
    <h3>基本信息</h3>
    <div class="base-info-box">
      <div class="input-box">
        <van-cell-group inset>
          <van-field v-model="uploadFoodStore.foodName" label="食物名称" input-align="right" />
        </van-cell-group>
      </div>
      <div class="input-box">
        <van-cell-group inset>
          <van-cell center title="所有人可见">
            <template #right-icon>
              <van-switch v-model="uploadFoodStore.isPublicFood" />
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div class="input-box">
        <van-cell-group inset>
          <van-cell center title="包装食物">
            <template #right-icon>
              <van-switch v-model="uploadFoodStore.isPackedFood" />
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div class="input-box" v-if="true">
        <van-cell-group inset>
          <van-field v-model="uploadFoodStore.brandName" label="品牌名称" input-align="right" />
        </van-cell-group>
      </div>
      <div class="input-box" v-if="true">
        <van-cell-group inset>
          <van-field v-model="uploadFoodStore.foodCategory" is-link readonly label="食物分类" @click="showFoodCategoryPicker = true" />
        </van-cell-group>
        <van-popup v-model:show="showFoodCategoryPicker" round position="bottom">
          <van-picker :columns="foodCategoryColumns" @cancel="showFoodCategoryPicker = false" @confirm="onFoodCategoryPickerConfirm" />
        </van-popup>
      </div>
      <div class="input-box" v-if="true">
        <van-cell-group inset>
          <van-field name="uploader" input-align="right" label="上传图片">
            <template #input>
              <van-uploader v-model="uploadFoodStore.uploadFoodPhotoValue" :max-count="1" preview-size="40" />
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="input-box" v-if="true">
        <van-cell-group inset>
          <van-field name="uploader" input-align="right" label="营养成分表">
            <template #input>
              <van-uploader v-model="uploadFoodStore.uploadNutritionPhotoValue" :max-count="1" preview-size="40" />
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="input-box" v-if="true">
        <van-cell-group inset>
          <van-field name="uploader" input-align="right" label="配料表">
            <template #input>
              <van-uploader v-model="uploadFoodStore.uploadIngredientPhotoValue" :max-count="1" preview-size="40" />
            </template>
          </van-field>
        </van-cell-group>
      </div>
    </div>
    <h3>营养信息</h3>
    <div class="nutrition-info-box">
      <div class="input-box">
        <van-cell-group inset>
          <van-field v-model="uploadFoodStore.weightValue" label="数据单位" input-align="right" type="number">
            <template #right-icon>
              <div>克</div>
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="input-box">
        <van-cell-group inset>
          <van-field v-model="uploadFoodStore.energyValue" input-align="right" type="number" class="set-width-field">
            <template #label>
              <van-row>
                <van-col span="6">
                  <div>热量</div>
                </van-col>
                <van-col span="18">
                  <div class="redio-box">
                    <van-radio-group v-model="uploadFoodStore.energyUnit" direction="horizontal">
                      <van-radio name="1" icon-size="12px">千焦</van-radio>
                      <van-radio name="2" icon-size="12px">千卡</van-radio>
                    </van-radio-group>
                  </div>
                </van-col>
              </van-row>
            </template>
            <template #right-icon>
              <div v-if="uploadFoodStore.energyUnit === '1'">千焦</div>
              <div v-else>千卡</div>
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="input-box">
        <van-cell-group inset>
          <van-field v-model="uploadFoodStore.carbValue" label="碳水化合物" input-align="right" type="number">
            <template #right-icon>
              <div>克</div>
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="input-box">
        <van-cell-group inset>
          <van-field v-model="uploadFoodStore.proteinValue" label="蛋白质" input-align="right" type="number">
            <template #right-icon>
              <div>克</div>
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="input-box">
        <van-cell-group inset>
          <van-field v-model="uploadFoodStore.fatValue" label="脂肪" input-align="right" type="number">
            <template #right-icon>
              <div>克</div>
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="input-box">
        <van-cell-group inset>
          <van-field v-model="uploadFoodStore.sodiumValue" label="钠" input-align="right" type="number">
            <template #right-icon>
              <div>毫克</div>
            </template>
          </van-field>
        </van-cell-group>
      </div>
    </div>
    <h3>更多营养信息</h3>
    <div class="more-nutrition-info-box">
      <van-cell-group inset>
        <van-cell title="膳食纤维、胆固醇、维生素等" is-link to="/utils/user-upload-food-detail" />
      </van-cell-group>
    </div>
    <div class="btn">
      <van-button type="primary" round block @click="comfirmUpload">确认上传</van-button>
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
</style>
