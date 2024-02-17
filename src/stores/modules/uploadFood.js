import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
//存到session中了
export const useUploadFoodStore = defineStore(
  'diabuddy-upload-food',
  () => {
    // 表单数据，初始化为空字符串或默认值
    const foodName = ref('')
    const foodCategoryStr = ref('')
    const foodCategory = computed(() => {
      return foodCategoryStr.value.split(' : ')[0] || '' // 拆解并获取左侧字符，如果没有则默认为空字符串
    })

    const foodTinyCategory = computed(() => {
      return foodCategoryStr.value.split(' : ')[1] || '' // 拆解并获取右侧字符，如果没有则默认为空字符串
    })
    const isPublicFood = ref(false)
    const isPackedFood = ref(false)
    const weightValue = ref(100)
    const brandName = ref('')
    const energyUnit = ref('1')
    const energy = ref()
    const carb = ref()
    const protein = ref()
    const fat = ref()
    const sodium = ref()
    const foodPic = ref([[], [], []])
    //细节
    const glycemicIndex = ref()
    const glycemicLoad = ref()
    const ediblePart = ref()
    const water = ref()
    const ash = ref()
    const carbohydrates = ref()
    const dietaryFiber = ref()
    const carotene = ref()
    const vitaminA = ref()
    const alphaTe = ref()
    const thiamin = ref()
    const riboflavin = ref()
    const niacin = ref()
    const vitaminC = ref()
    const calcium = ref()
    const phosphorus = ref()
    const potassium = ref()
    const magnesium = ref()
    const iron = ref()
    const zinc = ref()
    const selenium = ref()
    const copper = ref()
    const manganese = ref()
    const iodine = ref()
    const saturatedFattyAcids = ref()
    const monounsaturatedFattyAcids = ref()
    const polyunsaturatedFattyAcids = ref()
    const totalFattyAcids = ref()

    const state = {
      foodPic,
      foodName,
      foodCategoryStr,
      foodCategory,
      foodTinyCategory,
      brandName,
      isPublicFood,
      isPackedFood,
      energyUnit,
      energy,
      carb,
      protein,
      fat,
      sodium,
      weightValue,
      glycemicIndex,
      glycemicLoad,
      ediblePart,
      water,
      ash,
      carbohydrates,
      dietaryFiber,
      carotene,
      vitaminA,
      alphaTe,
      thiamin,
      riboflavin,
      niacin,
      vitaminC,
      calcium,
      phosphorus,
      potassium,
      magnesium,
      iron,
      zinc,
      selenium,
      copper,
      manganese,
      iodine,
      saturatedFattyAcids,
      monounsaturatedFattyAcids,
      polyunsaturatedFattyAcids,
      totalFattyAcids
    }
    // 通用更新函数
    const updateField = (fieldName, value) => {
      if (fieldName in state) {
        state[fieldName].value = value
      }
    }
    const resetData = () => {
      Object.keys(state).forEach((key) => {
        if (key === 'energyUnit') {
          state[key].value = '1'
        } else if (key === 'weightValue') {
          state[key].value = 100
        } else if (key === 'isPublicFood' || key === 'isPackedFood') {
          state[key].value = false
        } else if (key === 'foodName' || key === 'foodCategoryStr') {
          state[key].value = ''
        } else if (key === 'foodPic') {
          state[key].value = [[], [], []]
        } else if (key === 'foodCategory' || key === 'foodTinyCategory') {
          return
        } else {
          state[key].value = null
        }
      })
      sessionStorage.removeItem('diabuddy-upload-food')
    }

    // 把属性和方法暴露出去
    return {
      ...state,
      updateField,
      resetData
    }
  },
  {
    persist: {
      storage: sessionStorage
    }
  }
)
