<template>
  <van-cell>
    <template slot="title">
      <div class="authorInfo">
        <div class="img">
          <img :src="articleObj.aut_photo" alt />
        </div>
        <div class="title">
          <div class="article-title">{{articleObj.aut_name}}</div>
          <div class="article-info">
            <span>{{articleObj.pubdate |timeformat}}&nbsp;</span>&nbsp;
            <!-- <span>央视网新闻频道官方账号</span> -->
          </div>
        </div>
        <div class="btn">
          <van-button v-if="articleObj.is_followed===false" type="default" size="small" @click="doFollow">关注</van-button>
          <van-button v-else type="danger" size="small" @click="unFollow">取消关注</van-button>
        </div>
      </div>
    </template>
  </van-cell>
</template>

<script>
//导入关注作者和取消关注作者
import { followAuthor, unfollowAuthor } from '@/api/user.js'
export default {
  props: ['articleObj'],
  methods: {
    //关注作者
    doFollow() {
      followAuthor(this.articleObj.aut_id)
      this.articleObj.is_followed = true
    },
    //取消关注作者
    unFollow() {
      unfollowAuthor(this.articleObj.aut_id)
      this.articleObj.is_followed = false
    }
  },
}
</script>

<style lang="less" scoped>
.authorInfo {
  display: flex;
  .img {
    margin-right: 16px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .title {
    flex: 1;
    .article-title {
      font-size: 18px;
      font-weight: bold;
      color: #000;
      margin-bottom: 5px;
    }
    .article-info {
      font-size: 14px;
      color: #555;
    }
  }
}
</style>