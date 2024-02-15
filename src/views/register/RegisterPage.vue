<script setup>
import { WinkingFace } from '@icon-park/vue-next'
import vantComponents from '@/components/vantComponents'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { userRegisterByEmailService, userRegisterByPhoneService, userGetSmsService, userGetEamilMsgService } from '@/api/user'
const userStore = useUserStore()
const router = useRouter()
const onClickLeft = () => history.back()
//仅用于切换“密码登录”和“验证码登录”
const registerWayChoose = ref(0)
const registerWayChooseList = ref(['邮箱注册', '手机号注册'])

// 初始化表单数据
const email = ref('')
const phone = ref('')
const password = ref('')
const repassword = ref('')
//手机号验证码
const sms = ref('')
//邮箱验证码
const emailMsg = ref('')

// 定义校验规则
const emailRules = [
  { required: true, message: '请输入邮箱地址', trigger: 'onSubmit' },
  { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '请输入正确的邮箱地址', trigger: 'onSubmit' }
]

const phoneRules = [
  { required: true, message: '请输入手机号码', trigger: 'onSubmit' },
  { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'onSubmit' }
]

const passwordRules = [
  { required: true, message: '请输入密码', trigger: 'onSubmit' },
  { pattern: /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/, message: '密码长度不能少于6位,且必须同时包含数字和字母', trigger: 'onSubmit' }
]

const repasswordRules = [
  { required: true, message: '请再次输入密码', trigger: 'onBlur' },
  {
    validator: (value) => {
      return value === password.value
    },
    message: '两次输入的密码不一致',
    trigger: 'onBlur'
  }
]

const codeRules = [
  { required: true, message: '请输入验证码', trigger: 'onSubmit' },
  { pattern: /^\d{4}$/, message: '验证码为4位数字', trigger: 'onSubmit' }
]

// 获取sms验证码
const second = ref(60)
const totalSecond = 60
const getSmsCode = async () => {
  if (!/^[1-9]\d{10}$/.test(phone.value)) {
    vantComponents.showToast('请输入正确的手机号码')
    return
  }
  try {
    await userGetSmsService(phone.value)
    vantComponents.showToast('验证码发送成功，请注意查收')
    const intervalId = setInterval(() => {
      second.value--
      if (second.value === 0) {
        clearInterval(intervalId)
        second.value = totalSecond
      }
    }, 1000) // 每秒减1
  } catch (error) {
    vantComponents.showFailToast('验证码发送失败，请稍后重试')
  }
}

//获取邮箱验证码
const emailSecond = ref(60)
const totalEamilSecond = 60
const getEmailMsg = async () => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    vantComponents.showToast('请输入正确的邮箱')
    return
  }
  try {
    await userGetEamilMsgService(email.value)
    vantComponents.showToast('验证码发送成功，请注意查收')
    const intervalId = setInterval(() => {
      emailSecond.value--
      if (emailSecond.value === 0) {
        clearInterval(intervalId)
        emailSecond.value = totalEamilSecond
      }
    }, 1000) // 每秒减1
  } catch (error) {
    vantComponents.showFailToast('验证码发送失败，请稍后重试')
  }
}

const onSubmit = () => {
  //邮箱注册
  if (registerWayChoose.value === 0) {
    registerByEmail()
  }
  //手机号注册
  if (registerWayChoose.value === 1) {
    registerByPhone()
  }
}
const registerByEmail = async () => {
  await userRegisterByEmailService(email.value, password.value, repassword.value, emailMsg.value)
  vantComponents.showSuccessToast('注册成功')
  router.replace('/login')
}
const registerByPhone = async () => {
  const res = await userRegisterByPhoneService(phone.value, password.value, repassword.value, sms.value)
  vantComponents.showSuccessToast('注册成功，将自动登录')
  userStore.setToken(res.data.data.token)
  replaceToHome()
}

