<script setup>
import WikingFaceIcon from '@/assets/icon/winking-face.svg'
import { ref } from 'vue'
//仅用于切换“密码登录”和“验证码登录”
const registerWayChoose = ref(0)
const registerWayChooseList = ref(['邮箱注册', '手机号注册'])

// 初始化表单数据
const email = ref('')
const phone = ref('')
const password = ref('')
//手机号验证码
const sms = ref('')
//邮箱验证码
const emailMsg = ref('')
</script>
<template>
  <div>
    <van-nav-bar
      class="nav-bar-class"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :border="false"
    >
      <template #left>
        <div class="nav-bar-left-div">取消</div>
      </template>
    </van-nav-bar>
    <!-- 图标、slogan -->
    <van-row :gutter="[0, 10]">
      <van-col span="8"></van-col>
      <van-col span="8">
        <div class="diabuddy-icon">
          <van-image width="80" height="80" :src="WikingFaceIcon" />
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
            placeholder="请输入邮箱"
          />
          <!-- 手机号 与上面互斥 -->
          <van-field
            v-if="registerWayChoose"
            class="bordered-field"
            v-model="phone"
            name="请输入手机号"
            placeholder="请输入手机号"
          />

          <van-field
            class="bordered-field"
            v-model="password"
            type="password"
            name="请输入密码"
            placeholder="请输入密码"
          />
          <!-- 邮箱验证码框 与下面互斥 -->
          <van-field
            class="bordered-field"
            v-if="!registerWayChoose"
            v-model="emailMsg"
            center
            clearable
            placeholder="请输入邮箱验证码"
          >
            <template #button>
              <van-button size="small" type="primary" @click="getEmailCode">发送验证码</van-button>
            </template>
          </van-field>
          <!-- 手机号验证码框 与上面互斥 -->
          <van-field
            class="bordered-field"
            v-if="registerWayChoose"
            v-model="sms"
            center
            clearable
            placeholder="请输入短信验证码"
          >
            <template #button>
              <van-button size="small" type="primary" @click="getSmsCode">发送验证码</van-button>
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit"> 提交 </van-button>
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
  height: 50px;
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
