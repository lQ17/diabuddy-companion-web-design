<script setup>
const onClickLeft = () => history.back()
//记得做用户名回显
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="修改用户名" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
    <div class="setting-box">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit"> 确定 </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style scoped>
.setting-box {
  margin-top: 20px;
}
.page-container {
  height: 100vh;
  background: #f6f7fb;
}
</style>
