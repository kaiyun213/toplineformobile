<template>
  <van-cell>
    <template slot="title">
      <div class="authorInfo">
        <div class="img">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569079377562&di=bc095e86c09c722892319b176e09f865&imgtype=0&src=http%3A%2F%2Fc1.haibao.cn%2Fimg%2F600_500_100_0%2F1505934743.9217%2F18c6436498e86d7bab182b8d9d6463b4.jpg"
            alt
          />
        </div>
        <div class="title">
          <div class="article-title">央视网新闻</div>
          <div class="article-info">
            <span>9小时前&nbsp; ∙</span>&nbsp;
            <span>央视网新闻频道官方账号</span>
          </div>
        </div>
        <div class="btn">
          <van-button type="danger" size="small">关注</van-button>
        </div>
      </div>
    </template>
  </van-cell>
</template>

<script>
export default {

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