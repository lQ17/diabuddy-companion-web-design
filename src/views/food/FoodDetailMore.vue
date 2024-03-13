<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { foodGetTotalDetailService } from '@/api/food'
const route = useRoute()

const onClickLeft = () => history.back()

const foodId = route.query.foodId
const currentFood = ref({})
const getFoodTotalDetail = async () => {
  const res = await foodGetTotalDetailService(foodId)
  currentFood.value = res.data.data
  console.log(currentFood.value)
}
onMounted(() => {
  getFoodTotalDetail()
})
</script>
<template>
  <div class="page-container">
    <!-- 再根据id查一次数据库，拿到完整数据 -->
    <van-nav-bar left-text="返回" :title="currentFood.foodName" left-arrow @click-left="onClickLeft" placeholder />

    <div class="cell-group">
      <van-cell-group inset>
        <van-row justify="space-between" class="group-head">
          <van-col span="24">
            <h2>能量</h2>
          </van-col>
        </van-row>
        <van-cell title="能量"> {{ currentFood.energy }} kJ</van-cell>
        <van-cell title="可食部"> {{ currentFood.ediblePart }} %</van-cell>
        <van-cell title="水分">{{ currentFood.water }} g</van-cell>
        <van-cell title="蛋白质">{{ currentFood.protein }} g</van-cell>
        <van-cell title="脂肪">{{ currentFood.fat }} g</van-cell>
        <van-cell title="碳水化合物">{{ currentFood.carb }} g</van-cell>
        <van-cell title="膳食纤维">{{ currentFood.dietaryFiber }} g</van-cell>
        <van-cell title="胆固醇">{{ currentFood.cholesterol }} mg</van-cell>
        <van-cell title="灰分">{{ currentFood.ash }} g</van-cell>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-row justify="space-between" class="group-head">
          <van-col span="24">
            <h2>维生素</h2>
          </van-col>
        </van-row>
        <van-cell title="胡萝卜素"> {{ currentFood.carotene }} μg</van-cell>
        <van-cell title="维生素A">{{ currentFood.vitaminA }} μg</van-cell>
        <van-cell title="维生素C">{{ currentFood.vitaminC }} mg</van-cell>
        <van-cell title="α-TE">{{ currentFood.alphaTe }} mg</van-cell>
        <van-cell title="硫胺素">{{ currentFood.thiamin }} mg</van-cell>
        <van-cell title="核黄素">{{ currentFood.riboflavin }} mg</van-cell>
        <van-cell title="烟酸">{{ currentFood.niacin }} mg</van-cell>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-row justify="space-between" class="group-head">
          <van-col span="24">
            <h2>矿物质</h2>
          </van-col>
        </van-row>
        <van-cell title="钙">{{ currentFood.calcium }} mg</van-cell>
        <van-cell title="磷">{{ currentFood.phosphorus }} mg</van-cell>
        <van-cell title="钾">{{ currentFood.potassium }} mg</van-cell>
        <van-cell title="钠">{{ currentFood.sodium }} mg</van-cell>
        <van-cell title="镁">{{ currentFood.magnesium }} mg</van-cell>
        <van-cell title="铁">{{ currentFood.iron }} mg</van-cell>
        <van-cell title="锌">{{ currentFood.zinc }} mg</van-cell>
        <van-cell title="硒">{{ currentFood.selenium }} μg</van-cell>
        <van-cell title="铜">{{ currentFood.copper }} mg</van-cell>
        <van-cell title="锰">{{ currentFood.manganese }} mg</van-cell>
        <van-cell title="碘">{{ currentFood.iodine }} mg</van-cell>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-row justify="space-between" class="group-head">
          <van-col span="24">
            <h2>脂肪酸</h2>
          </van-col>
        </van-row>
        <van-cell title="饱和脂肪酸">{{ currentFood.saturatedFattyAcids }} %</van-cell>
        <van-cell title="单不饱和脂肪酸">{{ currentFood.monounsaturatedFattyAcids }} %</van-cell>
        <van-cell title="多不饱和脂肪酸">{{ currentFood.polyunsaturatedFattyAcids }} %</van-cell>
        <van-cell title="合计">{{ currentFood.totalFattyAcids }} %</van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<style scoped>
.last-group {
  min-height: 530px;
}
.circle-percent-box {
  font-size: 17px;
}
.circle-font-box {
  color: #808080;
  font-size: 12px;
}
.circle-inner-box {
  display: flex;
  justify-content: center;
  align-items: center; /* 垂直居中 */
  flex-direction: column;
  padding-top: 15px;
}
.circle-box {
  display: flex;
  justify-content: center;
  align-items: center; /* 垂直居中 */
}
#circle {
  margin-top: 10px;
}
#explain-font {
  padding-left: 15px;
  font-size: 13px;
  color: #808080;
}
.group-head {
  margin-top: 5px;
}
#eating-part {
  text-align: end;
  padding-right: 10px;
  padding-top: 5px;
  font-size: 15px;
  color: #808080;
}
h2 {
  color: #046b99;
  margin-left: 15px;
}
.font-under-icon {
  margin-top: 5px;
}
.liked {
  color: #ff976a;
}
.icon-box {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center; /* 垂直居中 */
  flex-direction: column;
  font-size: 12px;
}
.title-box {
  margin-left: 15px;
  font-size: 20px;
  font-weight: bold;
}
.page-container {
  min-height: 100vh;
  background: #f6f7fb;
}

.cell-group {
  padding-top: 10px;
  /* padding-left: 10px; */
  padding-bottom: 0px;
  /* padding-right: 10px; */
}
</style>
