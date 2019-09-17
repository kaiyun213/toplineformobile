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
          <van-grid-item v-for="value in 8" :key="value">
            <div slot="text">
              文字
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
        <van-grid :gutter="10" clickable>
          <van-grid-item v-for="value in 8" :key="value">
            <div slot="text">
              <van-icon name="plus" />文字
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      //关闭图标是否显示
      isShow:false,
    }
  },
  methods: {
    //编辑频道,显示关闭图标
    editChannel() {
     this.isShow=true
    },
    //完成频道,关闭关闭图标
    completeChannel(){
      this.isShow=false
    }
  },
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