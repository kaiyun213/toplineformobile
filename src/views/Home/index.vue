<template>
  <div class="home">
    <!-- 顶部的首页 -->
    <van-nav-bar title="首页" class="index-nav-bar" />
    <!-- 频道标签导航栏 -->
    <!-- style="position:fixed;top:46px;left:0;width:100%;margin-right:40px" -->
    <van-tabs v-model="tabActive" >
      <van-tab :title="channel.name" v-for="channel in channelList" :key="channel.id">
        <van-pull-refresh v-model="downLoading" @refresh="onRefresh">
          <van-list v-model="upLoading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <!--  <van-tab title="标签 2">内容 2</van-tab>
        <van-tab title="标签 3">内容 3</van-tab>
        <van-tab title="标签 4">内容 4</van-tab>
        <van-tab title="标签 5">内容 5</van-tab>
        <van-tab title="标签 6">内容 6</van-tab>
      <van-tab title="标签 7">内容 7</van-tab>-->
    </van-tabs>
    <div slot="nav-right" class="nav-right-icon" @click="showPopup">
      <van-icon name="wap-nav" />
    </div>
    <!-- 弹出层 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '90%' }">
      <van-grid :gutter="10">
        <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="文字" />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
//导入channel 
import { channelRequest } from '@/api/channel.js'
export default {
  data() {
    return {
      //标签默认选中的选项
      tabActive: 0,
      //控制弹出层的显示隐藏
      show: false,
      //上拉加载更多
      upLoading: false,
      //没有更多加载了
      finished: false,
      //假的文章列表数据
      list: [],
      //下拉刷新
      downLoading: false,
      //定义存放频道的数组
      channelList: [],
    }
  },
  methods: {
    //点击图标显示弹层
    showPopup() {
      this.show = true
    },
    // onLoad加载事件
    onLoad() {
      //给数据添加默认的数据源
      for (let i = 0; i < 20; i++) {
        this.list.push(i + 1)
      }
      //重新将upLoading设置为false
      this.upLoading = false
    },
    //onRefresh刷新事件
    onRefresh() {

    },
    //封装获取频道的方法
    async getChannel() {
      //1判断是否登录
      //1.1得到用户登录的信息
      let { use } = this.$store.state
      //1.2判断是否是有登录信息token
      if (use) {
        //为true,则说明有值,即有登录
        //1.2.1发送请求到服务器
        let res = await channelRequest()
        //1.2.2将结果赋值给频道的数组
        //  console.log(res)
        this.channelList = res.channels
      } else {
        //为false,即没有值,即没有登录
        //没有登录,则判断本地缓存是否有频道数据
        //获取频道数据
        let channelCache = JSON.parse(window.localStorage.getItem('channnel'))
        //判断本地缓存是否有频道信息
        if (channelCache) {
          //有值,则,直接赋值,
          this.channelList = channelCache;
        } else {

          //没有值,则调用接口,发送请求
          let res = await channelRequest()
          //将数据赋给channelList
          this.channelList = res.channels

        }
      }
    }
  },
  mounted() {
    this.getChannel()
  },
}
</script>

<style lang="less" scoped >
.home {
  margin-top: 100px;
}
.van-nav-bar {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
}
.index-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.home /deep/ .van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0;
  width: 100%;
  z-index: 99;
  .van-tabs__nav {
  margin-right:40px;
  }
}
.nav-right-icon {
  position: fixed;
  top: 46px;
  right: 0;
  z-index: 100;
  font-size: 40px;
  background-color: #fff;
}
</style>