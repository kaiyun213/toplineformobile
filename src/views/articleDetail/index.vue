<template>
  <div class="artcle-component">
    <!-- 顶部的文章详情列表导航栏 -->
    <van-nav-bar title="文章详情列表" left-arrow @click-left="onClickLeft" />
    <!-- 文章标题 -->
    <van-cell>
      <template slot="title">
        <div class="title">{{articleObj.title}}</div>
      </template>
    </van-cell>
    <!-- 作者信息 -->
    <authorInfo :articleObj="articleObj"></authorInfo>
    <!-- 文章内容 -->
    <van-cell>
      <template slot="title">
        <div v-html="articleObj.content"></div>
      </template>
    </van-cell>
    <!-- 点赞&不喜欢 -->
    <like :articleObj="articleObj"></like>
    <!-- 评论区域 -->
    <comment :articleObj="articleObj"></comment>
    <!-- 留言区域 -->
    <leaveMessage></leaveMessage>
  </div>
</template>

<script>
//导入组件
import authorInfo from './components/authorInfo.vue'
import like from './components/like.vue'
import comment from './components/comment.vue'
import leaveMessage from './components/leaveMessage.vue'
//导入获取文章的请求
import { getArticleDetail } from '@/api/articleList.js'
export default {
  components: {
    authorInfo,
    like,
    comment,
    leaveMessage
  },
  data() {
    return {
      artId: this.$route.params.artid,
      //文章详情对象
      articleObj: {},
    }
  },
  methods: {
    //返回上一页
    onClickLeft() {
      this.$router.back()
    },
    //获取文章详情的方法
    async getDetail() {
      let res = await getArticleDetail(this.artId)
      console.log(res)
      this.articleObj = res
    }
  },
  mounted() {
    this.getDetail()
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