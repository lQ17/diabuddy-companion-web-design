<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores'
import { userUpdateUserInfoService } from '@/api/user'
import { showSuccessToast } from '@/components/vantComponents'
const onClickLeft = () => history.back()
const userStore = useUserStore()
const minDate = new Date('1960-01-01T00:00:00')
const checkedGender = ref('')

const birthDate = ref('')
const showBirthDatePicker = ref(false)
const onBirthDateConfirm = ({ selectedValues }) => {
  birthDate.value = selectedValues.join('/')
  showBirthDatePicker.value = false
}

// 需要上传的
const username = ref('')
const fullName = ref()
const gender = computed(() => {
  return checkedGender.value === '1' ? 'male' : 'female'
})
const birthday = computed(() => {
  if (birthDate.value === '') {
    return '1990-01-01'
  } else {
    return birthDate.value.replace(/\//g, '-')
  }
})
const address = ref('')

//记得做用户名回显
const onClick = async () => {
  if (username.value === '') {
    username.value = userStore.user.username
  }
  await userUpdateUserInfoService(userStore.user.id, username.value, fullName.value, birthday.value, gender.value, address.value)
  showSuccessToast('更新成功')
  userStore.user.username = username.value
}
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="修改基本信息" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <div class="setting-box">
      <van-form>
        <van-cell-group inset>
          <!-- 用户名 -->
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            :placeholder="userStore.user.username"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <!-- 真实姓名 -->
          <van-field v-model="fullName" name="真实姓名" label="真实姓名" placeholder="真实姓名" />
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
            <van-date-picker @confirm="onBirthDateConfirm" @cancel="showBirthDatePicker = false" :min-date="minDate" />
          </van-popup>
          <!-- 居住地 -->
          <van-field v-model="address" name="请输入居住地" label="居住地" placeholder="请输入居住地" />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit" @click="onClick"> 确定 </van-button>
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
