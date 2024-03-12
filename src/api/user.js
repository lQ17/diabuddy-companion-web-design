import request from '@/utils/request'
import CryptoJS from 'crypto-js'

// 邮箱注册接口
export const userRegisterByEmailService = (email, passwordNoMD5, repasswordNoMD5, emailMsg) => {
  const password = CryptoJS.MD5(passwordNoMD5).toString()
  const repassword = CryptoJS.MD5(repasswordNoMD5).toString()
  return request.post('/user/register-by-email', {
    email,
    password,
    repassword,
    emailMsg
  })
}

// 手机号注册接口
export const userRegisterByPhoneService = (phone, passwordNoMD5, repasswordNoMD5) => {
  const password = CryptoJS.MD5(passwordNoMD5).toString()
  const repassword = CryptoJS.MD5(repasswordNoMD5).toString()
  return request.post('/user/register-by-phone', {
    phone,
    password,
    repassword
  })
}

// 密码登录接口
export const userLoginByPasswordService = (EmailOrPhone, passwordNoMD5) => {
  const password = CryptoJS.MD5(passwordNoMD5).toString()
  if (EmailOrPhone.includes('@') && EmailOrPhone.includes('.')) {
    const email = EmailOrPhone
    return request.post('/user/login-by-email-password', {
      email,
      password
    })
  } else {
    const phone = EmailOrPhone
    return request.post('/user/login-by-phone-password', {
      phone,
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
export const userGetInfoService = (userId) => {
  return request.get(`/user/info?userId=${userId}`)
}
