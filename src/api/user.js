//封装所有与用户相关的请求
//导入request 
import request from '@/utils/request'
//封装成函数
function login({ mobile, code }) {
    //返回的必须是promise对象
    return request({
        url: '/app/v1_0/authorizations',
        method: 'POST',
        data: {
            mobile: mobile,
            code: code
        }
    });
}

//封装关注作者请求
function followAuthor(autid) {
    return request({
        url: '/app/v1_0/user/followings',
        method: 'POST',
        data: {
            target: autid
        }
    })
}

//封装取消关注作者请求
function unfollowAuthor(autid) {
    return request({
        url: `/app/v1_0/user/followings/${autid}`,
        method: 'DELETE'
    })
}

//封装收藏文章
/* function collectArticle(artid) {
    console.log(artid)
    return request({
        url: '/app/v1_0/article/collections',
        method: 'POST',
        data: {
            target: artid
        }
    })
} */

//取消收藏文章
/* function cancelCollectArticle(artid) {
    return request({
        url: `/app/v1_0/article/collections/${artid}`,
        method: 'DELETE'
    })
} */

//将函数暴露出去
export { login, followAuthor, unfollowAuthor, }
