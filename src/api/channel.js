//封装所有与频道相关的请求

//导入request

import request from '@/utils/request'

//发送请求
function channelRequest(){
    return request({
     url:'/app/v1_0/user/channels',
     method:'GET',
     //这里需要设置请求头,在axios中统一设置请求头
    })
}


//暴露函数

export {channelRequest}