const replaceToHome = () => {
  userStore.getUser()
  router.replace('/')
}
</script>
<template>
  <div>
    <van-nav-bar class="nav-bar-class" @click-left="onClickLeft" :border="false">
      <template #left>
        <div class="nav-bar-left-div">取消</div>
      </template>
    </van-nav-bar>
    <!-- 图标、slogan -->
    <van-row :gutter="[0, 10]">
      <van-col span="8"></van-col>
      <van-col span="8">
        <div class="diabuddy-icon">
          <winking-face theme="outline" size="80" fill="#1989fa" strokeLinecap="square" />
        </div>
      </van-col>
      <van-col span="8"></van-col>
      <van-col span="8"></van-col>
      <van-col span="8">
        <div class="diabuddy-slogan-col-1">天空海阔</div>
      </van-col>
      <van-col span="8"></van-col>
      <van-col span="8"></van-col>
      <van-col span="8">
        <div class="diabuddy-slogan-col-2">任你行</div>
      </van-col>
    </van-row>
    <!-- 分割线 -->
    <van-divider :style="{ padding: '0px', margin: '10px' }" />
    <!-- 注册 -->
    <div class="register-way-choose">
      <van-tabs v-model:active="registerWayChoose">
        <van-tab v-for="label in registerWayChooseList" :key="label" :title="label">
          <template #title>{{ label }} </template>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 登录表单 -->
    <div class="register-form">
      <van-form @submit="onSubmit">
        <van-cell-group inset :border="true">
          <!-- 邮箱 与下面互斥 -->
          <van-field
            v-if="!registerWayChoose"
            class="bordered-field"
            v-model="email"
            name="请输入邮箱"
            :rules="emailRules"
            placeholder="请输入邮箱"
          />
          <!-- 手机号 与上面互斥 -->
          <van-field
            v-if="registerWayChoose"
            class="bordered-field"
            type="tel"
            v-model="phone"
            :rules="phoneRules"
            name="请输入手机号"
            placeholder="请输入手机号"
          />

          <van-field class="bordered-field" v-model="password" :rules="passwordRules" type="password" name="请输入密码" placeholder="请输入密码" />
          <van-field
            class="bordered-field"
            v-model="repassword"
            type="password"
            :rules="repasswordRules"
            name="请再次输入密码"
            placeholder="请再次输入密码"
          />
          <!-- 邮箱验证码框 与下面互斥 -->
          <van-field
            class="bordered-field"
            v-if="!registerWayChoose"
            v-model="emailMsg"
            :rules="codeRules"
            center
            clearable
            placeholder="请输入邮箱验证码"
          >
            <template #button>
              <van-button size="small" type="primary" @click="getEmailMsg" :disabled="emailSecond !== totalEamilSecond">
                {{ emailSecond === totalEamilSecond ? '获取验证码' : emailSecond + '秒后重新发送' }}
              </van-button>
            </template>
          </van-field>
          <!-- 手机号验证码框 与上面互斥 -->
          <van-field class="bordered-field" v-if="registerWayChoose" v-model="sms" :rules="codeRules" center clearable placeholder="请输入短信验证码">
            <template #button>
              <van-button size="small" type="primary" @click="getSmsCode" :disabled="second !== totalSecond">
                {{ second === totalSecond ? '获取验证码' : second + '秒后重新发送' }}
              </van-button>
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit"> 注册 </van-button>
        </div>
      </van-form>
      <div class="foot-msg">*本软件目前仅对一型糖友提供健康参考</div>
    </div>
  </div>
</template>

<style scoped>
.foot-msg {
  font-size: 15px;
  text-align: center;
  color: #808080;
}
.bordered-field {
  height: 60px;
}
.register-way-choose {
  margin-bottom: 30px;
}
.diabuddy-slogan-col-2 {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;
  font-size: 30px;
  font-weight: bold;
}
.diabuddy-slogan-col-1 {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;
  font-size: 20px;
}
.foot-icon,
.diabuddy-icon {
  display: flex;
  justify-content: center;
}
.nav-bar-right-div,
.nav-bar-left-div {
  color: #1989fa;
  font-size: 15px;
  font-weight: bold;
}
.nav-bar-class {
  --van-nav-bar-height: 80px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
