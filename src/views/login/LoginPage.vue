<script setup>
import WikingFaceIcon from '@/assets/icon/winking-face.svg'
import QQIcon from '@/assets/icon/tencent-qq.svg'
import WXIcon from '@/assets/icon/wechat.svg'
import { ref } from 'vue'
//仅用于切换“密码登录”和“验证码登录”
const loginWayChoose = ref(0)
const loginWayChooseList = ref(['密码登录', '验证码登录'])

// 初始化表单数据
const emailOrPhone = ref('')
const password = ref('')
const sms = ref('')
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
      <template #right>
        <div class="nav-bar-right-div">注册</div>
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
      <van-form @submit="onSubmit">
        <van-cell-group inset :border="true">
          <van-field
            class="bordered-field"
            v-model="emailOrPhone"
            name="邮箱或手机号"
            placeholder="邮箱或手机号"
          />
          <!-- 密码框  与下面互斥 -->
          <van-field
            class="bordered-field"
            v-if="!loginWayChoose"
            v-model="password"
            type="password"
            name="密码"
            placeholder="密码"
          />
          <!-- 验证码框  与上面互斥 -->
          <van-field
            class="bordered-field"
            v-if="loginWayChoose"
            v-model="sms"
            center
            clearable
            placeholder="请输入短信验证码"
          >
            <template #button>
              <van-button size="small" type="primary">发送验证码</van-button>
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit"> 提交 </van-button>
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
  height: 50px;
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
