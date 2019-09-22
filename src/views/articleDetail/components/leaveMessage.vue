<template>
  <div class="leaveMessage">
    <van-cell>
      <div class="message">
        <div class="input">
          <van-field left-icon="edit" v-model="leaveMessage" placeholder="写评论" />
        </div>
        <div class="btn">
          <van-button type="danger" size="small">发送</van-button>
        </div>
        <div class="icon">
          <van-icon name="star-o" />
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leaveMessage: '',
    }
  },
}
</script>

<style lang="less" scoped>
.message {
  display: flex;
  justify-content: center;
  .input {
    flex: 1;
    .van-field {
      background-color: #ccc;
      border-radius: 22px;
    }
  }
  .btn {
    margin-left: 20px;
    margin-right: 20px;
    line-height: 44px;
  }
  .icon {
    margin-right: 20px;
    line-height: 50px;
    .van-icon {
      font-size: 20px;
    }
  }
}
.leaveMessage {
    position: fixed;
    bottom: 0;
    left: 0;
}
</style>