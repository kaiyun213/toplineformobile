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
        <div class="title">用户名</div>
        <div class="like-icon">
          <van-icon name="good-job-o" />
        </div>
      </div>
      <div class="artcile-content">
        <div>吴青峰</div>
        <div>
          <span>09-21 08:51</span>&nbsp;&nbsp;&nbsp;
          <span>回复(100)</span>
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
  justify-content: center;
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
    font-size: 15px;
    font-weight: bold;
    margin-top: 10px;
  }
  .like-icon {
    .van-icon {
      font-size: 30px;
      margin-top: 10px;
    }
  }
}
.artcile-content {
  margin-left: 65px;
  margin-top: -15px;
}
</style>