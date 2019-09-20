<template>
  <div>
    <!-- 顶部的搜索列表 -->
    <van-nav-bar title="搜索列表" left-arrow @click-left="onClickLeft" />
    <!-- 搜索文章渲染 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getArticles">
      <van-cell-group v-for="item in searchArticleList" :key="item.art_id">
        <van-cell>
          <template slot="title">
            <div>{{item.aut_name}}&nbsp;&nbsp; {{item.pubdate|dayjsformat}}</div>
          </template>
          <template slot="label">
            <div>{{item.title}}</div>
            <van-grid :border="false" :column-num="3" v-if="item.cover.images.length >0">
              <van-grid-item v-for="(image,index) in item.images" :key="index">
                <van-image :src="image" />
              </van-grid-item>
            </van-grid>
            <van-grid :column-num="3">
              <van-grid-item text="评论" />
              <van-grid-item text="点赞" />
              <van-grid-item text="收藏" />
            </van-grid>
          </template>
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
//导入api
import { searchArticles } from '@/api/articleList.js'
export default {
  data() {
    return {
      //传过来的参数
      keyWords: this.$route.params.keyWords,
      //当前请求的页签数
      page: 0,
      //页容量初始化
      per_page: 10,
      //获取文章的数组
      searchArticleList: [],
      //上拉加载状态
      loading: false,
      //加载完成状态
      finished: false
    }
  },
  methods: {
    onClickLeft() {
      console.log(111)
    },
    async getArticles() {
      this.page++
      let res = await searchArticles({
        page: this.page,
        per_page: this.per_page,
        keyWords: this.keyWords
      })
      // console.log(res)
      //搜索内容的集合
      this.searchArticleList = [...this.searchArticleList, ...res.results]
      //加载完成
      if (this.searchArticleList.length == res.total_count) {
        this.finished = true
      }
      //加载状态改变
      this.loading = false
    },
  },
  mounted() {
    this.getArticles()
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
  z-index: 99 !important;
  .van-nav-bar__title,
  .van-icon-arrow-left {
    color: #fff;
  }
}
.van-cell-group {
  border-bottom: 10px solid #eee;
}
.van-list {
  margin-top: 46px;
}
</style>