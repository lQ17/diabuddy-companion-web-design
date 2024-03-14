import request from '@/utils/request'

const formatDateToISO = (dateString) => {
  // 假设dateString的格式是"yyyy-MM-dd HH:mm:ss"
  // 将日期字符串转换为Date对象
  const parts = dateString.match(/(\d+)/g)
  let date = new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5])

  // 转换为ISO 8601格式的字符串
  return date.toISOString()
}

//获取选中类型记录-分页
export const recordGetList = ({ userId, recordType, page, pageSize, startTime, endTime }) => {
  const queryParams = new URLSearchParams()

  // 检查并添加非空且非undefined的参数
  if (userId != null && userId !== '') queryParams.append('userId', userId)
  if (recordType != null && recordType !== '') queryParams.append('recordType', recordType)
  if (page != null && page !== '') queryParams.append('page', page)
  if (pageSize != null && pageSize !== '') queryParams.append('pageSize', pageSize)
  if (startTime != null && startTime !== '') queryParams.append('startTime', startTime)
  if (endTime != null && endTime !== '') queryParams.append('endTime', endTime)

  return request.get(`/record/list?${queryParams.toString()}`)
}

//首页-获取五条记录
export const recordGetFiveRecordsService = (userId) => {
  return request.get(`/record/get-5-records/${userId}`)
}

//根据recordRootId获得一条记录
export const recordGetDetailService = (recordRootId) => {
  return request.get(`/record/detail/${recordRootId}`)
}

//获取该用户今天最后一次血糖值
export const recordGetUserTodayLastBloodSugar = (userId) => {
  return request.get(`/record/user-today-last-blood-sugar/${userId}`)
}

//添加血糖记录
export const recordAddBloodSugarService = ({ userId, bloodSugarValue, measureTime, recordTime, remark }) => {
  recordTime = formatDateToISO(recordTime)
  return request.post('/record/blood-sugar', { userId, bloodSugarValue, measureTime, recordTime, remark })
}

//添加运动记录
export const recordAddExerciseService = ({ userId, exerciseType, duration, recordTime, remark }) => {
  recordTime = formatDateToISO(recordTime)
  return request.post('/record/exercise', { userId, exerciseType, duration, recordTime, remark })
}

//添加注射记录
export const recordAddInjectionService = ({ userId, injectionType, insulinType, bolus, recordTime, remark, squareWaveRate, squareWaveTime }) => {
  recordTime = formatDateToISO(recordTime)
  return request.post('/record/injection', { userId, injectionType, insulinType, bolus, recordTime, remark, squareWaveRate, squareWaveTime })
}

//添加用药记录
export const recordAddAgentService = ({ userId, agentName, dosage, recordTime, remark }) => {
  recordTime = formatDateToISO(recordTime)
  return request.post('/record/agent', { userId, agentName, dosage, recordTime, remark })
}

//添加饮食记录
export const recordAddDietService = ({
  userId,
  foodDetail,
  foodPic,
  mealType,
  totalCarb,
  totalProtein,
  totalFat,
  totalEnergy,
  recordTime,
  remark
}) => {
  recordTime = formatDateToISO(recordTime)
  return request.post('/record/diet', { userId, foodDetail, foodPic, mealType, totalCarb, totalProtein, totalFat, totalEnergy, recordTime, remark })
}

//查询该用户最后一次运动类型
export const recordCheckUserLastExerciseService = ({ userId }) => {
  return request.get(`/record/user-last-exercise-type/${userId}`)
}

//查询该用户最后一次胰岛素类型和注射方式
export const recordCheckUserLastInjetcioService = ({ userId }) => {
  return request.get(`/record/user-last-injection-type/${userId}`)
}

//查询该用户最后一次用药药名
export const recordCheckUserLastAgentService = ({ userId }) => {
  return request.get(`/record/user-last-agent/${userId}`)
}

// 按recordRootId删除记录
export const recordDeleteService = (recordRootId) => {
  return request.delete(`/record/delete/${recordRootId}`)
}

// 修改用药记录
export const recordUpdateAgentService = ({ id, userId, dosage, agentName, recordTime, remark }) => {
  recordTime = formatDateToISO(recordTime)
  const data = {
    userId,
    dosage,
    agentName,
    recordTime,
    remark
  }
  return request.put(`/record/agent/${id}`, data)
}

// 修改血糖记录
export const recordUpdateBloodSugarService = ({ id, userId, bloodSugarValue, measureTime, recordTime, remark }) => {
  recordTime = formatDateToISO(recordTime)
  const data = {
    userId,
    bloodSugarValue,
    measureTime,
    recordTime,
    remark
  }
  return request.put(`/record/blood-sugar/${id}`, data)
}

// 修改饮食记录
export const recordUpdateDietService = ({
  id,
  userId,
  foodDetail,
  foodPic,
  mealType,
  totalCarb,
  totalFat,
  totalEnergy,
  totalProtein,
  recordTime,
  remark
}) => {
  recordTime = formatDateToISO(recordTime)
  const data = {
    userId,
    foodDetail,
    foodPic,
    mealType,
    totalCarb,
    totalFat,
    totalEnergy,
    totalProtein,
    recordTime,
    remark
  }
  return request.put(`/record/diet/${id}`, data)
}

// 修改运动记录
export const recordUpdateExerciseService = ({ id, userId, exerciseType, duration, recordTime, remark }) => {
  recordTime = formatDateToISO(recordTime)
  const data = {
    userId,
    exerciseType,
    duration,
    recordTime,
    remark
  }

  return request.put(`/record/exercise/${id}`, data)
}

// 修改注射记录
export const recordUpdateInjectionService = ({
  id,
  userId,
  injectionType,
  insulinType,
  bolus,
  squareWaveRate,
  squareWaveTime,
  recordTime,
  remark
}) => {
  recordTime = formatDateToISO(recordTime)
  const data = {
    userId,
    injectionType,
    insulinType,
    bolus,
    squareWaveRate,
    squareWaveTime,
    recordTime,
    remark
  }
  return request.put(`/record/injection/${id}`, data)
}
