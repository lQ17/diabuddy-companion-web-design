import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useHistoryListStore = defineStore(
  'diabuddy-historyList',
  () => {
    const historyList = ref([])

    const reversedHistoryList = computed(() => {
      return historyList.value.slice().reverse()
    })
    // 清空历史记录
    const clearHistory = () => {
      historyList.value = []
    }

    // 删除指定的历史记录项
    const deleteHistoryItem = (index) => {
      if (index >= 0 && index < historyList.value.length) {
        historyList.value.splice(index, 1)
      }
    }

    // 删除historyList的第一个元素，其他元素索引向前移动1
    const removeFirstHistoryItem = () => {
      if (historyList.value.length > 0) {
        historyList.value.shift() // 移除数组的第一个元素
      }
    }

    // 增加历史记录项
    const addHistoryItem = (newItem) => {
      // 检查历史记录中是否已存在该项
      const existingIndex = historyList.value.indexOf(newItem)
      if (existingIndex !== -1) {
        // 如果存在，则先删除
        historyList.value.splice(existingIndex, 1)
      }
      // 如果历史记录达到上限，则删除最早的记录
      if (historyList.value.length >= 40) {
        removeFirstHistoryItem() // 调用上面定义的方法
      }
      // 将新项添加到数组末尾
      historyList.value.push(newItem)
    }

    // 把属性和方法暴露出去
    return {
      historyList,
      reversedHistoryList,
      addHistoryItem,
      clearHistory,
      deleteHistoryItem
    }
  },
  {
    persist: true
  }
)
