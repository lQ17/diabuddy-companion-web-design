import request from '@/utils/request'

// 邮箱注册接口
export const userRegisterByEmailService = (email, password, repassword, emailMsg) => {
  return request.post('/user/register-by-email', {
    email,
    password,
    repassword,
    emailMsg
  })
}

// 手机号注册接口
export const userRegisterByPhoneService = (phone, password, repassword) => {
  return request.post('/user/register-by-phone', {
    phone,
    password,
    repassword
  })
}

// 密码登录接口
export const userLoginByPasswordService = (EmailOrPhone, password) => {
  if (EmailOrPhone.includes('@') && EmailOrPhone.includes('.')) {
    return request.post('/user/login-by-email-password', {
      EmailOrPhone,
      password
    })
  } else {
    return request.post('/user/login-by-phone-password', {
      EmailOrPhone,
      password
    })
  }
}

//手机验证码登录接口
export const userLoginBySmsService = (phone, sms) => {
  return request.post('/user/login-by-sms', {
    phone,
    sms
  })
}

// 获取手机验证码的请求
export const userGetSmsService = (phone) => {
  return request.post('/user/get-sms', {
    phone
  })
}

// 获取邮箱验证码接口
export const userGetEamilMsgService = (email) => {
  return request.post('/user/get-email-msg', {
    email
  })
}

// 获取用户信息
export const userGetInfoService = () => {
  return request.get('/user/info')
}
