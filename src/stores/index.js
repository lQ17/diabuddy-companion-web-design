import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

// 接收相应模块的按需导出

export * from './modules/uploadFood'
// export * from './modules/user'
