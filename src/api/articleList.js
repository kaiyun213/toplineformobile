//封装获取文章列表的请求方法
//导入 request 

import request from '@/utils/request.js'

//封装获取文章列表

function getArticleList({ channel_id, timestamp, with_top }) {
    return request({
        url: '/app/v1_1/articles',
        method: 'GET',
        params: {
            channel_id,
            timestamp,
            with_top
        }
    })
}



//暴露获取文章的方法

export { getArticleList }