<template>
  <van-cell>
    <template slot="title">
      <div class="article-like">
        <van-button
          @click="doUnthumbUp"
          v-if="articleObj.attitude===1"
          icon="star-o"
          type="danger"
        >取消点赞</van-button>
        <van-button @click="doThumbUp" v-else icon="star-o" type="default">点赞</van-button>
        <van-button
          @click="doUnlike"
          v-if="articleObj.attitude===0"
          icon="like-o"
          type="danger"
        >取消不喜欢</van-button>
        <van-button @click="doLike" v-else icon="like-o" type="default">不喜欢</van-button>
      </div>
    </template>
  </van-cell>
</template>

<script>
//导入点赞和不喜欢的请求
import { thumbUp, unthumbUp, like, unlike } from '@/api/comment.js'
export default {
  props: ['articleObj'],
  data() {
    return {

    }
  },
  methods: {
    //对文章点赞
    async doThumbUp() {
      this.articleObj.attitude = 1
      let res = await thumbUp(this.articleObj.art_id)
    },
    //取消点赞
    async doUnthumbUp() {
      this.articleObj.attitude = -1
      let res = await unthumbUp(this.articleObj.art_id)
    },
    //对文章不喜欢
    async doLike() {
      this.articleObj.attitude = 0
      let res = await like(this.articleObj.art_id)
    },
    //取消不喜欢
    async doUnlike() {
      this.articleObj.attitude = -1
      let res = await unlike(this.articleObj.art_id)
    },
  },
}
</script>

<style lang="less" scoped>
.article-like {
  text-align: center;
  margin-top: 20px;
  .van-button {
    margin: 0 20px;
    border: none;
    border-radius: 5px;
  }
}
</style>