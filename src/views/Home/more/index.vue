<template>
  <div>
    <!-- 封装更多组件 -->
    <van-dialog
      :value="value"
      @input="$emit('input',$event)"
      closeOnClickOverlay
      show-cancel-button
      :showConfirmButton="false"
      :showCancelButton="false"
    >
      <!-- 更多操作 -->
      <van-cell-group v-if="!isShowing">
        <van-cell icon="location-o" title="隐藏此信息" @click="hiddenMessage" />
        <van-cell icon="location-o" title="举报" is-link @click="showReporttype" />
        <van-cell icon="location-o" title="拉黑" @click="addBlackList" />
      </van-cell-group>
      <!-- 举报的类型 -->
      <van-cell-group v-if="isShowing">
        <van-cell icon="arrow-left" @click="backMore" />
        <van-cell
          :title="item.name"
          v-for="item in reportTypes"
          :key="item.value"
          @click="reportArticle(item)"
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
//导入删除文章的方式
import { setDislikeArticle, setBlackList, setReportArticle } from '@/api/articleList.js'
export default {
  props: ['value', 'hiddenArt_id', 'blackAut_id',],
  data() {
    return {
      //控制更多弹出框的显示与隐藏
      isShowing: false,
      //举报类型
      reportTypes: [
        { value: 0 , name: '其它问题' },
        { value: 1 , name: '标题夸张' },
        { value: 2 , name: '低俗色情' },
        { value: 3 , name: '错别字多' },
        { value: 4 , name: '旧闻重提' },
        { value: 5 , name: '广告软文' },
        { value: 6 , name: '内容不是' },
        { value: 7 , name: '涉嫌违法犯罪' },
        { value: 8 , name: '侵权' },
      ]
    }
  },
  methods: {
    //隐藏不喜欢的文章
    async hiddenMessage() {
      try {
        //发送请求到服务器
        await setDislikeArticle(this.hiddenArt_id)
        //告诉home组件要删除的文章
        this.$emit('hiddenAeticle', this.hiddenArt_id)
        this.$toast.fail('隐藏信息成功')
      } catch (error) {
        this.$toast.fail('隐藏信息失败')
      }
      finally {
        //隐藏更多弹出框
        this.$emit('input', false)
      }
    },
    //将不喜欢的作者拉黑
    async addBlackList() {
      try {
        //发送请求,拉黑作者
        console.log(this.blackAut_id)
        await setBlackList(this.blackAut_id)
        this.$toast.success('拉黑作者成功')
      } catch (error) {
        this.$toast.fail('拉黑作者失败')
        console.log(error)
      } finally {
        //关闭弹窗
        this.$emit('input', false)
      }

    },
    //显示举报类型
    showReporttype() {
      this.isShowing = true
    },
    //回退
    backMore() {
      this.isShowing = false
    },
    //举报文章
    async reportArticle(item) {
      try {
    let res= await setReportArticle({
          art_id: this.hiddenArt_id,
          type: item.value,
        })
        console.log(res)
        this.$toast.success('你的举报信息我们已经收到,我们会尽快处理,感谢你为净化网络所做的贡献')
      } catch (error) {
        console.log(error)
        if (error.message.indexOf('409')) {
          this.$toast.fail('当前文章已经被举报了')
        } else {
          this.$toast.fail('系统异常')
        }
      } finally {
        //返回more页面
        this.isShowing = false
        //隐藏弹框
        this.$emit('input', false)
      }
    }


  },

}
</script>

<style>
</style>