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
    <van-cell-group v-if="thinkList.length!==0">
      <van-cell
        icon="search"
        v-for="(item,index) in thinkList"
        :key="index"
        @click="onSearch(item.item)"
      >
        <template slot="title">
          <div v-html="item.colorItem"></div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="搜索历史">
        <template slot="right-icon">
          <van-icon name="delete" v-if="!isShow" @click="isShow = true" />
          <div v-if="isShow">
            <span @click="delAllItem">全部删除</span> &nbsp;
            <span @click="isShow=false">完成</span>
          </div>
        </template>
      </van-cell>
      <van-cell v-for="(item,index) in searchList " :key="index" :title="item" icon="search" @click="onSearch(item)">
        <template slot="right-icon">
          <van-icon name="cross" v-if="isShow" @click="delSingleItem(index)" />
        </template>
      </van-cell>
    </van-cell-group>
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
      timeID: null,
      //控制元素的显示与隐藏
      isShow: false,
      //保存搜索历史的变量
      searchList: JSON.parse(window.localStorage.getItem('searchHistory')) || [],
    }
  },
  methods: {
    //搜索事件
    onSearch(keyWords) {
      //跳转到list页面
      this.$router.push(`/list/${keyWords}`)
      //将搜搜的关键字添加进搜索历史数组里
      this.searchList.unshift(keyWords)
      //给数组去重
      this.searchList=[... new Set(this.searchList)]
      //保存到本地数据里
      window.localStorage.setItem('searchHistory', JSON.stringify(this.searchList))
    },
    //取消按钮事件
    onCancel() {
      console.log('被取消了')
    },
    //点击删除图标删除单条记录
    delSingleItem(index) {
      this.searchList.splice(index, 1)
      window.localStorage.setItem('searchHistory', JSON.stringify(this.searchList))
    },
    // 点击全部删除
    delAllItem() {
      window.localStorage.clear('searchHistory')
    }
  },
  watch: {
    keyWords: function (newVal, oldVal) {
      //如果有定时器,先清除以前的定时器
      if (this.timeID) {
        clearTimeout(this.timeID)
      }
      //  设置定时器,只求输入定下来1s钟才触发
      this.timeID = setTimeout(async () => {
        //判断newVal是否为空
        if (!newVal.trim().length) {
          //清空输入框
          this.thinkList = []
          return
        }
        //根据关键字值去联想
        let res = await getThinkArticle(newVal)

        this.thinkList = res.options
        // console.log(this.thinkList)
        //将关键字设置高亮
        this.thinkList = this.thinkList.map(item => {
          return {
            colorItem: item.split(newVal).join(`<span style="color:skyblue">${newVal}</span>`),
            item: item
          }
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