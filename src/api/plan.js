import request from '@/utils/request'

//获取用户医疗信息
export const planUserMedicalInfo = (userId) => {
  return request.get(`/user/medical-info/${userId}`)
}

//修改用户所有数据(改没改都重新覆盖一遍)
export const planUserUpdateMedicalInfo = (data) => {
  const {
    userId,
    tdd,
    icr,
    isf,
    dayEatingEnergy,
    dayEatingCarb,
    dayEatingProtein,
    dayEatingFat,
    treatmentOption,
    remark,
    insulinPump,
    preMealAndBasal,
    premixed,
    agent
  } = data

  let treatmentData = {}

  switch (treatmentOption) {
    case 'plan_insulin_pump':
      treatmentData.insulinPump = insulinPump
      break
    case 'plan_pre_meal_and_basal':
      treatmentData.preMealAndBasal = preMealAndBasal
      break
    case 'plan_premixed':
      treatmentData.premixed = premixed
      break
    default:
      break
  }

  const payload = {
    userId,
    tdd,
    icr,
    isf,
    dayEatingEnergy,
    dayEatingCarb,
    dayEatingProtein,
    dayEatingFat,
    treatmentOption,
    remark,
    ...treatmentData,
    agent
  }

  return request.post('/user/medical-info', payload)
}

export const planUserGetTDD = (userId) => {
  return request.get(`/plan/tdd/${userId}`)
}

//用户添加TDD
// export const planUserAddTDDService = (userId, tdd) => {
//   return request.post('/plan/tdd', {
//     userId,
//     tdd
//   })
// }

//用户添加ICR
// export const planUserAddICRService = (userId, icr) => {
//   return request.post('/plan/icr', {
//     userId,
//     icr
//   })
// }

//用户添加ISF
// export const planUserAddISFService = (userId, isf) => {
//   return request.post('/plan/isf', {
//     userId,
//     isf
//   })
// }

//用户添加DayEating
// export const planUserAddDayEatingService = (userId, dayEatingEnergy, dayEatingCarb, dayEatingProtein, dayEatingFat) => {
//   return request.post('/plan/day-eating', {
//     userId,
//     dayEatingEnergy,
//     dayEatingCarb,
//     dayEatingProtein,
//     dayEatingFat
//   })
// }

//用户更新TDD
export const planUserUpdateTDDService = (userId, tdd) => {
  return request.post('/plan/tdd', {
    userId,
    tdd
  })
}

//用户更新ICR
export const planUserUpdateICRService = (userId, icr) => {
  return request.post('/plan/icr', {
    userId,
    icr
  })
}

//用户更新ISF
export const planUserUpdateISFService = (userId, isf) => {
  return request.post('/plan/isf', {
    userId,
    isf
  })
}

//用户更新DayEating
export const planUserUpdateDayEatingService = (userId, dayEatingEnergy, dayEatingCarb, dayEatingProtein, dayEatingFat) => {
  return request.post('/plan/day-eating', {
    userId,
    dayEatingEnergy,
    dayEatingCarb,
    dayEatingProtein,
    dayEatingFat
  })
}

//用户添加、更新胰岛素分段(屎山也是山！！！)
export const planUserAddPumpBasalRateService = (userId, v0, v1, v2, v3, v4, v5) => {
  return request.post('/plan/pump-basal-rate', {
    userId,
    rate0000: v0,
    rate0030: v0,
    rate0100: v0,
    rate0130: v0,
    rate0200: v0,
    rate0230: v0,
    rate0300: v1,
    rate0330: v1,
    rate0400: v1,
    rate0430: v1,
    rate0500: v1,
    rate0530: v1,
    rate0600: v1,
    rate0630: v1,
    rate0700: v1,
    rate0730: v1,
    rate0800: v1,
    rate0830: v1,
    rate0900: v2,
    rate0930: v2,
    rate1000: v2,
    rate1030: v2,
    rate1100: v2,
    rate1130: v2,
    rate1200: v3,
    rate1230: v3,
    rate1300: v3,
    rate1330: v3,
    rate1400: v3,
    rate1430: v3,
    rate1500: v3,
    rate1530: v3,
    rate1600: v4,
    rate1630: v4,
    rate1700: v4,
    rate1730: v4,
    rate1800: v4,
    rate1830: v4,
    rate1900: v4,
    rate1930: v4,
    rate2000: v5,
    rate2030: v5,
    rate2100: v5,
    rate2130: v5,
    rate2200: v5,
    rate2230: v5,
    rate2300: v5,
    rate2330: v5
  })
}

//获取用户胰岛素分段
export const planUserCheckPumpBasalRateService = (userId) => {
  return request.get(`/plan/pump-basal-rate-manual/${userId}`)
}

//用户更新胰岛素分段
/**
 {
  userId,
  rate0000,
  rate0030,
  rate0100,
  rate0130,
  rate0200,
  rate0230,
  rate0300,
  rate0330,
  rate0400,
  rate0430,
  rate0500,
  rate0530,
  rate0600,
  rate0630,
  rate0700,
  rate0730,
  rate0800,
  rate0830,
  rate0900,
  rate0930,
  rate1000,
  rate1030,
  rate1100,
  rate1130,
  rate1200,
  rate1230,
  rate1300,
  rate1330,
  rate1400,
  rate1430,
  rate1500,
  rate1530,
  rate1600,
  rate1630,
  rate1700,
  rate1730,
  rate1800,
  rate1830,
  rate1900,
  rate1930,
  rate2000,
  rate2030,
  rate2100,
  rate2130,
  rate2200,
  rate2230,
  rate2300,
  rate2330
}
 */
export const planUserAddPumpBasalRateManualService = (data) => {
  return request.post('/plan/pump-basal-rate-manual', data)
}
