<template>
  <div>
    <!--专门用来封装底部的tabnav  -->
    <!-- 底部tab-bar栏 -->
    <router-view></router-view>
    <van-tabbar route v-model="tabActive">
      <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/personCenter" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
data() {
    return {
      tabActive:0,  
    }
},
}
</script>

<style>
</style>