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
        <van-grid :gutter="1" clickable>
          <van-grid-item v-for="(item,index) in channelArr" :key="item.id">
            <div slot="text" class="text-channel" @click="transferActive(index)">
              <div class="channel-name" :class="{active:index===active}">{{item.name}}</div>
              <van-icon class="close-icon" v-show="isShow" name="close" @click="delChannel(index)" />
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
        <van-grid :gutter="1" clickable>
          <van-grid-item v-for="item in otherChannelList" :key="item.id">
            <div class="other-channel-name" slot="text" @click="addChannel(item)">
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
import { getAllChannel, setUserChannel } from '@/api/channel.js'
export default {
  props: ['value', 'channelArr', 'active'],
  data() {
    return {
      //关闭图标是否显示
      isShow: false,
      //所有的频道列表
      allChannelList: [],
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
      this.allChannelList = res.channels
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
    },

    //添加频道
    async addChannel(item) {
      //将当前的频道添加到我的频道列表中
      this.channelArr.push(item)
      //判断是否登录
      let use = this.$store.state.use
      if (use && use.token) {
        //有登录的情况
        //先处理参数
        let channels = this.channelArr.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        await setUserChannel({
          channels, channels
        })
      } else {
        //未登录情况,将数据保存到本地
        window.localStorage.setItem('channnel', JSON.stringify(this.channelArr))
      }
    },
    //删除频道
    async delChannel(index) {
      this.channelArr.splice(index, 1)
      //判断是否登录
      let use = this.$store.state.use
      if (use && use.token) {
        //有登录的情况
        //先处理参数
        let channels = this.channelArr.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        await setUserChannel({
          channels, channels
        })
      } else {
        //未登录情况,将数据保存到本地
        window.localStorage.setItem('channnel', JSON.stringify(this.channelArr))
      }
    }
  },
  computed: {
    //通过计算属性将getAllChannelList里面的数据取出channelArr里面的数据之后,显示在推荐频道上
    otherChannelList() {
      //取出channelArr里面的id
      let ids = this.channelArr.map(item => {
        return item.id
      })
      //判断getAllChannelList是否包含channelArr里的id
      let otherChannelList = this.allChannelList.filter(item => {
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
  .channel-name {
    font-size: 14px;
    color: #333;
  }
  .close-icon {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 18px;
    color: #f00;
  }
}
.other-channel-name {
  font-size: 14px;
  color: #333;
}
</style>