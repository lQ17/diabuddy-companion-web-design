<script setup>
import router from '@/router'
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { showToast } from '@/components/vantComponents'
import { useCarbCalFoodListStore } from '@/stores'
import { showConfirmDialog, showSuccessToast } from '@/components/vantComponents'
const route = useRoute()
const carbCalFoodListStore = useCarbCalFoodListStore()
const onClickLeft = () => history.back()
const showSelectWay = ref(false)
const selectDataBase = ref(false)
const selectManual = ref(false)
const changeCurrentValue = ref(false)
const searchInput = ref('')
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
const currentFoodCarb = computed(() => {
  return ((currentFood.value.foodWeight * currentFood.value.foodCarbPer100) / 100).toFixed(1)
})

//当前食物
const currentFood = ref({
  foodName: '',
  foodCarbPer100: null,
  foodWeight: null,
  foodFromDataBase: false,
  foodCarb: currentFoodCarb
})

//重置当前食物
const resetCurrentFood = () => {
  currentFood.value = {
    foodName: '',
    foodCarbPer100: null,
    foodWeight: null,
    foodFromDataBase: false,
    foodCarb: currentFoodCarb
  }
}

// 食物list
// const foodList = ref([])

//向食物list添加一项，并重置当前食物
const confirmAdd = (isFromDataBase) => {
  if (!currentFood.value.foodName || !currentFood.value.foodCarbPer100 || !currentFood.value.foodWeight) {
    showToast('请输入完整信息')
    return
  }
  if (isFromDataBase) {
    //自定义食物改true
    currentFood.value.foodFromDataBase = true
  }
  const foodToAdd = {
    ...currentFood.value,
    foodCarb: currentFoodCarb.value
  }

  //向食物list添加一项
  carbCalFoodListStore.addFood(foodToAdd)

  //重置当前食物
  resetCurrentFood()

  //关弹窗
  selectDataBase.value = false
  selectManual.value = false

  //再次显示搜索框
  isFinishedGetValueFromRoute.value = false
}

//取消添加
const cancelAdd = () => {
  //关弹窗
  selectDataBase.value = false
  selectManual.value = false
  //再次显示搜索框
  isFinishedGetValueFromRoute.value = false
}

//删一个
const onDelete = (id) => {
  carbCalFoodListStore.deleteFoodById(id)
}

//删所有
const onDeleteAll = () => {
  showConfirmDialog({
    title: '确认删除所有吗'
  })
    .then(() => {
      carbCalFoodListStore.resetFoodList()
      showSuccessToast('删除成功')
    })
    .catch(() => {})
}

const onSearch = () => {
  router.replace({ path: '/foodlist', query: { search: searchInput.value, fromCal: true } })
}

const isFinishedGetValueFromRoute = ref(false)

const addCurrentDietRecord = () => {
  //直接通过Store去记录,记录完成后，清除Store的foodList
  router.push('/record?isFromCarbCal=true')
}

onMounted(() => {
  // 从地址栏获取名字、碳水
  const queryFoodName = route.query.foodName
  const queryFoodCarbPer100 = route.query.foodCarbPer100
  if (queryFoodName && queryFoodCarbPer100) {
    //打开弹窗、赋值
    selectDataBase.value = true
    isFinishedGetValueFromRoute.value = true
    currentFood.value.foodName = queryFoodName
    currentFood.value.foodCarbPer100 = queryFoodCarbPer100
  }
})
</script>

