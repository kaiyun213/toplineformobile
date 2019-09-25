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

//封装获取用户个人信息
function getPersonInfo(params) {
   return request({
       url:'/app/v1_0/user',
       method:'GET'
   }) 
}

//封装获取用户个人信息的请求
function getPersonMessage() {
    return request({
        url: '/app/v1_0/user/profile',
        method: 'GET'
    })
}


//修改个人信息
function editPersonInfo({ name, gender, birthday }) {
    return request({
        url: '/app/v1_0/user/profile',
        method: 'PATCH',
        data: {
            name: name || null,
            gender: gender || null,
            birthday: birthday || null,

        }
    })
}


//封装编辑用户图像
function setUserIcon(photo) {
    //axios发送请求的底层是xhrrequest
    //传送文件时,需要将文件转换成formData格式传递
    //将photo转变成formData格式
    var fd = new FormData()
    fd.append('photo', photo)
    return request({
        url: '/app/v1_0/user/photo',
        method: 'PATCH',
        data: fd
    })
}

//将函数暴露出去
export { login, followAuthor, unfollowAuthor,getPersonInfo, getPersonMessage, editPersonInfo, setUserIcon }
