import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//引入auther数据
import * as auther from '@/utils/author'
export default new Vuex.Store({
  state: {
    //保存你数据到vuex中
    use: auther.getAuthor()
  },
  mutations: {
    //设置use
    setUse(state, use) {
      auther.setAuthor(use)
      state.use = use
    }
  },
  actions: {

  }
})
