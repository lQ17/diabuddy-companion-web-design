<script setup>
import { ref } from 'vue'
const onClickLeft = () => history.back()
const oldPassword = ref('')
const newPassword = ref('')
const reNewPassword = ref('')
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
