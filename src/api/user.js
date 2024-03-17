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
  return request.get(`/email/send?email=${email}`)
}

// 获取用户信息
export const userGetInfoService = (userId) => {
  return request.get(`/user/info?userId=${userId}`)
}

// 获取手机号
export const userGetUserPhoneService = (userId) => {
  return request.get(`/user/phone/${userId}`)
}

// 绑定手机号
export const userBindPhoneService = (id, phone) => {
  return request.post('/user/phone', {
    id,
    phone
  })
}

// 查看是否为隐私账户
export const userCheckPrivateService = (userId) => {
  return request.get(`/user/private/${userId}`)
}

// 修改隐私状态
export const userUpdatePrivateService = (userId, isPrivateUser) => {
  return request.post('/user/private', {
    userId,
    isPrivateUser
  })
}

// 改密码
export const userUpdatePasswordService = (id, oldPasswordNoMD5, newPasswordNoMD5) => {
  const oldPassword = CryptoJS.MD5(oldPasswordNoMD5).toString()
  const newPassword = CryptoJS.MD5(newPasswordNoMD5).toString()
  return request.put('/user/update-password', { id, oldPassword, newPassword })
}

// 更新username
export const userUpdateUsernameService = (id, username) => {
  return request.put('/user/username', { id, username })
}

// 更新基本信息
export const userUpdateUserInfoService = (id, username, fullName, birthday, gender, address) => {
  return request.put('/user/update-info', { id, username, fullName, birthday, gender, address })
}

// 更新头像
export const userUpdateAvatarService = (id, userPic) => {
  return request.put('/user/pic', { id, userPic })
}
