import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

//导入vant
import Vant from 'vant';
import 'vant/lib/index.css';
//使用vant
Vue.use(Vant);

//导入插件vee-validate
import VeeValidate,{Validator} from 'vee-validate'
//使用插件vee-validate,并禁止默认事件的触发
Vue.use(VeeValidate,{
 events:''
})
//导入本地语言包
import zh_CN from 'vee-validate/dist/locale/zh_CN.js'
//使用本地语言包
Validator.localize('zh_CN', zh_CN);

//导入lazy-load 图片懒加载
import { Lazyload } from 'vant';
//使用lazy-load
// options 为可选参数，无则不传
Vue.use(Lazyload);

//导入day.js
import dayjs from 'dayjs'
//导入语言包
import 'dayjs/locale/zh-cn'
//全局使用语言包
dayjs.locale('zh-cn') 
//导入相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
//注册相对时间的插接件
dayjs.extend(relativeTime)


//注册一个曲剧过滤器
Vue.filter('dayjsformat',function(value){
  return dayjs().from(dayjs(value)) 
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
