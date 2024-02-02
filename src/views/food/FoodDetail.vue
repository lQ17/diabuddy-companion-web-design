<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const onClickLeft = () => history.back()

const foodId = ref(0)
foodId.value = route.query.foodId
const toMoreDetailPage = `/food-detail-more?foodId=${foodId.value}`
const carbCurrentRate = ref(77)
const proteinCurrentRate = ref(14)
const fatCurrentRate = ref(9)
const carbText = computed(() => carbCurrentRate.value.toFixed(0) + '%')
const proteinText = computed(() => proteinCurrentRate.value.toFixed(0) + '%')
const fatText = computed(() => fatCurrentRate.value.toFixed(0) + '%')
</script>
<template>
  <div class="page-container">
    <!-- 再根据id查一次数据库，拿到完整数据 -->
    <van-nav-bar left-text="苹果" :title="foodId" left-arrow @click-left="onClickLeft" placeholder />
    <div class="cell-group">
      <van-cell-group inset>
        <van-cell center>
          <template #icon>
            <van-image width="70px" height="70px" fit="cover" position="center" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
          </template>
          <template #title>
            <div class="title-box">苹果</div>
          </template>
        </van-cell>
        <van-row>
          <!-- 未收藏 -->
          <van-col span="8" v-if="true">
            <div class="icon-box">
              <van-icon name="star-o" size="22" />
              <div class="font-under-icon">收藏</div>
            </div>
          </van-col>
          <!-- 已收藏 -->
          <van-col span="8" v-else>
            <div class="icon-box liked">
              <van-icon name="star" color="#ff976a" size="22" />
              <div class="font-under-icon">已收藏</div>
            </div>
          </van-col>
          <van-col span="8">
            <div class="icon-box">
              <van-icon name="brush-o" size="22" />
              <div class="font-under-icon">纠错</div>
            </div>
          </van-col>
          <van-col span="8">
            <div class="icon-box">
              <van-icon name="records-o" size="22" />
              <div class="font-under-icon">记录</div>
            </div>
          </van-col>
        </van-row>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-row justify="space-between" class="group-head">
          <van-col span="12">
            <h2>热量</h2>
          </van-col>
          <van-col span="12">
            <div id="eating-part">每100克 可食部</div>
          </van-col>
        </van-row>
        <van-cell title="千卡"> 53 千卡</van-cell>
        <van-cell title="千焦"> {{ 55 * 4.184 }} 千焦</van-cell>
      </van-cell-group>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-row justify="space-between" class="group-head">
          <van-col span="24">
            <h2>血糖相关</h2>
          </van-col>
          <van-col span="24">
            <div id="explain-font">一型糖尿病患者更需关注热量和碳水含量</div>
          </van-col>
        </van-row>
        <van-cell title="GI"> 36</van-cell>
        <van-cell title="GL"> 4.9</van-cell>
      </van-cell-group>
    </div>
    <div class="cell-group last-group">
      <van-cell-group inset>
        <van-row justify="space-between" class="group-head">
          <van-col span="24">
            <h2>营养元素</h2>
          </van-col>
        </van-row>
        <van-row justify="center" id="circle">
          <van-col span="8">
            <div class="circle-box">
              <van-circle
                v-model:current-rate="carbCurrentRate"
                :rate="carbCurrentRate"
                :stroke-width="60"
                size="80px"
                color="#2f938f"
                layer-color="#ebedf0"
              >
                <template #default>
                  <div class="circle-inner-box">
                    <div class="circle-font-box">碳水</div>
                    <div class="circle-percent-box">{{ carbText }}</div>
                  </div>
                </template>
              </van-circle>
            </div>
          </van-col>
          <van-col span="8">
            <div class="circle-box">
              <van-circle
                v-model:current-rate="proteinCurrentRate"
                :rate="proteinCurrentRate"
                :stroke-width="60"
                size="80px"
                color="#f2ba4e"
                layer-color="#ebedf0"
              >
                <template #default>
                  <div class="circle-inner-box">
                    <div class="circle-font-box">脂肪</div>
                    <div class="circle-percent-box">{{ fatText }}</div>
                  </div>
                </template>
              </van-circle>
            </div>
          </van-col>
          <van-col span="8">
            <div class="circle-box">
              <van-circle
                v-model:current-rate="fatCurrentRate"
                :rate="fatCurrentRate"
                :stroke-width="60"
                size="80px"
                color="#f04d51"
                layer-color="#ebedf0"
              >
                <template #default>
                  <div class="circle-inner-box">
                    <div class="circle-font-box">蛋白质</div>
                    <div class="circle-percent-box">{{ proteinText }}</div>
                  </div>
                </template>
              </van-circle>
            </div>
          </van-col>
          <van-col span="24">
            <van-divider>三大营养元素供能比</van-divider>
          </van-col>
        </van-row>
        <van-cell title="热量"> 53千卡</van-cell>
        <van-cell title="蛋白质"> 0.4克</van-cell>
        <van-cell title="脂肪"> 0.2克</van-cell>
        <van-cell title="碳水化合物"> 13.7克</van-cell>
        <van-cell title="膳食纤维"> 0.2克</van-cell>
        <van-cell title="钠"> 0.2克</van-cell>
        <van-cell title="更多营养信息" is-link :to="toMoreDetailPage" />
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
