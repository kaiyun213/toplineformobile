<template>
  <div>
    <!-- 顶部的首页 -->
    <van-nav-bar title="首页" />
   
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

<style lang="less" scoped>
.van-nav-bar {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
}
</style>