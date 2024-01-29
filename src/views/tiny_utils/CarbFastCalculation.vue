<script setup>
import { ref } from 'vue'
const onClickLeft = () => history.back()
const showSelectWay = ref(false)
const selectDataBase = ref(false)
const selectManual = ref(false)
const actions = [
  { name: '从食物库获取', value: 1 },
  { name: '自定义食物', value: 2 }
]
const onSelect = (item) => {
  showSelectWay.value = false
  // 从食物库获取
  if (item.value === 1) {
    selectDataBase.value = true
  }
  // 自定义食物
  if (item.value === 2) {
    selectManual.value = true
  }
}

// 从食物库中选择的食物
// const selectedFood = ref(null)
const selectedFoodWeight = ref()
</script>

<template>
  <!-- 碳水快算 -->
  <div class="page-container">
    <van-nav-bar title="碳水快算" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="added-list">
      <van-cell-group inset class="show-added-food" @click="selectManual = true">
        <van-swipe-cell>
          <template #right>
            <span class="custom-title">苹果</span>
          </template>
          <template #label>
            <span class="custom-title">12克/100克 </span>
            <van-tag type="primary">100克</van-tag>
          </template>
          <template #value>
            <span class="custom-title">碳水量:</span>
            <van-tag type="primary" size="large" plain>16 克</van-tag>
          </template>
        </van-swipe-cell>
      </van-cell-group>

      <van-cell-group inset class="show-added-food" @click="selectManual = true">
        <van-cell center>
          <template #title>
            <span class="custom-title">苹果</span>
          </template>
          <template #label>
            <span class="custom-title">12克/100克 </span>
            <van-tag type="primary">100克</van-tag>
          </template>
          <template #value>
            <span class="custom-title">碳水量:</span>
            <van-tag type="primary" size="large" plain>16 克</van-tag>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group inset class="show-added-food" @click="selectManual = true">
        <van-cell center>
          <template #title>
            <span class="custom-title">燕麦</span>
            <van-tag type="success">自定义食物</van-tag>
          </template>
          <template #label>
            <span class="custom-title">46克/100克 </span>
            <van-tag type="primary">50克</van-tag>
          </template>
          <template #value>
            <span class="custom-title">碳水量:</span>
            <van-tag type="primary" size="large" plain>23 克</van-tag>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group inset class="show-added-food" @click="selectManual = true">
        <van-cell center class="total-cell">
          <template #title>
            <van-tag type="warning" size="large" plain>总计</van-tag>
          </template>
          <template #value>
            <span class="custom-title">总计:</span>
            <van-tag type="warning" size="large" plain>39 克</van-tag>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <!-- 选择添加方式的弹窗 -->
    <div class="select-add-way">
      <van-action-sheet v-model:show="showSelectWay" :actions="actions" @select="onSelect" cancel-text="取消" />
    </div>
    <!-- 两种添加方式的弹窗都在这个div中 -->
    <div class="add-box">
      <!-- 从食物库获取 --- 搜索后跳转到查询列表 -->
      <van-action-sheet v-model:show="selectDataBase" title="从食物库获取" position="top">
        <div class="content">
          <div class="search-food">
            <van-cell-group inset>
              <form action="/">
                <van-search v-model="selectInput" show-action placeholder="请输入搜索关键词" @search="onSearch" />
              </form>
            </van-cell-group>
          </div>
          <div class="show-selected-food">
            <van-cell-group inset class="show-added-food" @click="selectManual = true">
              <van-cell center>
                <template #title>
                  <span class="custom-title">燕麦</span>
                </template>
                <template #label>
                  <span class="custom-title">46克/100克 </span>
                  <van-tag type="primary">50克</van-tag>
                </template>
                <template #value>
                  <span class="custom-title">碳水量:</span>
                  <van-tag type="primary" size="large" plain>23 克</van-tag>
                </template>
              </van-cell>
            </van-cell-group>
          </div>
          <div class="input-weight-box">
            <van-cell-group inset>
              <van-field v-model="selectedFoodWeight" label="请输入重量" placeholder="单位：克" type="number" />
            </van-cell-group>
          </div>
          <div class="select-database-btn">
            <van-row>
              <van-col span="12">
                <div class="confirm-btn">
                  <van-button type="primary">确认添加</van-button>
                </div>
              </van-col>
              <van-col span="12">
                <div class="cancel-btn">
                  <van-button type="default">取消添加</van-button>
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
      </van-action-sheet>
      <!-- 自定义食物 -->
      <van-action-sheet v-model:show="selectManual" title="自定义食物" position="top">
        <div class="content">
          <van-cell-group inset class="select-manual-cell">
            <van-field v-model="value" label="食物" placeholder="请输入名称" />
          </van-cell-group>
          <van-cell-group inset class="select-manual-cell">
            <van-field v-model="value" label="重量" type="number" placeholder="单位：克" />
          </van-cell-group>
          <van-cell-group inset class="select-manual-cell">
            <van-field v-model="value" label="碳水含量" type="number" placeholder="单位：克/100克" />
          </van-cell-group>
          <div class="select-database-btn">
            <van-row>
              <van-col span="12">
                <div class="confirm-btn">
                  <van-button type="primary">确认添加</van-button>
                </div>
              </van-col>
              <van-col span="12">
                <div class="cancel-btn">
                  <van-button type="default">取消添加</van-button>
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
      </van-action-sheet>
    </div>
    <div class="add-btn">
      <van-button type="primary" block @click="showSelectWay = true">添加食物</van-button>
      <div class="update-box">
        <van-button type="success" block>同步到饮食记录</van-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.update-box {
  margin-top: 10px;
}
.select-manual-cell {
  margin-bottom: 10px;
}
.cancel-btn {
  text-align: center;
  margin-left: -30px;
}
.confirm-btn {
  text-align: center;
  margin-right: -30px;
}
.select-database-btn {
  margin-top: 30px;
}
.input-weight-box {
  margin-top: 10px;
}
.add-btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
}
.content {
  padding: 16px 16px 32px;
  background: #f6f7fb;
}
.show-added-food {
  margin-top: 10px;
}
.custom-title {
  margin-right: 4px;
  vertical-align: middle;
}
.page-container {
  min-height: 100vh;
  background: #f6f7fb;
  padding-bottom: 50px; /* 为底部按钮留出空间 */
}
</style>
