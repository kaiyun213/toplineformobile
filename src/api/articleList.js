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


//封装设置不喜欢文章的方式
function setDislikeArticle(art_id) {

    return request({
        url: '/app/v1_0/article/dislikes',
        method: 'POST',
        data: {
            target: art_id
        }
    })
}

//封装设置拉黑作者的方法
function setBlackList(aut_id) {
    return request({
        url: '/app/v1_0/user/blacklists',
        method: 'POST',
        data: {
            target: aut_id
        }    
    })
}

//封装举报文章

function setReportArticle({ art_id, type}) {
    return request({
        url: '/app/v1_0/article/reports',
        method: 'POST',
        data: {
            target:art_id,
            type:type,
            remark:'看它不爽就举报'
        }
    })
}


//暴露获取文章的方法

export { getArticleList, setDislikeArticle, setBlackList,setReportArticle }