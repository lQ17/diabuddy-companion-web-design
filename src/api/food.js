import request from '@/utils/request'

//根据不同条件获取列表
export const foodGetListService = ({ foodCategory, foodTinyCategory, foodName }) => {
  const queryParams = new URLSearchParams()

  // 仅为非空和非undefined的参数添加到查询字符串
  if (foodCategory) queryParams.set('foodCategory', foodCategory)
  if (foodTinyCategory) queryParams.set('foodTinyCategory', foodTinyCategory)
  if (foodName) queryParams.set('foodName', foodName)

  // 构建查询字符串
  const queryString = queryParams.toString()
  return request.get(`/food/list?${queryString}`)
}

//根据id获取食物详细信息(单个食物详情页)
export const foodGetDetailService = (foodId) => {
  return request.get(`/food/detail/${foodId}`)
}

//根据id获取食物的所有营养数据(单个食物的完全信息页)
export const foodGetTotalDetailService = (foodId) => {
  return request.get(`/food/total-detail/${foodId}`)
}

//获取用户收藏的食物列表
export const foodGetUserFavoriteListService = (userId) => {
  return request.get(`/food/favorite-list/${userId}`)
}

//查询用户是否收藏该食物
export const foodGetUserFavoriteService = (userId, foodId) => {
  return request.get(`/food/favorite/${userId}/${foodId}`)
}

//用户添加收藏
export const foodAddUserFavoriteService = (userId, foodId) => {
  return request.post('/food/favorite', {
    userId,
    foodId
  })
}

//用户取消收藏
export const foodDeleteUserFavoriteService = (userId, foodId) => {
  return request.delete(`/food/favorite/${userId}/${foodId}`)
}

//用户上传食物
export const foodUserAddFoodService = (food) => {
  return request.post('/food/add', {
    food
  })
}
