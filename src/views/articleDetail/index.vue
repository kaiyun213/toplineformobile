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
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getArticleComment"
    >
      <div v-for="comment in articleComment" :key="comment.last_id">
        <comment :comment="comment"></comment>
      </div>
    </van-list>
    <!-- 留言区域 -->
    <leaveMessage :articleObj="articleObj" @addArtComment="addArtComment"></leaveMessage>
    <!-- 回复评论区 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '80%' }" >
       <comment :comment="currentCommentObj"></comment>
    </van-popup>
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
// 导入获取评论请求
import { getComments } from '@/api/comment.js'
//导入eventBus
import eventBus from '@/utils/eventBus.js'
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
      //文章评论的数组
      articleComment: [],
      //评论加载完毕的标识
      end_id: -1,
      //本页评论加载完毕的标识
      offset: 0,
      //加载状态
      loading: false,
      //加载完成状态
      finished: false,
      //页容量
      limit: 10,
      //评论弹出框的显示与隐藏
      show:false,
      //当前评论的数据源
      currentCommentObj:{},
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
    },
    //获取文章评论的方法
    async getArticleComment() {
      //确认是否登录
      this.$login()
      //判断是否加载完毕
      if (this.offset === this.end_id) {
        this.finished = true
        this.loading = false
        return
      }
      if (this.offset === 0) {
        //第一次发送请求
        let res = await getComments({
          type: 'a',
          source: this.artId,
          limit: this.limit
        })
        //将数据赋值给集合
        this.articleComment = res.results
        this.end_id = res.end_id
        this.offset = res.last_id
        // console.log(res)
      } else {
        // 第二次以后发送请求
        let res = await getComments({
          type: 'a',
          source: this.artId,
          offset: this.offset,
          limit: this.limit
        })
        //追加数据到集合
        this.articleComment = [...this.articleComment, ...res.results]
        this.end_id = res.end_id
        this.offset = res.last_id

      }
      this.loading = false
    },
    //接收发送的评论
    addArtComment(value) {
      // console.log(value)
      this.articleComment.unshift({
        ...value.new_obj,
        art_id: value.art_id
      })
      //刷新页面
      this.getDetail();
    }

  },
  mounted() {
    this.getDetail()
    //挂载事件
    eventBus.$on('showcomment',obj=>{
      this.show=obj.show
      this.currentCommentObj=obj 
    })
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