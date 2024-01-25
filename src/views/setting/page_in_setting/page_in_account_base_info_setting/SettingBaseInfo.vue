<script setup>
import { ref } from 'vue'
const onClickLeft = () => history.back()
const checkedGender = ref('1')
const birthDate = ref('')
const showBirthDatePicker = ref(false)
const onBirthDateConfirm = ({ selectedValues }) => {
  birthDate.value = selectedValues.join('/')
  showBirthDatePicker.value = false
}
const liveArea = ref('')

//记得做用户名回显
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="修改基本信息" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <div class="setting-box">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <!-- 用户名 -->
          <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
          <!-- 真实姓名 -->
          <van-field v-model="realName" name="真实姓名" label="真实姓名" placeholder="真实姓名" />
          <!-- 性别 -->
          <van-field name="radio" label="性别">
            <template #input>
              <van-radio-group v-model="checkedGender">
                <van-radio class="redio-gander" name="1">男</van-radio>
                <van-radio class="redio-gander" name="2">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 生日 -->
          <van-field
            v-model="birthDate"
            is-link
            readonly
            name="datePicker"
            label="生日"
            placeholder="点击选择时间"
            @click="showBirthDatePicker = true"
          />
          <van-popup v-model:show="showBirthDatePicker" position="bottom">
            <van-date-picker @confirm="onBirthDateConfirm" @cancel="showBirthDatePicker = false" />
          </van-popup>
          <!-- 居住地 -->
          <van-field v-model="liveArea" name="请输入居住地" label="居住地" placeholder="请输入居住地" />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit"> 确定 </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style scoped>
.redio-gander {
  margin: 5px;
}
.setting-box {
  margin-top: 20px;
}
.page-container {
  height: 100vh;
  background: #f6f7fb;
}
</style>
