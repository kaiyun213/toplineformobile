<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
        v-model="mobile"
        v-validate="'required'"
        name="mobile"
        :error-message="errors.first('mobile')"
        required
        clearable
        label="手机号码"
        placeholder="请输入手机号码"
      />
      <van-field
        v-model="code"
        v-validate="'required'"
        name="code"
        :error-message="errors.first('code')"
        label="验证码"
        placeholder="请收入验证码"
        required
      />
    </van-cell-group>
    <div class="login-btn">
      <van-button type="info" :loading="isLoading" size="large" @click="toLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
/* 
使用插件 vee-validate 验证输入框内容
1.vee-vaidate的基本使用
  1.1下载vee-validate
  1.2导入插件,
  1.3添加属性
  1.4验证文本
2.添加其他验证提示:
  2.1 导入本地语言包
  2.2 从vee-validate中单独导出Validator
  2.3 使用本地语言包
3.添加自定义验证提示,
  3.1 自定义提示信息
  3.2 使用提示信息
4.自定义经检验触发事件
  4.1 禁止默认的触发事件
  4.2 添加输入框框
  4.3 给按钮诸恶点击事件
*/

//导入登录请求的api
import { login } from '@/api/user'

export default {
  data() {
    return {
      mobile: '',
      code: '246810',
      //登录按钮的加载动画
      isLoading: false,
    }
  },
  methods: {
    //自定义检验规则
    setRules() {
      //验证对象
      const dict = {
        //验证规则
        custom: {
          mobile: {
            required: () => '请输入手机号码'
          },
          code: {
            required: () => '请输入验证码'
          }
        }
      };
      //使用检验规则
      this.$validator.localize('zh_CN', dict);
    },
    //点击登录事件
    toLogin() {
      this.isLoading = true
      this.$validator.validate().then(async valid => {
        if (valid) {
          //符合检验规则
          //发送请求获取数据
          try {

            let res = await login({
              mobile: this.mobile,
              code: this.code
            })
            console.log(res)
            //将数据保存进本地的缓存中
            this.$store.commit('setUse', res)
            //跳转到home页面
            this.$router.push('/home')
            this.isLoading = false
          } catch (err) {
            // console.log('出错了')
            //登录失败提示用户
            this.isLoading = false
            this.$toast.fail('登录失败');
          }
        }
      });
    }
  },
  mounted() {
    //调用自定义规则
    this.setRules()
  }
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
    margin: 30px 10px;
    .van-button {
      border-radius: 8px;
    }
  }
}
</style>