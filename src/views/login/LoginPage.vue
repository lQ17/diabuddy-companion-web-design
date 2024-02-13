<script setup>
import { useRouter } from 'vue-router'
import { WinkingFace } from '@icon-park/vue-next'
import QQIcon from '@/assets/icon/tencent-qq.svg'
import WXIcon from '@/assets/icon/wechat.svg'
import { ref } from 'vue'
import { userLoginByPasswordService, userLoginBySmsService, userGetSmsService } from '@/api/user'
import { useUserStore } from '@/stores'
import vantComponents from '@/components/vantComponents'
const userStore = useUserStore()
const router = useRouter()
//仅用于切换“密码登录”和“验证码登录”
const loginWayChoose = ref(0)
const loginWayChooseList = ref(['密码登录', '验证码登录'])

const emailOrPhone = ref('')
const phone = ref('')
const password = ref('')
const sms = ref('')

// 定义校验规则
const emailOrPhoneRules = [
  { message: '邮箱或手机号不能为空', required: true, trigger: 'onSubmit' },
  { message: '请输入有效的邮箱或手机号', pattern: /(^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$)|(^1[3-9]\d{9}$)/, trigger: 'onSubmit' }
]

const passwordRules = [
  { message: '密码不能为空', required: true, trigger: 'onSubmit' },
  { message: '密码长度至少为6位', pattern: /^\d{6}$/, trigger: 'onSubmit' }
]

const phoneRules = [
  { message: '手机号不能为空', required: true, trigger: 'onSubmit' },
  { message: '请输入有效的手机号', pattern: /^1[3-9]\d{9}$/, trigger: 'onSubmit' }
]

const smsRules = [
  { message: '验证码不能为空', required: true, trigger: 'onSubmit' },
  { message: '验证码为4位数字', pattern: /^\d{4}$/, trigger: 'onSubmit' }
]
const onClickLeft = () => history.back()

const onClickRight = () => {
  router.push('/register')
}

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
const onLogin = () => {
  //密码登录
  if (loginWayChoose.value === 0) {
    loginByPassword()
  }
  //手机验证码登录
  if (loginWayChoose.value === 1) {
    loginBySms()
  }
}

const loginByPassword = async () => {
  const res = await userLoginByPasswordService(emailOrPhone.value, password.value)
  userStore.setToken(res.data.data.token)
  vantComponents.showSuccessToast('登录成功')
  router.replace('/')
}

const loginBySms = async () => {
  const res = await userLoginBySmsService(phone.value, sms.value)
  userStore.setToken(res.data.data.token)
  vantComponents.showSuccessToast('登录成功')
  router.replace('/')
}
</script>
<template>
  <div>
    <van-nav-bar class="nav-bar-class" @click-left="onClickLeft" @click-right="onClickRight" :border="false">
      <template #left>
        <div class="nav-bar-left-div">取消</div>
      </template>
      <template #right>
        <div class="nav-bar-right-div">注册</div>
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
    <!-- 选择登录方法 -->
    <div class="login-way-choose">
      <van-tabs v-model:active="loginWayChoose">
        <van-tab v-for="label in loginWayChooseList" :key="label" :title="label">
          <template #title>{{ label }} </template>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 登录表单 -->
    <div class="login-form">
      <van-form @submit="onLogin">
        <van-cell-group inset :border="true">
          <!-- 密码登录 -->
          <van-field
            class="bordered-field"
            v-if="!loginWayChoose"
            v-model="emailOrPhone"
            name="邮箱或手机号"
            placeholder="邮箱或手机号"
            :rules="emailOrPhoneRules"
          />
          <van-field
            class="bordered-field"
            v-if="!loginWayChoose"
            v-model="password"
            name="密码"
            placeholder="密码"
            type="password"
            :rules="passwordRules"
          />
          <!-- 验证码登录 -->
          <van-field class="bordered-field" v-if="loginWayChoose" v-model="phone" name="手机号" placeholder="手机号" type="tel" :rules="phoneRules" />
          <van-field
            class="bordered-field"
            v-if="loginWayChoose"
            v-model="sms"
            center
            clearable
            placeholder="请输入短信验证码"
            type="digit"
            :rules="smsRules"
          >
            <template #button>
              <van-button size="small" type="primary" @click="getSmsCode" :disabled="second !== totalSecond">
                {{ second === totalSecond ? '获取验证码' : second + '秒后重新发送' }}
              </van-button>
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit"> 登录 </van-button>
        </div>
      </van-form>
    </div>

    <!-- 只是好看，没打算做 -->
    <div class="others-way-to-login">
      <van-row>
        <van-col span="24">
          <van-divider>或使用以下方式直接登录</van-divider>
        </van-col>
        <van-col span="6"></van-col>
        <van-col span="6">
          <div class="foot-icon"><van-image width="40" height="40" :src="QQIcon" /></div>
        </van-col>
        <van-col span="6">
          <div class="foot-icon">
            <van-image class="foot-icon" width="40" height="40" :src="WXIcon" />
          </div>
        </van-col>
        <van-col span="6"></van-col>
      </van-row>
    </div>
  </div>
</template>

<style scoped>
.others-way-to-login {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  margin-bottom: 50px;
}

.bordered-field {
  height: 60px;
}
.login-way-choose {
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