<template>
  <!-- 碳水快算 -->
  <div class="page-container">
    <van-nav-bar title="碳水快算" left-text="返回" left-arrow @click-left="onClickLeft" fixed placeholder>
      <template #right>
        <van-icon name="delete-o" size="20" @click="onDeleteAll" v-if="carbCalFoodListStore.foodList.length > 0" />
      </template>
    </van-nav-bar>
    <div class="added-list">
      <van-cell-group inset class="show-added-food" @click="changeCurrentValue = true" v-for="food in carbCalFoodListStore.foodList" :key="food.id">
        <van-swipe-cell>
          <van-cell center>
            <template #title>
              <span class="custom-title">{{ food.foodName }}</span>
              <van-tag type="primary" v-if="food.foodFromDataBase">食物库</van-tag>
              <van-tag type="success" v-else>自定义</van-tag>
            </template>
            <template #label>
              <span class="custom-title">{{ food.foodCarbPer100 }}克/100克 </span>
              <van-tag type="warning">准备吃{{ food.foodWeight }}克</van-tag>
            </template>
            <template #value>
              <span class="custom-title">碳水量:</span>
              <van-tag type="primary" size="large" plain>{{ food.foodCarb }} 克</van-tag>
            </template>
          </van-cell>
          <template #right>
            <van-button square type="danger" text="删除" class="delete-btn" @click="onDelete(food.id)" />
          </template>
        </van-swipe-cell>
      </van-cell-group>
      <!-- 总计 -->
      <van-cell-group inset class="show-added-food" v-if="carbCalFoodListStore.foodList.length > 0">
        <van-cell center class="total-cell">
          <template #title>
            <van-tag type="warning" size="large" plain>总计</van-tag>
          </template>
          <template #value>
            <span class="custom-title">碳水总计:</span>
            <van-tag type="warning" size="large" plain>{{ carbCalFoodListStore.totalCarb }} 克</van-tag>
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
      <van-action-sheet v-model:show="selectDataBase" title="从食物库获取" position="bottom">
        <div class="content">
          <div class="search-food" v-if="!isFinishedGetValueFromRoute">
            <van-cell-group inset>
              <form action="/">
                <van-search v-model="searchInput" show-action placeholder="请输入搜索关键词" @search="onSearch" />
              </form>
            </van-cell-group>
          </div>
          <div v-else>
            <div class="show-selected-food">
              <van-cell-group inset class="show-added-food">
                <van-cell center>
                  <template #title>
                    <span class="custom-title">{{ currentFood.foodName }}</span>
                  </template>
                  <template #label>
                    <span class="custom-title">{{ currentFood.foodCarbPer100 }}克/100克 </span>
                  </template>
                </van-cell>
              </van-cell-group>
            </div>
            <div class="input-weight-box">
              <van-cell-group inset>
                <van-field v-model="currentFood.foodWeight" label="请输入重量" placeholder="单位：克" type="number" />
              </van-cell-group>
            </div>
          </div>
          <div class="select-database-btn">
            <van-row>
              <van-col span="12">
                <div class="confirm-btn">
                  <van-button type="primary" @click="confirmAdd(true)">确认添加</van-button>
                </div>
              </van-col>
              <van-col span="12">
                <div class="cancel-btn">
                  <van-button type="default" @click="cancelAdd">取消添加</van-button>
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
      </van-action-sheet>
      <!-- 自定义食物 -->
      <van-action-sheet v-model:show="selectManual" title="自定义食物" position="bottom">
        <div class="content">
          <van-cell-group inset class="select-manual-cell">
            <van-field v-model="currentFood.foodName" label="食物" placeholder="请输入名称" />
          </van-cell-group>
          <van-cell-group inset class="select-manual-cell">
            <van-field v-model="currentFood.foodWeight" label="重量" type="number" placeholder="单位：克" />
          </van-cell-group>
          <van-cell-group inset class="select-manual-cell">
            <van-field v-model="currentFood.foodCarbPer100" label="碳水含量" type="number" placeholder="单位：克/100克" />
          </van-cell-group>
          <div class="select-database-btn">
            <van-row>
              <van-col span="12">
                <div class="confirm-btn">
                  <van-button type="primary" @click="confirmAdd(false)">确认添加</van-button>
                </div>
              </van-col>
              <van-col span="12">
                <div class="cancel-btn">
                  <van-button type="default" @click="cancelAdd">取消添加</van-button>
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
      </van-action-sheet>
    </div>
    <div class="add-btn">
      <div id="tip-box">*左滑删除指定项，右上角图标清除所有</div>
      <van-button type="primary" block @click="showSelectWay = true">添加食物</van-button>
      <div class="update-box">
        <van-button type="success" block @click="addCurrentDietRecord()">同步到饮食记录</van-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#tip-box {
  text-align: center;
  font-size: 15px;
  color: #808080;
  margin-bottom: 10px;
}
.delete-btn {
  height: 100%;
}
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
