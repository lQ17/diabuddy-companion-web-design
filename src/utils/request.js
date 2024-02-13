import { useUserStore } from '@/stores'
import axios from 'axios'
import router from '@/router'
import { showFailToast } from 'vant'
import 'vant/es/toast/style'

const baseURL = 'http://127.0.0.1:4523/m1/3928753-0-default'

const instance = axios.create({
  baseURL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    //发送请求时，设置请求体头部的Authorization为本地存储的token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 1) {
      return res
    }
    showFailToast({ message: res.data.message || '服务异常', type: 'error' })
    return Promise.reject(res.data)
  },
  (err) => {
    showFailToast({ message: err.response.data.message || '服务异常', type: 'error' })
    console.log(err)
    if (err.response?.status === 401) {
      router.push('/login')
    }
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
