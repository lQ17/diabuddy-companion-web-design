import { useUserStore } from '@/stores'
import axios from 'axios'
import router from '@/router'
import { showFailToast } from 'vant'
import 'vant/es/toast/style'
import _ from 'lodash'

const baseURL = 'http://127.0.0.1:4523/m1/3928753-0-default'

const instance = axios.create({
  baseURL,
  timeout: 10000
})

// 使用lodash的camelCase将字符串从snake_case转换为camelCase
function toCamelCase(str) {
  return _.camelCase(str)
}

// 递归地将对象键从snake_case转换为camelCase
function keysToCamelCase(object) {
  if (_.isObject(object)) {
    if (_.isArray(object)) {
      return object.map(keysToCamelCase)
    } else {
      return _.mapValues(
        _.mapKeys(object, (value, key) => toCamelCase(key)),
        keysToCamelCase
      )
    }
  }
  return object
}

// 使用lodash的snakeCase将字符串从camelCase转换为snake_case
function toSnakeCase(str) {
  return _.snakeCase(str)
}

// 递归地将对象键从camelCase转换为snake_case
function keysToSnakeCase(object) {
  if (_.isObject(object)) {
    if (_.isArray(object)) {
      return object.map(keysToSnakeCase)
    } else {
      return _.mapValues(
        _.mapKeys(object, (value, key) => toSnakeCase(key)),
        keysToSnakeCase
      )
    }
  }
  return object
}

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    //发送请求时，设置请求体头部的Authorization为本地存储的token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    if (config.data) {
      config.data = keysToSnakeCase(config.data)
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    res.data = keysToCamelCase(res.data)
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
