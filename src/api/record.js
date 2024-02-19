import request from '@/utils/request'

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

//添加血糖记录
export const recordAddBloodSugarService = ({ userId, bloodSugarValue, measureTime, recordTime, remark }) => {
  return request.post('/record/blood-sugar', { userId, bloodSugarValue, measureTime, recordTime, remark })
}

//添加运动记录
export const recordAddExerciseService = ({ userId, exerciseType, duration, recordTime, remark }) => {
  return request.post('/record/exercise', { userId, exerciseType, duration, recordTime, remark })
}

//添加注射记录
export const recordAddInjectionService = ({ userId, injectionType, insulinType, bolus, recordTime, remark, squareWaveRate, squareWaveTime }) => {
  return request.post('/record/injection', { userId, injectionType, insulinType, bolus, recordTime, remark, squareWaveRate, squareWaveTime })
}

//添加用药记录
export const recordAddAgentService = ({ userId, agentName, dosage, recordTime, remark }) => {
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

// 按id删除记录
export const recordDeleteService = (recordId) => {
  return request.delete(`/record/delete/${recordId}`)
}
