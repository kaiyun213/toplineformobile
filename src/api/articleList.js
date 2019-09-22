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

function setReportArticle({ art_id, type }) {
    return request({
        url: '/app/v1_0/article/reports',
        method: 'POST',
        data: {
            target: art_id,
            type: type,
            remark: '看它不爽就举报'
        }
    })
}


//封装联想文章
function getThinkArticle(key) {
    return request({
        url: '/app/v1_0/suggestion',
        method: 'GET',
        params: {
            q: key
        }
    })
}


//封装获取搜索关键字文章
function searchArticles({ page, per_page, keyWords }) {
    return request({
        url: '/app/v1_0/search',
        method: 'GET',
        params: {
            page,
            per_page,
            q: keyWords
        }
    })
}

//封装获取文章详情
function getArticleDetail(artid) {
    return request({
        url: `/app/v1_0/articles/${artid}`,
        method: 'GET',
    })
}

//暴露获取文章的方法

export { getArticleList, setDislikeArticle, setBlackList, setReportArticle, getThinkArticle, searchArticles, getArticleDetail }