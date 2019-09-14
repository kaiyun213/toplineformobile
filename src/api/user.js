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


//将函数暴露出去
export { login }