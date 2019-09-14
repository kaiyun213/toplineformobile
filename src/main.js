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




Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
