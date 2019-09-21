<template>
  <div class="artcle-component">
    <!-- 顶部的文章详情列表导航栏 -->
    <van-nav-bar title="文章详情列表" left-arrow @click-left="onClickLeft" />
    <!-- 文章标题 -->
    <van-cell>
      <template slot="title">
        <div class="title">习近平在庆祝人们政协成立70周年大会上发表重要讲话</div>
      </template>
    </van-cell>
    <!-- 作者信息 -->
    <authorInfo></authorInfo>
    <!-- 文章内容 -->
    <van-cell>
      <template slot="title">
        <div v-for="(item,index) in 30" :key="index">这是一个寂寞的天,下着有些伤心的雨;</div>
      </template>
    </van-cell>
    <!-- 点赞&不喜欢 -->
    <like></like>
    <!-- 评论区域 -->
    <comment></comment>
    <!-- 留言区域 -->
    <leaveMessage></leaveMessage>
  </div>
</template>

<script>
import authorInfo from './components/authorInfo.vue'
import like from './components/like.vue'
import comment from './components/comment.vue'
import leaveMessage  from  './components/leaveMessage.vue'
export default {
  components: {
    authorInfo,
    like,
    comment,
    leaveMessage
  },
  data() {
    return {
    artId:this.$route.params.art_id,
    }
  },
  methods: {
    //返回上一页
    onClickLeft() {
      this.$router.back()
    }
  },
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #1989fa;
  .van-icon-arrow-left,
  .van-nav-bar__title {
    font-size: 18px;
    color: #fff;
  }
}
.artcle-component {
  margin-top: 46px;
  margin-bottom: 80px;
}
.title {
  font-size: 24px;
  font-weight: bold;
  line-height: 36px;
}
</style>