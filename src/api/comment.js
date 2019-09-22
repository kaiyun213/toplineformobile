//封装与评论相关的请求
//到入request
import request from '@/utils/request.js'
//封装对文章点赞
function thumbUp(artid) {
    return request({
        url: '/app/v1_0/article/likings',
        method: 'POST',
        data: {
            target: artid
        }
    })
}

//封装对文章取消点赞的请求
function unthumbUp(artid) {
    return request({
        url: `/app/v1_0/article/likings/${artid}`,
        method: 'DELETE',
    })
}

//封装对文不喜欢
function like(artid) {
    return request({
        url: '/app/v1_0/article/dislikes',
        method: 'POST',
        data: {
            target: artid
        }
    })
}

//封装对文章取消不喜欢
function unlike(artid) {
    return request({
        url: `/app/v1_0/article/dislikes/${artid}`,
        method: 'DELETE'
    })
}

//获取文章评论或者回复文章评论
function getComments({ type, source, offset, limit }) {
    return request({
        url: '/app/v1_0/comments',
        method: 'GET',
        params: {
            type,
            source,
            offset: offset || null,
            limit: limit || null,
        }
    })
}

//添加评论或者添加评论回复
function addComment({id,content,artid}) {
    return request({
        url: '/app/v1_0/comments',
        method: 'POST',
        data: {
            target: id,
            content: content,
            art_id: artid || null
        }
    })
}
//暴露请求方法
export { thumbUp, unthumbUp, like, unlike, getComments,addComment }