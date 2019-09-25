<template>
  <van-dialog :value="value" @input="$emit('input',false)" :showConfirmButton="false">
    <van-cell @click="openFile" title="从相册中获取" is-link>
      <template slot="label">
        <div>
          <input type="file" style="display:none" ref="inputFile" id="file" />
        </div>
      </template>
    </van-cell>
    <van-cell title="拍照" is-link />
    <van-cell title="取消" @click="$emit('input',false)" />
  </van-dialog>
</template>

<script>
//导入图片预览文件ImagePreview
import { ImagePreview } from 'vant';
//导入编辑图片的请求
import { setUserIcon } from '@/api/user.js'
export default {
  props: ['value'],
  computed: {
    file: function () {
      //获取到file元素
      return this.$refs['inputFile']
    }
  },
  methods: {
    openFile() {
      //给this.file绑定一个事件
      this.file.onchange = () => {
        //得到图片
        // console.dir(file)
        let myfile = this.file.files[0]
        // console.log(file)
        //将图片转换成base64格式
        let reader = new FileReader();
        //图片设置成base64之后的逻辑
        reader.addEventListener('load', res => {
          ImagePreview({
            images: [res.target.result],
            onClose: () => {
              this.$dialog.confirm({
                message: '是否将图片图片保存为图像'
              }).then(async () => {
                let resdata = await setUserIcon(this.file.files[0])
                this.$emit('changeUserIcon', resdata)
                this.$toast.success('图像修改成功')
              })
            }
          })
          //关闭弹窗
          this.$emit('input', false)
        })
        //开始转换s
        reader.readAsDataURL(myfile)
      }
      //触发upfile的点击事件
      this.file.click()
    }
  },
}
</script>

<style>
</style>