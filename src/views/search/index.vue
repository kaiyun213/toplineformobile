<template>
  <div class="search-form">
    <!-- 搜索框 -->
    <van-search
      v-model="keyWords"
      placeholder="请输入搜索关键词"
      show-action
      clearable
      shape="round"
      @search="onSearch(keyWords)"
      @cancel="onCancel"
    />
    <!-- 联想框 -->
    <van-cell-group>
      <van-cell icon="search" v-for="(item,index) in thinkList" :key="index" @click="onSearch(item)">
        <template slot="title">
          <div v-html="item"></div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 历史记录 -->
  </div>
</template>

<script>
//导入获取联想文章的方法
import { getThinkArticle } from '@/api/articleList.js'
export default {
  data() {
    return {
      //搜索关键字
      keyWords: '',
      //联想列表
      thinkList: [],
      //定义一个防抖定时器
      timeID: null
    }
  },
  methods: {
    //搜索事件
    onSearch(keyWords) {
      //跳转到list页面
      this.$router.push(`/list/${keyWords}`)
    },
    //取消按钮事件
    onCancel() {
      console.log('被取消了')
    }
  },
  watch: {
    keyWords: function (newVal, oldVal) {
      //如果有定时器,先清除以前的定时器
      if (this.timeID) {
        clearTimeout(this.timeID)
      }
      //  设置定时器,只求输入定下来1s钟才触发
      this.timeID = setTimeout(async  ()=> {
        //判断newVal是否为空
        if (!newVal.trim().length) {
          //清空输入框
          this.thinkList = []
          return
        }
        //根据关键字值去联想
        let res = await getThinkArticle(newVal)

        this.thinkList = res.options
        console.log(this.thinkList)
        //将关键字设置高亮
        this.thinkList = this.thinkList.map(item => {
          return item.split(newVal).join(`<span style="color:skyblue">${newVal}</span>`)
        })
      }, 500)

    }
  },
}
</script>

<style lang="less" scoped>
.van-search {
  width: 100%;
  height: 60px;
  background-color: #3296fa !important;
  .van-search__action {
    padding: 0 8px;
    color: #fff;
    font-size: 16px;
  }
}
</style>