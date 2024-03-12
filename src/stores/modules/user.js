import { userGetInfoService } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'diabuddy-user',
  () => {
    const token = ref('')

    const setToken = (newToken) => {
      token.value = newToken
    }

    const removeToken = () => {
      token.value = ''
    }

    const user = ref({})

    const getUser = async () => {
      const res = await userGetInfoService(user.value.id)
      user.value = res.data.data
    }
    const setUser = (obj) => {
      user.value = obj
    }
    const setUserId = (id) => {
      user.value.id = id
    }

    return {
      token,
      user,
      setToken,
      removeToken,
      getUser,
      setUser,
      setUserId
    }
  },
  {
    persist: true
  }
)
