<template>
  <div>
    <!-- 顶部列表 -->
    <van-nav-bar title="我的" left-arrow @click-left="$router.back()" />
    <!-- 个人信息栏 -->
    <div class="userInfoBar">
      <div class="userInfo-center">
        <van-cell>
          <template slot="title">
            <div class="userIcon">
              <div class="userTitle" @click="toUserInfo">
                <img :src="userInfo.photo" alt />
                <!-- <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" /> -->
              </div>
              <div class="username">
                <div class="nickNname" @click="toUserInfo">{{userInfo.name}}</div>
                <!-- <van-button type="primary" size="mini">申请认证</van-button> -->
                <button class="btn">申请认证</button>
              </div>
              <div class="userRead">
                <div class="img">
                  <img src="https://i.52112.com/icon/jpg/256/20131116/96/9811.jpg" alt />
                </div>
                <div class="readInfo">
                  <div class="read">今日阅读</div>
                  <div class="time">5分钟</div>
                </div>
              </div>
            </div>
          </template>
        </van-cell>
        <div class="userInfo-status">
          <van-cell>
            <van-grid :column-num="3">
              <van-grid-item>
                <template slot="text">
                  <span class="num">动态</span>
                </template>
                <template slot="icon">
                  <span class="num">{{userInfo.art_count}}</span>
                </template>
              </van-grid-item>
              <van-grid-item>
                <template slot="text">
                  <span class="num">关注</span>
                </template>
                <template slot="icon">
                  <span class="num">{{userInfo.follow_count}}</span>
                </template>
              </van-grid-item>
              <van-grid-item>
                <template slot="text">
                  <span class="num">粉丝</span>
                </template>
                <template slot="icon">
                  <span class="num">{{userInfo.fans_count}}</span>
                </template>
              </van-grid-item>
            </van-grid>
          </van-cell>
        </div>
      </div>
    </div>
    <!-- 个人操作信息 -->
    <van-grid :column-num="3">
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="underway-o" text="历史" />
      <van-grid-item icon="newspaper-o" text="作品" />
    </van-grid>
    <!-- 消息通知与实名验证 -->
    <van-cell-group class="operation">
      <van-cell title="消息通知" is-link />
      <van-cell title="实名认证" is-link />
    </van-cell-group>
    <van-cell-group class="operation">
      <van-cell title="用户反馈" is-link />
      <van-cell title="小智同学" is-link to="/chat" />
      <van-cell title="系统设置" is-link />
    </van-cell-group>
  </div>
</template>

<script>
//导入api
import { getPersonInfo } from '@/api/user.js'
export default {
  data() {
    return {
     userInfo:{}
    }
  },
  methods: {
    //跳转到的个人信息页面
    toUserInfo() {
      this.$router.push('/personInfo')
    },
    //获取用户信息
    async getUserInfo (){
     let res = await getPersonInfo()
    //  console.log(res)
     this.userInfo=res
    }
  },
  mounted() {
    this.getUserInfo()
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
  z-index: 99 !important;
  .van-nav-bar__title,
  .van-icon-arrow-left {
    color: #fff;
  }
}
.userInfoBar {
  position: relative;
  margin-top: 46px;
  .userInfo-center {
    .userIcon {
      display: flex;
      justify-content: center;
      .userTitle {
        img {
          width: 70px;
          height: 70px;
          border: 1px solid #fff;
          border-radius: 50%;
        }
      }
      .username {
        flex: 1;
        margin-left: 20px;
        margin-top: 8px;
        .nickNname {
          font-size: 16px;
          color: #fff;
          margin-bottom: 5px;
        }
        .btn {
          border: none;
          border-radius: 15px;
          padding: 0 10px;
          font-size: 12px;
          background-color: #fff;
        }
      }
      .userRead {
        position: absolute;
        top: 40px;
        right: 0;
        width: 120px;
        height: 48px;
        background-color: #3b82c9;
        display: flex;
        justify-content: center;
        padding-top: 10px;
        border-radius: 32px 0 0 32px;
        .img {
          width: 24px;
          height: 20px;
          margin-top: 10px;
          margin-right: 20px;
          background-color: #3b82c9;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .readInfo {
          .read {
            font-size: 12px;
            line-height: 20px;
            color: #fff;
          }
          .time {
            font-size: 12px;
            line-height: 20px;
            color: #fff;
          }
        }
      }
    }
  }
  .van-cell {
    padding: 30px 10px;
    background-color: #1989fa;
  }
}
.userInfo-status {
  .num {
    color: #fff;
  }
  .van-cell {
    padding: 10px;
    background-color: #1989fa;
  }
}

.userInfoBar /deep/ .van-grid-item__content {
  background-color: #1989fa !important;
  border: none;
}
.van-hairline--top::after {
  border-top-width: none;
}
.userInfoBar /deep/ [class*="van-hairline"]::after {
  border: 0;
}
.operation {
  border-bottom: 10px solid #ddd;
}
</style>