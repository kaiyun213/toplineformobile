<template>
  <van-cell>
    <template slot="title">
      <div class="authorInfo">
        <div class="img">
          <img :src="comment.aut_photo" alt />
        </div>
        <div class="title">{{comment.aut_name}}</div>
        <div class="like-icon">
          <van-icon name="good-job-o" />
          ({{comment.like_count}})
        </div>
      </div>
      <div class="artcile-content">
        <div>{{comment.content}}</div>
        <div>
          <span>{{comment.pubdate|timeformat}}</span>&nbsp;&nbsp;&nbsp;
          <span @click="toreplay">回复({{comment.reply_count}})</span>
        </div>
      </div>
    </template>
  </van-cell>
</template>

<script>
//导入ventBus
import  eventBus from '@/utils/eventBus.js'
export default {
  props: ['comment'],
 methods: {
   toreplay(){
    eventBus.$emit('showcomment',{
      //控制面板的显示和隐藏
      show:true,
      //当前这个评论的数据源
      ...this.comment
    }) 
   }
 },
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
    margin-top: 10px;
    .van-icon {
      font-size: 30px;
    }
  }
}
.artcile-content {
  margin-left: 65px;
  margin-top: -15px;
}
</style>