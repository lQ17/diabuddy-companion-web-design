<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const onClickLeft = () => history.back()

const foodId = ref(0)
foodId.value = route.query.foodId
</script>
<template>
  <div class="page-container">
    <!-- 再根据id查一次数据库，拿到完整数据 -->
    <van-nav-bar left-text="苹果" :title="foodId" left-arrow @click-left="onClickLeft" placeholder />

    <div class="cell-group">
      <van-cell-group inset>
        <van-row justify="space-between" class="group-head">
          <van-col span="24">
            <h2>能量</h2>
          </van-col>
        </van-row>
        <van-cell title="能量"> 53 kJ</van-cell>
        <van-cell title="可食部"> 76 %</van-cell>
        <van-cell title="水分">85.9 g</van-cell>
        <van-cell title="蛋白质">0.2 g</van-cell>
        <van-cell title="脂肪">0.2 g</van-cell>
        <van-cell title="碳水化合物">13.5 g</van-cell>
        <van-cell title="膳食纤维"> g</van-cell>
        <van-cell title="胆固醇"> mg</van-cell>
        <van-cell title="灰分">0.2 g</van-cell>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-row justify="space-between" class="group-head">
          <van-col span="24">
            <h2>维生素</h2>
          </van-col>
        </van-row>
        <van-cell title="胡萝卜素"> 20.0 μg</van-cell>
        <van-cell title="维生素A"> μg</van-cell>
        <van-cell title="维生素C">4.0 mg</van-cell>
        <van-cell title="α-TE"> mg</van-cell>
        <van-cell title="硫胺素">0.06 mg</van-cell>
        <van-cell title="核黄素">0.02 mg</van-cell>
        <van-cell title="烟酸">0.20 mg</van-cell>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-row justify="space-between" class="group-head">
          <van-col span="24">
            <h2>矿物质</h2>
          </van-col>
        </van-row>
        <van-cell title="钙">4 mg</van-cell>
        <van-cell title="磷">12 mg</van-cell>
        <van-cell title="钾">119 mg</van-cell>
        <van-cell title="钠">1.6 mg</van-cell>
        <van-cell title="镁">4 mg</van-cell>
        <van-cell title="铁">0.6 mg</van-cell>
        <van-cell title="锌">0.19 mg</van-cell>
        <van-cell title="硒">0.10 μg</van-cell>
        <van-cell title="铜">0.06 mg</van-cell>
        <van-cell title="锰">0.03 mg</van-cell>
        <van-cell title="碘"> mg</van-cell>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-row justify="space-between" class="group-head">
          <van-col span="24">
            <h2>脂肪酸</h2>
          </van-col>
        </van-row>
        <van-cell title="饱和脂肪酸">51.8 %</van-cell>
        <van-cell title="单不饱和脂肪酸">43.1 %</van-cell>
        <van-cell title="多不饱和脂肪酸">4.6 %</van-cell>
        <van-cell title="合计">99.5 %</van-cell>
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
