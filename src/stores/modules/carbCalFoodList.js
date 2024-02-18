import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCarbCalFoodListStore = defineStore(
  'carbCalFoodList',
  () => {
    const foodList = ref([])

    // 向食物列表添加一项，同时生成一个随机ID
    const addFood = (food) => {
      const foodWithId = {
        ...food,
        id: Date.now().toString() + Math.random().toString().substring(2, 10) // 生成一个基于时间和随机数的ID
      }
      foodList.value.push(foodWithId)
    }

    // 根据指定id删除食物项
    const deleteFoodById = (id) => {
      const index = foodList.value.findIndex((food) => food.id === id)
      if (index !== -1) {
        foodList.value.splice(index, 1)
      }
    }

    // 重置食物列表
    const resetFoodList = () => {
      foodList.value = []
    }

    const totalCarb = computed(() => {
      // 检查 foodList 是否为空
      if (foodList.value.length === 0) {
        return 0
      }

      // 使用 reduce 方法累加每一项的 foodCarb
      const total = foodList.value.reduce((acc, foodItem) => {
        const carbValue = parseFloat(foodItem.foodCarb) || 0
        return acc + carbValue
      }, 0)

      return total.toFixed(1)
    })

    return {
      deleteFoodById,
      totalCarb,
      foodList,
      addFood,
      resetFoodList
    }
  },
  {
    persist: {
      storage: sessionStorage
    }
  }
)
