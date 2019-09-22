//封装登录的插件
import Vue from 'vue'
//导入store
import store from '@/store/index.js'
//导入dialog
import { Dialog } from 'vant'
//导入router 
import router from '@/router/index.js'
//使用dialog
Vue.use(Dialog)

//封装一个插件
let loginPlugin = {}

//给插件添加一个方法
loginPlugin.install = function (Vue) {
    Vue.prototype.$login = function () {
        //获取登录信息
        let user = store.state.use
        //判断是否登录
        if (!user || !user.token) {
            Dialog.confirm({
                title: '温馨提示',
                message: '要进行当前操作需要登录,请你先登录'
            }).then(() => {
                router.push('/login')
            }).catch(() => {
                console.log(11111)
                return
            });

        }

    }
}


// 暴露插件
export default loginPlugin