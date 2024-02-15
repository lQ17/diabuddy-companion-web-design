import request from '@/utils/request'

//根据类、子类获取列表
export const foodGetListByCategoryAndTinyService = (category, tinyCategory) => {
  const queryParams = new URLSearchParams({
    category,
    tinyCategory
  }).toString()
  return request.get(`/food/list?${queryParams}`)
}
