<template>
  <van-cell>
    <template slot="title">
      <div class="article-like">
        <van-button icon="star-o" type="default">点赞</van-button>
        <van-button icon="like-o" type="danger">不喜欢</van-button>
      </div>
    </template>
  </van-cell>
</template>

<script>
export default {

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