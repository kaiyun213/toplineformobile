//封装axios
//导入axios
import axios from 'axios'
//导入store
import store from '@/store/index.js'
//给axios设置基准路径
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
const instance_token = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
//设置统一的请求拦截器
instance.interceptors.request.use(config => {
  //config : 请求头相关的信息
  //给请求统一添加一个token,
  //获取token
  let use = store.state.use
  //判断use是否有token
  if (use && use.token) {
    //有值,则代表已经登录,没有值,则代表没有登录,不需要做什么
    //给请求头设置token
    config.headers.Authorization = `Bearer ${use.token}`
  }

  return config;
}, error => {

  return Promise.reject(error)
});

//设置统一的响应拦截器
instance.interceptors.response.use(response => {
  //对相应内容进行过滤处理
  return response.data.data || response.data

}, async error => {
  //判断是否是token失效
  // console.dir(error)
  if (error.response.status === 401) {
    //说明token失效了
    //需要重新发送请求,先获取refresh_token
    let refresh_token = store.state.use.refresh_token
    let res = await instance_token({
      url: '/app/v1_0/authorizations',
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${refresh_token}`
      }
    })
    // console.log(res)
    let newtoken = res.data.data.token
    //将数据保存到vuex中
    store.commit("setUse",{
     newtoken,
     refresh_token,
    })
    //再次发送请求
    return instance(error.config)
  }
  return Promise.reject(error)
});


//暴露文件
export default instance