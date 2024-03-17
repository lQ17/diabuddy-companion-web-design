<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userUpdatePasswordService } from '@/api/user'
import { showFailToast, showSuccessToast } from '@/components/vantComponents'
// import { useRouter } from 'vue-router'
// const router = useRouter()
const userStore = useUserStore()
const onClickLeft = () => history.back()
const oldPassword = ref('')
const newPassword = ref('')
const reNewPassword = ref('')

const onClick = async () => {
  if (newPassword.value !== reNewPassword.value) {
    showFailToast('新密码两次输入不一致')
    return
  }
  if (oldPassword.value === newPassword.value) {
    showFailToast('新密码不能与旧密码相同')
    return
  }
  await userUpdatePasswordService(userStore.user.id, oldPassword.value, newPassword.value)
  showSuccessToast('修改成功')
  history.back()
}

const toFindPassword = () => {}
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="重置密码" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <div class="change-form">
      <van-form @submit="onSubmit">
        <van-cell-group inset :border="true">
          <van-field class="bordered-field" v-model="oldPassword" name="请输入旧密码" placeholder="请输入旧密码" />
          <van-field class="bordered-field" v-model="newPassword" center clearable placeholder="请输入新密码" />
          <van-field class="bordered-field" v-model="reNewPassword" center clearable placeholder="请再次输入新密码" />
        </van-cell-group>
        <div id="forget-box">
          <van-row>
            <van-col span="18"></van-col>
            <van-col span="6" @click="toFindPassword()">忘记密码？</van-col>
          </van-row>
        </div>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit" @click="onClick"> 确定 </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style scoped>
#forget-box {
  margin-top: 10px;
  margin-right: 10px;
  font-size: 15px;
  color: #1989fa;
}
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
