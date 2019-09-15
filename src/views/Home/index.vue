<template>
  <div>
    <!-- 顶部的首页 -->
    <van-nav-bar title="首页" class="index-nav-bar" />
    <!-- 频道标签导航栏 -->
    <div style="position:fixed;top:46px;left:0;width:100%;">
      <van-tabs v-model="tabActive" style="margin-right:40px">
        <van-tab title="标签 1">
          <van-list v-model="upLoading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-pull-refresh v-model="downLoading" @refresh="onRefresh">
              <van-cell v-for="item in list" :key="item" :title="item" />
            </van-pull-refresh>
          </van-list>
        </van-tab>
        <van-tab title="标签 2">内容 2</van-tab>
        <van-tab title="标签 3">内容 3</van-tab>
        <van-tab title="标签 4">内容 4</van-tab>
        <van-tab title="标签 5">内容 5</van-tab>
        <van-tab title="标签 6">内容 6</van-tab>
        <van-tab title="标签 7">内容 7</van-tab>
      </van-tabs>
    </div>
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
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      //下拉刷新
      downLoading:false,
    }
  },
  methods: {
    //点击图标显示弹层
    showPopup() {
      this.show = true
    },
    // onLoad加载事件
    onLoad() {

    },
    //onRefresh刷新事件
    onRefresh(){

    }
  },
}
</script>

<style lang="less" scoped >
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
.nav-right-icon {
  position: fixed;
  top: 46px;
  right: 0;
  font-size: 40px;
  background-color: #fff;
}
</style>