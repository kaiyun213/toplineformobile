<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field v-model="mobile" required clearable label="手机号码" placeholder="请输入手机号码" />
      <van-field v-model="code" label="验证码" placeholder="请收入验证码" required />
    </van-cell-group>
    <div class="login-btn">
      <van-button type="info" size="large">大号按钮</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: '',
      code: '246810',
    }
  },
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background-color: #f5f7f9;
  .van-nav-bar {
    background-color: #3296fa;
    .van-nav-bar__title {
      color: #fff;
    }
  }
  .login-btn {
    margin:  30px 10px;
    .van-button{
    border-radius: 8px;
    }
  }
}
</style>