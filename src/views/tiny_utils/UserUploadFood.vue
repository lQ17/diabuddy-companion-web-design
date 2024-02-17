<script setup>
import { ref, toRefs, computed } from 'vue'
import foodCategoryColumns from '@/components/FoodCategoryColumns.js'
import { useUploadFoodStore, useUserStore } from '@/stores'
import { foodUserAddFoodService } from '@/api/food'
const onClickLeft = () => history.back()
const uploadFoodStore = useUploadFoodStore()
const userStore = useUserStore()

// 显示、交互控制
const showfoodCategoryStrPicker = ref(false)
const onfoodCategoryStrPickerConfirm = ({ selectedOptions }) => {
  showfoodCategoryStrPicker.value = false
  const selectedOption1 = selectedOptions[0] // 第一列选中项
  const selectedOption2 = selectedOptions[1] // 第二列选中项
  // 将两列选中项的 text 拼接起来作为 foodCategoryStr 的值
  uploadFoodStore.updateField('foodCategoryStr', `${selectedOption1.text} : ${selectedOption2.text}`)
}

//按钮
const comfirmUpload = () => {
  console.log('通过api存入数据库')
  userAddFood()
}
// 将 store 的所有 ref 响应式对象转换为局部变量
const { foodCategoryStr, weightValue, energyUnit, updateField, resetData, ...restRefs } = toRefs(uploadFoodStore)

//不让报错，懒得改了
foodCategoryStr
weightValue
energyUnit
updateField
resetData

const payload = computed(() => {
  const data = {
    ...Object.keys(restRefs).reduce((acc, key) => {
      acc[key] = restRefs[key].value
      return acc
    }, {}),
    userId: userStore.user.id
  }

  if (uploadFoodStore.energyUnit === '2') {
    data.energy = (uploadFoodStore.energy / 4.184).toFixed(0)
  }

  return data
})

const userAddFood = async () => {
  try {
    console.log(payload.value)
    await foodUserAddFoodService(payload.value)
    await uploadFoodStore.resetData()
  } catch (error) {
    console.error('Error adding food:', error)
  }
}
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="食物上传" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="warning-box">
      <div class="warning-font-box">
        你可以在这里上传包装食物、自制的食物。也可以选择仅自己可见，或所有人可见。上传所有人可见的公共食物，需要经过审核。
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
      <div class="input-box" v-if="uploadFoodStore.isPackedFood">
        <van-cell-group inset>
          <van-field v-model="uploadFoodStore.brandName" label="品牌名称" input-align="right" />
        </van-cell-group>
      </div>
      <div class="input-box">
        <van-cell-group inset>
          <van-field v-model="uploadFoodStore.foodCategoryStr" is-link readonly label="食物分类" @click="showfoodCategoryStrPicker = true" />
        </van-cell-group>
        <van-popup v-model:show="showfoodCategoryStrPicker" round position="bottom">
          <van-picker :columns="foodCategoryColumns" @cancel="showfoodCategoryStrPicker = false" @confirm="onfoodCategoryStrPickerConfirm" />
        </van-popup>
      </div>
      <div class="input-box">
        <van-cell-group inset>
          <van-field name="uploader" input-align="right" label="上传图片">
            <template #input>
              <van-uploader v-model="uploadFoodStore.foodPic[0]" :max-count="1" preview-size="40" />
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="input-box" v-if="uploadFoodStore.isPackedFood">
        <van-cell-group inset>
          <van-field name="uploader" input-align="right" label="营养成分表">
            <template #input>
              <van-uploader v-model="uploadFoodStore.foodPic[1]" :max-count="1" preview-size="40" />
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="input-box" v-if="uploadFoodStore.isPackedFood">
        <van-cell-group inset>
          <van-field name="uploader" input-align="right" label="配料表">
            <template #input>
              <van-uploader v-model="uploadFoodStore.foodPic[2]" :max-count="1" preview-size="40" />
            </template>
          </van-field>
        </van-cell-group>
      </div>
    </div>
    <h3>营养信息</h3>
    <div class="nutrition-info-box">
      <div class="input-box">
        <van-cell-group inset>
          <van-field v-model="uploadFoodStore.weightValue" label="数据单位" input-align="right" type="number" disabled>
            <template #right-icon>
              <div>克</div>
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="input-box">
        <van-cell-group inset>
          <van-field v-model="uploadFoodStore.energy" input-align="right" type="number" class="set-width-field">
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
          <van-field v-model="uploadFoodStore.carb" label="碳水化合物" input-align="right" type="number">
            <template #right-icon>
              <div>克</div>
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="input-box">
        <van-cell-group inset>
          <van-field v-model="uploadFoodStore.protein" label="蛋白质" input-align="right" type="number">
            <template #right-icon>
              <div>克</div>
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="input-box">
        <van-cell-group inset>
          <van-field v-model="uploadFoodStore.fat" label="脂肪" input-align="right" type="number">
            <template #right-icon>
              <div>克</div>
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="input-box">
        <van-cell-group inset>
          <van-field v-model="uploadFoodStore.sodium" label="钠" input-align="right" type="number">
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
