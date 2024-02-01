import { defineStore } from 'pinia'
import { ref } from 'vue'
//存到session中了
export const useUploadFoodStore = defineStore(
  'diabuddy-upload-food',
  () => {
    // 表单数据，初始化为空字符串或默认值
    const foodName = ref('')
    const foodCategory = ref('')
    const isPublicFood = ref(false)
    const isPackedFood = ref(false)
    const weightValue = ref(100)
    const brandName = ref('')
    const energyUnit = ref('1')
    const energyValue = ref()
    const carbValue = ref()
    const proteinValue = ref()
    const fatValue = ref()
    const sodiumValue = ref()
    const uploadFoodPhotoValue = ref()
    const uploadNutritionPhotoValue = ref()
    const uploadIngredientPhotoValue = ref()
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
      uploadFoodPhotoValue,
      uploadNutritionPhotoValue,
      uploadIngredientPhotoValue,
      foodName,
      foodCategory,
      brandName,
      isPublicFood,
      isPackedFood,
      energyUnit,
      energyValue,
      carbValue,
      proteinValue,
      fatValue,
      sodiumValue,
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
      // const arr = Object.keys(state)
      Object.keys(state).forEach((key) => {
        if (key === 'energyUnit') {
          state[key].value = '1'
        }
        if (key === 'weightValue') {
          state[key].value = 100
        }
        if (key === 'isPublicFood' || key === 'isPackedFood') {
          state[key].value = false
        }
        if (key === 'foodName' || key === 'foodName' || key === 'foodCategory') {
          state[key].value = ''
        }
        state[key].value = null
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
