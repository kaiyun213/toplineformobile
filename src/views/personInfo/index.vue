<template>
  <div class="personInfo">
    <!-- 顶部的个人信息 -->
    <van-nav-bar title="我的" left-arrow @click-left="$router.back()">
      <template slot="right">
        <div class="rightText" @click="toSave">保存</div>
      </template>
    </van-nav-bar>
    <!-- 头像 -->
    <van-cell @click="changeImg" title="头像" is-link>
      <template slot="default">
        <div class="personIcon">
          <img :src="personInfo.photo" alt />
        </div>
      </template>
    </van-cell>
    <!-- 图像弹出层 -->
    <upfile v-model="dialogShow" @changeUserIcon="changeUserIcon"></upfile>
    <!-- 昵称 -->
    <van-cell title="昵称" is-link @click="showNickName=true">
      <template slot="default">
        <div class="nickName">{{personInfo.name}}</div>
      </template>
    </van-cell>
    <van-dialog v-model="showNickName" show-cancel-button>
      <van-field
        class="inputNick"
        v-model="personInfo.name"
        label-width="46px"
        label="昵称:"
        clearable
        rows="1"
      />
    </van-dialog>

    <!-- 介绍 -->
    <van-cell class="personIntro-cell" title="介绍" is-link>
      <template slot="default">
        <div class="personIntro"></div>
      </template>
    </van-cell>
    <!-- 性别 -->
    <van-cell title="性别" is-link @click="showGender=true">
      <template slot="default">
        <div class="personGender">{{personInfo.gender==0?'男':'女'}}</div>
      </template>
    </van-cell>
    <van-dialog v-model="showGender" show-cancel-button>
      <van-radio-group v-model="personInfo.gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="personInfo.gender = '0'">
            <van-radio slot="right-icon" name="0" />
          </van-cell>
          <van-cell title="女" clickable @click="personInfo.gender = '1'">
            <van-radio slot="right-icon" name="1" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>

    <!-- 生日 -->
    <van-cell title="生日" is-link @click="showBirthday=true">
      <template slot="default">
        <div class="personbirthday">{{personInfo.birthday }}</div>
      </template>
    </van-cell>
    <van-dialog v-model="showBirthday" :showConfirmButton="false">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :formatter="formatter"
        @confirm="toChangeDate"
      />
    </van-dialog>
  </div>
</template>

<script>
//导入api
import { getPersonMessage, editPersonInfo } from '@/api/user.js'
//导入组件
import upfile from './component/upfiles.vue'
export default {
  components: {
    upfile
  },
  data() {
    return {
      //保存用户信息的数组
      personInfo: {},
      //控制昵称表格的显示和隐藏
      showNickName: false,
      //控制性别的显示与隐藏
      showGender: false,
      //控制生日弹出框的显示与隐藏
      showBirthday: false,
      //当前时间
      currentDate: new Date(),
      //最小时间
      minDate: new Date(1900, 1, 1),
      //控制头像弹出层的显示与隐藏
      dialogShow: false,
    }
  },
  methods: {
    async toSave() {
      try {
        let res = await editPersonInfo({
          name: this.personInfo.name,
          gender: this.personInfo.gender,
          birthday: this.personInfo.birthday
        })
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.success(error.message)
      }


    },
    //获取用户数据
    async getPersonInfo() {
      let res = await getPersonMessage()
      //    console.log(res)
      this.personInfo = res
    },
    onChange(picker, value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`);
    },
    //事件过滤器
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }
      return value;
    },
    //确认按钮
    toChangeDate(value) {
      this.showBirthday = false
    },
    //图像的点击事件
    changeImg() {
      this.dialogShow = true
    },
    //设置图像
    changeUserIcon(obj) {
      this.personInfo.photo = obj.photo
    }
  },

  mounted() {
    this.getPersonInfo()
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
  .van-icon-arrow-left,
  .rightText {
    color: #fff;
    font-size: 16px;
  }
}
.personInfo {
  margin-top: 46px;
  .personIcon {
    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }
  .personIntro-cell {
    border-bottom: 5px solid #ccc;
  }
  .inputNick {
    height: 50px;
    font-size: 16px;
    border: 1px solid #ccc;
  }
}
</style>