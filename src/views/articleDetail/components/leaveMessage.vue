<template>
  <div class="leaveMessage">
    <van-cell>
      <div class="message">
        <div class="input">
          <van-field left-icon="edit" v-model="leaveMessage" placeholder="写评论" />
        </div>
        <div class="btn">
          <van-button type="danger" size="small" @click="sendMessage">发送</van-button>
        </div>
        <div class="icon">
          <van-icon  name="star-o" />
          <!-- <van-icon  name="star" /> -->
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
//导入添加评论的方法
import { addComment } from '@/api/comment.js'
//导入收藏和取消收藏文章的请求
import { collectArticle, cancelCollectArticle } from '@/api/user.js'
export default {
  props: ['articleObj'],
  data() {
    return {
      leaveMessage: '',
    }
  },
  methods: {
    //发送评论
    async sendMessage() {
      try {
        let res = await addComment({
          id: this.articleObj.art_id,
          content: this.leaveMessage
        })
        // console.log(res)
        this.$emit('addArtComment', res)
        this.leaveMessage = ''
      } catch (error) {
        this.$toast.fail(error.message)
      }
    },
    // 收藏文章
    /* async collect() {
      await collectArticle({
        artid: this.articleObj.art_id
      })
      this.articleObj.is_collected = true
    }, */
    //取消收藏文章
    /* async canncelCollect() {
      cancelCollectArticle({
        artid: this.articleObj.art_id
      })
      this.articleObj.is_collected = false
    } */
  }
}
</script>

<style lang="less" scoped>
.message {
  display: flex;
  justify-content: center;
  .input {
    flex: 1;
    .van-field {
      background-color: #ccc;
      border-radius: 22px;
    }
  }
  .btn {
    margin-left: 20px;
    margin-right: 20px;
    line-height: 44px;
  }
  .icon {
    margin-right: 20px;
    line-height: 50px;
    .van-icon {
      font-size: 20px;
    }
  }
}
.leaveMessage {
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>