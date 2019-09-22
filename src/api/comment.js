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

//暴露请求方法
export { thumbUp, unthumbUp, like, unlike }