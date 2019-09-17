<template>
  <div>
    <van-popup
      :value="value"
      @input="$emit('input',$event)"
      position="bottom"
      round
      :style="{ height: '80%' }"
    >
      <div class="topBar">
        <div class="userChannel">
          <div class="channel-state">
            我的频道
            <span>点击删除频道</span>
          </div>
          <div class="edit-btn">
            <button v-if="!isShow" @click="editChannel">编辑</button>
            <button v-else @click="completeChannel">完成</button>
          </div>
        </div>
        <van-grid :gutter="10" clickable>
          <van-grid-item v-for="(item,index) in channelArr" :key="item.id">
            <div slot="text" class="text-channel" @click="transferActive(index)">
              <div :class="{active:index===active}">{{item.name}}</div>
              <van-icon class="close-icon" v-show="isShow" name="close" />
            </div>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="topBar">
        <div class="userChannel">
          <div class="channel-state">
            推荐频道
            <span>点击添加频道</span>
          </div>
        </div>
        <van-grid :gutter="2" clickable>
          <van-grid-item v-for="item in otherChannelList" :key="item.id">
            <div slot="text">
              <!-- <van-icon name="plus" /> -->
              {{item.name}}
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
//导入获取全部频道年数据的方法
import {getAllChannel} from '@/api/channel.js'
export default {
  props: ['value', 'channelArr', 'active'],
  data() {
    return {
      //关闭图标是否显示
      isShow: false,
      //所有的频道列表
      allChannelList:[],
    }
  },
  methods: {
    //给父组件传递选中的频道
    transferActive(index) {
      //将index传递给home
      this.$emit('update:active', index)
    },
    //编辑频道,显示关闭图标
    editChannel() {
      this.isShow = true
    },
    //完成频道,关闭关闭图标
    completeChannel() {
      this.isShow = false
    },
    //获取所有频道
    async getAllChannelList() {
      let res = await getAllChannel()
      // console.log(res)
      this.allChannelList=res.channels
      //添加属性
      this.allChannelList.forEach(item => {
        //添加文章列表
        this.$set(item, 'articleList', [])
        // 添加上滑加载更多
        this.$set(item, 'upLoading', false)
        //添加上滑加载完毕
        this.$set(item, 'finished', false)
        //添加下滑刷新
        this.$set(item, 'downLoading', false)
        //添加上一页数据的事件戳  pre_timestamp
        this.$set(item, 'pre_timestamp', 0)
      })
    }
  },
  computed: {
    //通过计算属性将getAllChannelList里面的数据取出channelArr里面的数据之后,显示在推荐频道上
    otherChannelList(){
      //取出channelArr里面的id
     let ids= this.channelArr.map(item=>{
        return item.id
      })
      //判断getAllChannelList是否包含channelArr里的id
      let otherChannelList= this.allChannelList.filter(item=>{
         return !ids.includes(item.id)
      })
      //返回推荐列表
      return otherChannelList
    }
  },
  mounted() {
    this.getAllChannelList()
  }
}
</script>

<style lang="less" scoped>
.van-popup--bottom {
  padding: 20px 10px;
  box-sizing: border-box;
}
.topBar {
  margin-bottom: 50px;
  .userChannel {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    .channel-state {
      font-size: 20px;
      span {
        margin-left: 10px;
        font-size: 16px;
        color: #333;
      }
    }
    .edit-btn {
      button {
        background-color: #fff;
        padding: 5px 20px;
        border: 1px solid #f00;
        border-radius: 20px;
        color: #f00;
      }
    }
  }
  .text-channel {
    font-size: 16px;
    color: #333;
    .active {
      color: #f00;
    }
  }
}
.van-grid-item__content {
  position: relative;
  .close-icon {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 18px;
    color: #f00;
  }
}
</style>