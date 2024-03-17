<script setup>
import { userGetUserPhoneService, userBindPhoneService } from '@/api/user'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores'
import { showToast, showFailToast, showSuccessToast } from '@/components/vantComponents'
const userStore = useUserStore()
const onClickLeft = () => history.back()
const phoneBefore = ref('')
const phone = ref('')
const sms = ref('')

const sendSms = () => {
  showToast('目前并没有短信验证码接口，可直接输入手机号，进行绑定')
}

const onConfirm = async () => {
  if (phone.value == '') {
    showFailToast('您还没输入要绑定的手机号')
  }

  if (phone.value === phoneBefore.value) {
    showFailToast('不能换绑相同的手机号')
    return
  }

  if (!/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(phone.value)) {
    showFailToast('手机号格式错误')
    return
  }

  await userBindPhoneService(userStore.user.id, phone.value)
  showSuccessToast('绑定成功')
}

const init = async () => {
  const res = await userGetUserPhoneService(userStore.user.id)
  phoneBefore.value = res.data.data.phone || ''
}

const showPhoneBefore = () => {
  if (phoneBefore.value != '') {
    return phoneBefore.value.replace(/(\d{3})\d*(\d{4})/, '$1*****$2')
  } else {
    return '尚未绑定'
  }
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="换绑手机号" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <div class="phone-msg">
      <div class="tip-msg">当前手机号</div>
      <div class="phone-hide">{{ showPhoneBefore() }}</div>
    </div>
    <!-- 登录表单 -->
    <div class="change-form">
      <van-form @submit="onSubmit">
        <van-cell-group inset :border="true">
          <van-field class="bordered-field" v-model="phone" name="请输入手机号" placeholder="请输入手机号" />
          <van-field class="bordered-field" v-model="sms" center clearable placeholder="请输入短信验证码">
            <template #button>
              <van-button size="small" type="primary" @click="sendSms()">发送验证码</van-button>
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit" @click="onConfirm"> 确定 </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style scoped>
.change-form {
  margin-top: 30px;
}
.phone-hide {
  padding-top: 20px;
  font-size: 20px;
  text-align: center;
  color: black;
}
.tip-msg {
  font-size: 15px;
  text-align: center;
  color: #808080;
}
.phone-msg {
  padding-top: 40px;
}
.cell-group {
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 0px;
  padding-right: 10px;
}
.page-container {
  height: 100vh;
  background: #f6f7fb;
}
</style>
