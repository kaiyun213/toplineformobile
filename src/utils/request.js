//封装axios
//导入axios
import axios from 'axios'
//导入store
import store from '@/store/index.js'
//给axios设置基准路径
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
//设置统一的请求拦截器
instance.interceptors.request.use(config => {
  //config : 请求头相关的信息
  //给请求统一添加一个token,
  //获取token
  let use =store.state.use
  //判断use是否有token
  if(use && use.token){
    //有值,则代表已经登录,没有值,则代表没有登录,不需要做什么
   //给请求头设置token
   config.headers.Authorization=`Bearer ${use.token}`
   
  }
 
  return config;
}, error => {

  return Promise.reject(error)
});

//设置统一的响应拦截器
instance.interceptors.response.use(response => {
  //对相应内容进行过滤处理
  return response.data.data || response.data
 
}, error => {

  return Promise.reject(error)
});


//暴露文件
export default instance