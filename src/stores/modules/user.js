import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('diabuddy-user', () => {
  // 设置token
  const token = ref('')

  // 设置token
  const setToken = (newToken) => {
    token.value = newToken
  }

  // 移除token
  const removeToken = () => {
    token.value = ''
  }

  // 把属性和方法暴露出去
  return {
    token,
    setToken,
    removeToken
  }
})
