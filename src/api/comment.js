//封装与评论相关的请求
//到入request
import request from '@/utils/request.js'

//封装获取文章详情
function getArticleDetail(){
    return request({
        url:'/app/v1_0/articles/:article_id',
        method:'GET',
        
    })
}
