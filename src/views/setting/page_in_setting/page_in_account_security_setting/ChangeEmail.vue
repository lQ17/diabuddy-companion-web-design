<script setup>
import { ref } from 'vue'
const onClickLeft = () => history.back()
const email = ref('')
const sms = ref('')
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="换绑邮箱" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <div class="phone-msg">
      <div class="tip-msg">当前邮箱</div>
      <div class="email-box">1370655310@qq.com</div>
    </div>
    <!-- 登录表单 -->
    <div class="change-form">
      <van-form @submit="onSubmit">
        <van-cell-group inset :border="true">
          <van-field class="bordered-field" v-model="email" name="请输入邮箱" placeholder="请输入邮箱" />
          <van-field class="bordered-field" v-model="sms" center clearable placeholder="请输入邮箱验证码">
            <template #button>
              <van-button size="small" type="primary">发送验证码</van-button>
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit"> 确定 </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style scoped>
.change-form {
  margin-top: 30px;
}
.email-box {
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
