//封装axios
//导入axios
import axios from 'axios'
//给axios设置基准路径
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
//设置统一的请求拦截器
instance.interceptors.request.use(config => {
  //config : 请求头相关的信息
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